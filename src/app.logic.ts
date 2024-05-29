import fs from 'fs'


import { yarg as argv } from "./config/plugins/yargs.plugin";

const {b:base,l:limit,s:showTable}= argv

let outputMessage='';
const headerMessage=`
===========================================
            Tabla del ${base}
===========================================\n
`;

for (let index = 1; index <= limit; index++) {
    outputMessage+=`${base} x ${index} = ${base*index} \n`
}


outputMessage=headerMessage+outputMessage;
if(showTable)
console.log(outputMessage);


const outputPath = `outputs`
fs.mkdirSync(outputPath,{recursive:true});
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`,outputMessage);

