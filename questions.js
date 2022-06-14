// question
let nMultipleCurrentQuestion = 0;
let arrMultipleQuestions = [];
// const
const AMOUNT_OF_QUESTION = 5; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 1100;

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
    document.querySelector(`.multipleQuestionContainer`).innerHTML = "";
    // add question
    let question = El("div", {cls: `multipleQuestion`}, arrMultipleQuestions[nMultipleCurrentQuestion].question);
    document.querySelector(`.multipleQuestionContainer`).append(question);
    // add answeres
    if(arrMultipleQuestions[nMultipleCurrentQuestion].type === "multiple") {        
        let ansContainer = El("div", {cls: `ansContainer`},);
        document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
        for(let i = 1; i <= 4; i++){
            let answer = El("div", {classes: [`multipleAns`, `ans${i}`, `ans`, `background`] , listeners: {click : onClickAnswer}}, arrMultipleQuestions[nMultipleCurrentQuestion][`ans${i}`]);
            document.querySelector(`.ansContainer`).append(answer);
        }
    } else {
        let ansContainer = El("div", {cls: `ansContainer`},
            El("div", {classes: [`binaryAns`, `true`, `ans`, `background`] , listeners: {click : onClickAnswer}}, "נכון"),
            El("div", {classes: [`binaryAns`, `false`, `ans`, `background`] , listeners: {click : onClickAnswer}}, "לא נכון"),
        );
        document.querySelector(`.multipleQuestionContainer`).append(ansContainer);
    }

    let counter = El("div", {cls: `counter`}, `תשובות נכונות: ${correctAns}`);
    document.querySelector(`.multipleQuestionContainer`).append(counter);
}

/* onClickAnswer
--------------------------------------------------------------
Description: */
const onClickAnswer = (event) => {
    // remove listeners
    let arrAns =  document.querySelectorAll(`.ans`);
    for(let i = 0; i < arrAns.length; i++){
        arrAns[i].removeEventListener("click" , onClickAnswer);
    }
    document.querySelector(`.${String(arrMultipleQuestions[nMultipleCurrentQuestion].correctAns)}`).style.backgroundImage = "url(assets/media/right_button.svg)";
    // check if answer is correct
    if(event.currentTarget.classList[1] === String(arrMultipleQuestions[nMultipleCurrentQuestion].correctAns)){
        correctAns++;
        document.querySelector(".multipleQuestionContainer .counter").innerHTML = `תשובות נכונות: ${correctAns}`;
    } else {
        console.log("לא נכון");
        event.currentTarget.style.backgroundImage = "url(assets/media/wrong_button.svg)";
    }

    // send to next question.
    nMultipleCurrentQuestion++;
    setTimeout(() => {
        if(nMultipleCurrentQuestion < AMOUNT_OF_QUESTION) {
            addContentToQuestion();
        } else {
            questionsEndAmerican();
        }
    }, DELAY_AFTER_QUESTION);
}

const questionsEndAmerican = () => {
    document.querySelector(".multipleQuestionContainer").style.display = "none";
    document.querySelector(".completeSentenceContainer").style.display = "block";
    addContentToSentence();
}