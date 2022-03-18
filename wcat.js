// What will the command do
// It will display file contents of all the speciified files

// How to use Command
// node wcat.js file1.txt file2.txt file3.txt

// It can have any number of arguments

const { log } = require("console");
const fs = require("fs");
const { devNull } = require("os");

// taking input
let inputArr = process.argv.slice(2);
// console.log(inputArr); // checking if input taken successfully

// creating an array to copy the file names inputed
let filesArr = [];
let optionsArr = [];
for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  if (firstChar == "-") {
    optionsArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}

// console.log(filesArr);
// console.log(optionsArr);

// Why to copy contents of inputArr in filesArr???
// In order to differentiate b/w (-n, -b, options) and (files)

// Check if all the files exists, if not EXIT
for (let i = 0; i < filesArr.length; i++) {
  let exists = fs.existsSync(filesArr[i]);
  if (!exists) {
    console.log("One mor more files does not exists");
    return;
    // process.exit();  // alternative for return
  }
}

// Reading and copying the Files
let content = ""; // String to store the contents of all the files
for (let i = 0; i < filesArr.length; i++) {
  let fileContent = fs.readFileSync(filesArr[i]);
  content += fileContent;
  content += "\n"; // adding newline so that content of next files appears in the next line
}

// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);

let isSpresent = inputArr.includes("-s");
let isNpresent = inputArr.includes("-n");
let isBpresent = inputArr.includes("-b");

if(isSpresent){
    for(let i=1; i<contentArr.length; i++){
        if(contentArr[i] == "" && (contentArr[i-1] == "" || contentArr[i-1] == null)){
            contentArr[i] = null;
        }
    }

    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            console.log(contentArr[i]);
        }
    }
}

// If both options -n and -b exists apply FCFS and apply the first entered
// In case of not found -1 would be returned
let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");

console.log("Index of N" + indexOfN);
console.log("Index of B" + indexOfB);

let finalOption = "";

if(indexOfN != -1 && indexOfB != -1){
    if(indexOfN < indexOfB){
        finalOption = "-n";
    }
    else{
        finalOption = "-b";
    }
}

else{
    if(indexOfN != -1){
        finalOption = "-n";
    }
    else if(indexOfB != -1){
        finalOption = "-b";
    }
}



if(finalOption == "-n"){
    modifyContentN();
}
else{
    modifyContentB();
}

function modifyContentB(){
    for (let i = 0; i < contentArr.length; i++) {
        console.log(i+1 + ". " + contentArr[i]);
    }
}

function modifyContentN(){
    let count = 1;
    for (let i = 0; i < contentArr.length; i++) {
        if(contentArr[i] != ""){
            console.log(count + ". " + contentArr[i]);
            count++;
        }
        else{
            console.log(contentArr[i]);
        }
    }
}