// import http from 'http';
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
// import config from 'config'
//import {config} from '../config.js';
let config = require("../config");
// var program = require('commander');
// program
//   .version('0.0.1')
//   .option('-i, --interval [n]', 'input the intervals of each transfer')
//   .option('-t, --times [n]', 'input the total times')
//   .parse(process.argv)
// console.log(program.list);
console.log(process.argv);
let times = process.argv[2];
let intervals = process.argv[3];

console.log("transfer %s times every %s seconds", times, intervals);

// Don't forget to tell ScatterJS which plugins you are using.
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');

ScatterJS.plugins(new ScatterEOS());

const network = ScatterJS.Network.fromJson({
  blockchain: "eos",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  host: "nodes.get-scatter.com",
  port: 443,
  protocol: "https"
});

ScatterJS.connect(
  config.eos_from,
  { network }
).then(connected => {
  if (!connected) return console.error("no scatter");
  console.log("connect ok");

  const eos = ScatterJS.eos(network, Eos);
  console.log("eos from", config.eos_from);
  console.log("eos to", config.eos_to);

  ScatterJS.login().then(id => {
    if (!id) return console.error("no identity");
    const account = ScatterJS.account("eos");
    const options = { authorization: [`${account.name}@${account.authority}`] };

    var interval;
    var MAXCOUNT = times; //1127;
    var count = 0;
    function remind() {
      if (count < MAXCOUNT) {
        console.log(
          "interval5... ",
          count++,
          account.name,
          config.eos_to,
          options
        );
        eos
          .transfer(account.name, config.eos_to, "0.0001 EOS", count, options)
          .then(res => {
            console.log("sent: ", res);
          })
          .catch(err => {
            console.error("error: ", err);
          });
      } else {
        console.log("clearInterval(interval);  interval5... ");
        clearInterval(interval);
      }
    }
    console.log("setInterval", count, MAXCOUNT);
    interval = setInterval(function() {
      remind();
    }, intervals * 1000); //5秒循环调用执行remind()函数

    // //清除延时程序
  });
});
