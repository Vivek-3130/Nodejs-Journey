const { log } = require("console");
const fs = require("fs");

fs.writeFile("message1.txt","Hello From Vivek's Nodejs!!",(err)=>{
    if(err) throw err;
    console.log("This File Has Been Saved.");
});

fs.readFile("message1.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
});

