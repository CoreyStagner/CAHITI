/////////////////////////////////////////////////
//
// Cards Against Humanity In a Terminal Interface
// (Single Player Mode - Just for laughs)
//
// by Corey Stagner
// CS DEV
//
/////////////////////////////////////////////////

// Requires
var gimme = require("inquirer");
var chalk = require("chalk");
var card = require("./basicCard.js");
var cloze = require("./clozeCard.js");

// Initial Variables
var humane = true;
var questions = [];
var humaneQuestions = ["Question 1", "Question 2", "Question 3"];
var answers = ["Answer 1", "Answer 2","Answer 3","Answer 4","Answer 5","Answer 6"];
var inhumaneQuestions = ["aQuestion 1", "aQuestion 2", "aQuestion 3"];
var aAnswers = ["aAnswer 1", "aAnswer 2","aAnswer 3","aAnswer 4","aAnswer 5","aAnswer 6"];
var p1Hand = []; // holds player 1 cards so that they can choose one for the question

// Functions

// Check to see if the player wants to play the clean version or also have a shot of whiskey with thier game
function gameChoice(){
    gimme.prompt([
        {
            type: "list",
            message: "Are you over 21?",
            choices: ["Yes", "No"],
            name: "adult"
        }// end prompt()
    ]).then(function(response){
        var ra = response.adult;
        console.log(ra);
        if(ra == "Yes"){
            console.log("You are consenting that you are over 21. You may even not be but honestly, who cares! Have fun. But no alcohol!")
            gimme.prompt([
                {
                    type:"list",
                    message: "Grab a drink, and lets play. Which game do you want to play?",
                    choices: ["Standard Trivia Game", "Advanced Trivia Game", "Cards Against Humanity In a Terminal Interface"],
                    name: "game"
                }// end prompt()
            ]).then(function(response){
                var rg = response.game;
                console.log(rg);
                if(rg === "Standard Trivia Game"){
                    console.log("Starting up the Standard Trivia Game");
                    startBasicTrivia();
                } else if(rg === "Advanced Trivia Game"){
                    console.log("Starting up the Advanced Trivia Game");
                    startAdvancedTrivia();
                } else if(rg === "Cards Against Humanity In a Terminal Interface"){
                    console.log("Starting up the Cards Against Humanity In a Terminal Interface");
                    humane = false;
                    startCAHITI();
                } else{
                    console.log("I have no idea how you got here!");
                }// end else if()
            }); // end .then()
        } else if(ra === "No") {
            console.log("Lame, you admitted that are under 21. There is no way for me to validate that.");
            gimme.prompt([
                {
                    type:"list",
                    message: "Since you are under age, which game do you want to play?",
                    choices: ["Standard Trivia Game", "Advanced Trivia Game"],
                    name: "game"
                }// end prompt
            ]).then(function(response){
                var rg = response.game;
                    console.log(rg);
                    if(rg === "Standard Trivia Game"){
                        startBasicTrivia();
                    } else if(rg === "Advanced Trivia Game"){
                        startAdvancedTrivia();
                    } else{
                        console.log("I have no idea how you got here!");
                    }
            })// end then()
        } else {
            console.log("Something is not working on my age prompt question!")
        }//end else if()
    })// end gimme.prompt(Are you 21?)
}// end gameChoice()

function startBasicTrivia(){
    console.log("Started Basic Trivia Game");
}

function startAdvancedTrivia(){
    console.log("Started Advanced Trivia Game");
}

function startCAHITI() {
    console.log("Started CAHITI");
}

function chooseQuestion(options){
    options = questions;
    console.log(options);
}

gameChoice();