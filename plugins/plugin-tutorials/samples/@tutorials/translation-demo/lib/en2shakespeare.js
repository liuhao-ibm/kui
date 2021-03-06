'use strict'

const request = require('request')

function main (params) { // eslint-disable-line
  var options = {
    url: 'http://api.funtranslations.com/translate/shakespeare.json',
    qs: { text: params.text, api_key: params.apiKey ? params.apiKey : '' },
    json: true
  }
  console.log(options)
  return new Promise(function (resolve, reject) {
    request(options, function (err, resp) {
      if (err) {
        reject(err)
      }
      console.log(JSON.stringify(resp))
      resolve({ payload: resp.body.contents.translated })
    })
  })
};
