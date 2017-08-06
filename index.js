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
var cardConst = require("./basicCard.js");
var cardLib = require("./basicCardLibrary.json");
var clozeConst = require("./clozeCard.js");
var clozeLib = require("./clozeCardLibrary.json");
var colors = require("colors");


// Initial Variables
var humane = true;
var score = 0;
var questions = [];
var humaneQuestions = ["Question 1", "Question 2", "Question 3"];
var answers = ["Answer 1", "Answer 2","Answer 3","Answer 4","Answer 5","Answer 6"];
var inhumaneQuestions = ["aQuestion 1", "aQuestion 2", "aQuestion 3"];
var aAnswers = ["aAnswer 1", "aAnswer 2","aAnswer 3","aAnswer 4","aAnswer 5","aAnswer 6"];
var p1Hand = []; // holds player 1 cards so that they can choose one for the question

/////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////

// function pretty(input){
//     JSON.stringify(input, null, 2);
// }// end pretty()

// Check to see if the player wants to play the clean version or also have a shot of whiskey with thier game
function gameChoice(){
    score = 0;
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
                    message: "Grab a drink, and let's play. Which game do you want to play?",
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
            });// end then()
        } else {
            console.log("Something is not working on my age prompt question!")
        }//end else if()
    });// end gimme.prompt(Are you 21?)
}// end gameChoice()

function pickCard(){
    var questionsRemaining = questions.length;
    var randomIndex = Math.floor(Math.random() * questionsRemaining);
    var chosenCard = questions[randomIndex];
    console.log(chosenCard);
    questions.splice(randomIndex, 1);
    return chosenCard;

}// end pickCard()

function askQuestion(){
    if(questions.length > 0){
        console.log("Game continues");
        theCard = pickCard();
        console.log(theCard.quesion);
        console.log(theCard.answer);
        console.log("Your Question is " + JSON.stringify(theCard, null, 2));
        gimme.prompt([
            {
                type: "input",
                message: theCard.front,
                name: "question"
            }
            ]).then(function(response){
                var answer = response.question;
                if (answer.toLowerCase === theCard.back.toLowerCase){
                    console.log("Correct");
                } else {
                    console.log("Wrong");
                }
                // recursion of function
                askQuestion();
            });// end gimme.prompt.then()
    }else{
        console.log("Game is Over")
    }// end if/else()
}

function startBasicTrivia(){
    console.log("Started Basic Trivia Game");
    // Setup Basic Trivia Game
    questions = cardLib;
    var rounds = questions.length;
    console.log("There will be " + rounds + " rounds.");
    askQuestion();
}// end startBasicTrivia()

function startAdvancedTrivia(){
    console.log("Started Advanced Trivia Game");
    // Setup Advanced Trivia Game
    questions = clozeLib;
    pickCard();
}

function startCAHITI() {
    console.log("Started CAHITI");
}

function chooseQuestion(options){
    options = questions;
    console.log(options);
}

gameChoice();




























function shuffleDeck() {
  newDeck = library.slice(0); //copy the flashcards into a new array
  for (var i = library.length - 1; i > 0; i--) { //this algorithm (Fisher-Yates shuffle) should jumble up the order of the copied array

      var getIndex = Math.floor(Math.random() * (i + 1));
      var shuffled = newDeck[getIndex];

      newDeck[getIndex] = newDeck[i];

      newDeck[i] = shuffled;
  }
  fs.writeFile("cardLibrary.json", JSON.stringify(newDeck, null, 2)); //write the new randomized array over the old one
  console.log(colors.cyan("The deck of flashcards have been shuffled"));
  //setTimeout(openMenu, 1000);  //*** shuffle only works on app reload, look into how to apply it in-app
}