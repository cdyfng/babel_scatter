// import http from 'http';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
// import config from 'config'
//import {config} from '../config.js';
let config = require('../config')

// Don't forget to tell ScatterJS which plugins you are using.
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');



ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
    port:443,
    protocol:'https'
});

ScatterJS.connect(config.eos_from, {network}).then(connected => {
    if(!connected) return console.error('no scatter');
    console.log('connect ok')

    const eos = ScatterJS.eos(network, Eos);
    console.log('eos from', config.eos_from)
    console.log('eos to', config.eos_to)

    ScatterJS.login().then(id => {
        if(!id) return console.error('no identity');
        const account = ScatterJS.account('eos');
        const options = {authorization:[`${account.name}@${account.authority}`]};
        eos.transfer(account.name, config.eos_to, '0.0001 EOS', account.name, options).then(res => {
            console.log('sent: ', res);
        }).catch(err => {
            console.error('error: ', err);
        });
    });
});