#!/usr/bin/env bash

SCRIPTDIR=$(cd $(dirname "$0") && pwd)
ROOTDIR="${SCRIPTDIR}/../../"
cd "$SCRIPTDIR"

rm -rf incubator-openwhisk-utilities
git clone https://github.com/apache/incubator-openwhisk-utilities.git

# a PR on 20190402 seems to have broken us
# ./incubator-openwhisk-utilities/scancode/scanCode.py --config kui.cfg "$ROOTDIR"
