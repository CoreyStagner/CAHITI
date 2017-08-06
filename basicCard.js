console.log("basicCard.js was imported");

var basicCardArr = [
    {
        question: 'Who was the first president of the united States?',
        answer: 'George Washington' },
    { 
        question: 'What number comes after 1?', 
        answer: '2' }
]

function BasicCard(question, answer) {
    this.question = question;
    this.answer = answer;
}// end BasicCard({})

function createQuestions(){
    var card1 = new BasicCard("Who was the first president of the united States?", "George Washington");
    var card2 = new BasicCard("What number comes after 1?", "2");
    basicCardArr.push(card1);
    basicCardArr.push(card2);
} // end createQuestions()

createQuestions();

module.export = basicCardArr;
