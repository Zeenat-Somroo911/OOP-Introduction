#!/usr/bin/env node
import chalk from "chalk";
import readline from "readline";
// Developer Information
const developerName = "Developer: ZEENAT SOMROO";
// Create a Person class
class Person {
    personality; // private variable accessible in the class
    // Constructor sets default personality value to "Mystery"
    constructor() {
        this.personality = "Mystery";
    }
    // Method to ask a question and determine personality based on answer
    AskQuestion(answer) {
        switch (answer) {
            case 1:
                this.personality = "Extrovert";
                break;
            case 2:
                this.personality = "Introvert";
                break;
            case 3:
                this.personality = "Ambivert";
                break;
            default:
                this.personality = "You are still a Mystery";
        }
    }
    // This method returns the current value of the personality
    GetPersonality() {
        return this.personality;
    }
}
// Define a Student class that extends Person class
class Student extends Person {
    // private field to hold any data assigned to the Name property
    _name;
    constructor() {
        super();
        this._name = "";
    }
    // Getter method for the name property
    get name() {
        return this._name;
    }
    // Setter method for the name property
    set name(value) {
        this._name = value;
    }
}
// Async function to handle readline questions
const askQuestion = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};
// Main function
const main = async () => {
    try {
        const myName = await askQuestion(chalk.bold.greenBright("What is your name? "));
        let myStudent = new Student(); // create a new student object
        myStudent.name = myName; // Set the student's name
        const answer = await askQuestion(chalk.bold.greenBright(chalk.bold.yellowBright("Type 1: ") +
            "If you like to talk to others?\n" +
            chalk.bold.yellowBright("Type 2: ") +
            "If you would rather keep to yourself?\n" +
            chalk.bold.yellowBright("Type 3: ") +
            "If you enjoy a balance of both?\n" +
            "Your choice: "));
        // Validate input and assign personality
        const answerNum = parseInt(answer);
        if (isNaN(answerNum) || answerNum < 1 || answerNum > 3) {
            console.log(chalk.bold.redBright("Invalid input. Please enter 1, 2, or 3."));
        }
        else {
            myStudent.AskQuestion(answerNum); // Assign personality based on answer
            console.log(chalk.bold.magentaBright(`Your name is ${myStudent.name} and your personality type is ${myStudent.GetPersonality()}!`));
        }
        console.log(chalk.bold.cyanBright(`\nThank you for using this program!\n${developerName}`));
    }
    catch (error) {
        console.error(chalk.bold.redBright("An error occurred: "), error);
    }
};
main();
