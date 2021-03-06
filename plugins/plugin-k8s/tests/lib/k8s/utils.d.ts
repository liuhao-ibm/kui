/*
 * Copyright 2019 IBM Corporation
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

import { ISuite } from '@kui-shell/core/tests/lib/common'

/**
 * Which sidecar mode should be visible upon loading a kubernetes entity
 *
 */
declare var defaultModeForGet: string

/**
 * Allocate a new unique namespace name
 *
 */
declare function createNS (): string

/**
 * Install a mocha test to allocate the given namespace `ns`
 *
 */
declare function allocateNS (ctx: ISuite, ns: string, theCli?: any): string

/**
 * Install a mocha test to delete the given namespace `ns`
 *
 */
declare function deleteNS (ctx: ISuite, ns: string, theCli?: any): void
