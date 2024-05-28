import { yarg as argv } from "./config/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(argv);
// console.log(process.argv);

(async()=>{
    await main();
})();



async function main() {
    const {b:base,l:limit,s:showTable,n:name,d:destination}= argv
    ServerApp.run({base,limit,showTable,name,destination});
}