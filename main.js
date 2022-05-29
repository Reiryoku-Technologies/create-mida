#!/usr/bin/env node
const { execSync, } = require("child_process");
const colors = require("colors");
const inquirer = require("inquirer");
const fs = require("fs");

console.log(colors.yellow.bold.italic(`
        @                @        @@@       @@@@@@@@@@@               @@       
        @@@            @@@        @@@       @@@       @@@@           @@@@      
        @@@@@        @@@@@        @@@       @@@         @@@         @@@@@@.    
        @@ @@@     @@@ @@@        @@@       @@@          @@@       @@@  @@@&   
        @@   @@@ @@@@  @@@        @@@       @@@         @@@       @@@    @@@@  
        @@     @@@@    @@@        @@@       @@@        @@@#      @@@@@@@@@@@@@ 
        @@      @      @@@        @@@       @@@@@@@@@@@@       /@@@        @@@@       

                                   www.mida.org
`));

console.log("Creating a new Mida project...".bold);

const nodeMajorVersion = process.versions.node.split('.')[0];
const templatesPath = `${__dirname}/templates`;
const currentDirectory = process.cwd();
const languagesDirectories = { "JavaScript": "js", "TypeScript": "ts", };

const printErrorMessage = () => {
    console.log("The installation will not proceed, please fix the issue and try again".red.bold);
};

const createDirectoryContents = (templatePath, projectName) => {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach((file) => {
        const originalFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(originalFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(originalFilePath, "utf8");
            const writePath = `${currentDirectory}/${projectName}/${file}`;

            fs.writeFileSync(writePath, contents, "utf8");

        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${currentDirectory}/${projectName}/${file}`);
            createDirectoryContents(`${templatePath}/${file}`, `${projectName}/${file}`);
        }
    });
};

const installDependencies = (projectName) => {
    execSync(`cd ${projectName} && npm install --silent`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`.red.bold);
        }
    });
};

const printSuccessMessage = () => {
    console.log("\n");
    console.log("Join the community on Discord (https://discord.gg/cKyWTUsr3q) and Telegram (https://t.me/joinmida)");
    console.log("Something is not working? Create an issue on https://github.com/Reiryoku-Technologies/Mida/issues");
    console.log("\n");
};

(async () => {
    // <node-version-check>
    if (nodeMajorVersion < 15) {
        console.log(`You need at least Node.js v15 to use Mida, your current Node.js version is ${process.version}`.red);

        return printErrorMessage();
    }
    // </node-version-check>

    const { projectName, } = await inquirer.prompt([
        {
            name: "projectName",
            message: "What is your project name?",
        },
    ]);

    const projectPath = `${currentDirectory}/${projectName}`;

    try {
        fs.mkdirSync(projectPath);
    }
    catch (error) {
        if (error.code === "EEXIST") {
            console.log(`The directory ${projectName} already exists`.red);

            return printErrorMessage();
        }
    }

    /*
    const { language, } = await inquirer.prompt([
        {
            type: "list",
            name: "language",
            message: "Which language do you want to use?",
            choices: [ "JavaScript", "TypeScript", ],
        },
    ]);
    */

    createDirectoryContents(`${templatesPath}/js`, projectName);
    installDependencies(projectName);

    console.log("\n");
    console.log("The project has been created successfully".bold.bgGreen);
    console.log(projectPath.bold.bgGreen);

    return printSuccessMessage();
})();
