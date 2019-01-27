/*
 * Copyright 2017-18 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Debug from 'debug'
const debug = Debug('plugins/editor/init/esm')

import * as monaco from 'monaco-editor'

import languages from '../language-scan'
import defaultMonacoOptions from './defaults'

/** the monaco editor uses the AMD module loader, and smashes the global.require; we need to finagle it a bit */
let amdRequire

/** this is part of the finagling, to make sure we finagle only once */
let initDone

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
self['MonacoEnvironment'] = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js'
    }
    if (label === 'css') {
      return './css.worker.bundle.js'
    }
    if (label === 'html') {
      return './html.worker.bundle.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js'
    }
    return './editor.worker.bundle.js'
  }
}

export default (editorWrapper: HTMLElement, options) => {
  //
  // wait till monaco's loader is ready, then resolve with an editor
  // widget
  //
  let editor
  const ready = () => new Promise((resolve, reject) => {
    /**
     *
     */
    const initEditor = () => {
      if (!initDone) {
        // for now, try to disable the built-in Javascript-specific completion helper thingies
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true })

        // install any custom languages we might have
        languages(monaco).forEach(({ language, provider }) => {
          monaco.languages.registerCompletionItemProvider(language, provider)
        })

        initDone = true
      }

      // here we instantiate an editor widget
      editor = monaco.editor.create(editorWrapper, Object.assign(defaultMonacoOptions(options), options))

      editor.clearDecorations = () => {
        debug('clearing decorations', editor.__cloudshell_decorations)
        const none = [{ range: new monaco.Range(1, 1, 1, 1), options: { } }]
        editor.__cloudshell_decorations = editor.deltaDecorations(editor.__cloudshell_decorations || [], none)
      }

      editorWrapper['editor'] = editor

      resolve(editor)
    } /* initEditor */

    initEditor()
  }) /* end of ready() */

  return ready()
}