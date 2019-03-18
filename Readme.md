#babel scatter_js demo

## Installation
`$ npm install --save-dev babel-cli babel-preset-env`
`$ touch .babelrc`
add 
{
  "presets": ["env"]
}

add 
  "scripts": {
    "build": "babel index.js -d dist",
 +   "start": "npm run build && node dist/index.js",
 +   "test": "echo \"Error: no test specified\" && exit 1"
  },


`npm i -S scatterjs-core scatterjs-plugin-eosjs eosjs@16.0.9`

	
`npm i -D @babel/runtime`
	to solve error:
	Error: Cannot find module '@babel/runtime/helpers/interopRequireWildcard'

## Run
`npm start`