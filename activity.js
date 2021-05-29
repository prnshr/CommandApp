#!/usr/bin/env node

/**
 
 * organise
 when executing this command, we would oganise all the files present in a folder into organise folder
 The files will be orgenised on the basis of the extensions present:-

 Extensions to be considered.... 
 .jpg, .jpeg , .png, .txt ==> the files will be organised on the basis of these extensions:-


Step 1:- Retrieve the command and decide which operation to perform
Step 2:- get path for the "source folder" & generate path for the "destination folder"

Step 3 :- loop over all the files and folders present inside the "source folder" ==> Recursion can also be applied here
    a) when recursion is applied here or not
    b) when recursion is not applied here

Step 4:- copy every file from the "source folder" to the appropriate folder inside the organise folder:-
    => Note:- The final destination folder will be dependent upon the extension of the file in consideration:- 
              So generate the "destination folder" and if it exists or not, if it exists then good else create it.

Step 5:- Perform unlinkSync on the current file, so that the operation of "cut - paste".


// source can ber said as current working directory, now the question is where will organise directory will be created.

We are asuming that there will be souce directory inside our current window directory.

 */



const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

let validExt = ["jpg", "jpeg", "png", "txt" ]


let inputArr = process.argv;


let command = inputArr[2];
// console.log(inputArr);
let cwd = process.cwd();

isOrganise(command,cwd);





function isOrganise(command, cwd){
    if(command == null){
        console.log(" Please enter a command");
        
    }

    if(command == "organise"){
        console.log(" Organised command invokded.... Started Processing");
        let basePath = path.join(cwd ,"organise");
        if(!fs.existsSync(basePath)){
            console.log("Creating Organise Folder");
            fs.mkdirSync(basePath);
        }

        organise(path.join(cwd ,"source"));
        
    }
}


function organise(currSoucePath){

    if(fs.lstatSync(currSoucePath).isFile()){

        let ext = path.extname(currSoucePath).slice(1);
        
        
        // create folder if the folder does not exist and also handles the "other" case:-
        console.log("ext = "+ ext);
        let destPath = checkAndCreatePath(ext);
        console.log(destPath);
        let basename = path.basename(currSoucePath);
        console.log(basename);
        let extname = path.extname(currSoucePath);

        let filename = basename;
        console.log(currSoucePath);
        console.log("Destination path is "+destPath);
        
        let finalPath = path.join(destPath,filename);
        fs.copyFileSync(currSoucePath,finalPath);
        fs.unlinkSync(currSoucePath);
        return;
    }

    let filesAndFolders = fs.readdirSync(currSoucePath);

    for(let i = 0;i < filesAndFolders.length ; i++){
        let newPath = path.join(currSoucePath,filesAndFolders[i]);
        organise(newPath);
        
    }
    fs.rmdirSync(currSoucePath);

}


function checkAndCreatePath(ext){

    // create the directory and return if the extension is valid 
    for(let i =0 ; i<validExt.length ;i++){

        let currExt = validExt[i];
        if(ext == currExt){
            let destPath = path.join("organise",ext);
            if(!fs.existsSync(destPath)){
                fs.mkdirSync(destPath);
            }
            return destPath;
        }
    }

    let destPath = path.join("organise", "others");
    if(!fs.existsSync(destPath)){
        fs.mkdirSync(destPath);
    }
    return destPath;
}


/**
 * Shebang syntax is used for implementing command line feature
 * npm init -y
 * bin:{"pep":"activity.js"}
 * npm link
 */


function isTree(baseDir){
    // Show the tree structure of the whole 
}