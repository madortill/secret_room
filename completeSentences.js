//completeSentence
let nSentenceCurrentQuestion = 0;
let strSentenceCurrentAns = 0;
// const
const DELAY_AFTER_SENTENCE = 1100;

/* addContentToSentence
--------------------------------------------------------------
Description: */
const addContentToSentence = () => {
    document.querySelector(`.completeSentenceContainer`).innerHTML = "";
    let instructions = El("div", {classes: [`instructions`, `bold`] }, "השלימו את המשפט");
    // create sentence
    let sentence = El("div", {cls: `sentenceContainer`},
        El("span", {cls: `sentence`}, DATA.completeSentence[nSentenceCurrentQuestion].sentence[0]),
        El("span", {cls: `dropDown`},
            El("div", {classes: [`background`, `dropDownTitle`], listeners: {click : controlDropDown}}, "בחר/י..."),
            El("div", {cls: `containerDropDown`})),
        El("span", {cls: `sentence`}, DATA.completeSentence[nSentenceCurrentQuestion].sentence[1]),
    );
    document.querySelector(`.completeSentenceContainer`).append(instructions);
    document.querySelector(`.completeSentenceContainer`).append(sentence);
    //create check button (without listener)
    let check =  El("div", {classes: [`checkButtonSentence`, `horizon-center`]}, "בדיקה");
    document.querySelector(`.completeSentenceContainer`).append(check);

    let counter = El("div", {cls: `counter`}, `תשובות נכונות: ${correctAns}`);
    document.querySelector(`.completeSentenceContainer`).append(counter);
}

/* controlDropDown
--------------------------------------------------------------
Description: */
const controlDropDown = () => {
    // remove listener and add drop down
    document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
    for(let i = 0; i < DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns.length; i++){
        let dropDownItem = El("div", {classes: [`dropDownItem`, `ans${i}`, i], listeners: {click : selectAnswer}},DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns[i]);
        document.querySelector(`.containerDropDown`).append(dropDownItem);
    }
    document.querySelector(`.dropDownTitle`).style.backgroundImage = "url(assets/media/generic_button.svg)";
}

/* selectAnswer
--------------------------------------------------------------
Description: */
const selectAnswer = (event) => {
    let currAns = event.currentTarget.classList[2];
    strSentenceCurrentAns = event.currentTarget.classList[1];
    document.querySelector(`.dropDownTitle`).innerHTML = DATA.completeSentence[nSentenceCurrentQuestion].dropDownAns[currAns];
    document.querySelector(`.containerDropDown`).innerHTML = ``;
    document.querySelector(`.dropDownTitle`).addEventListener("click", controlDropDown);
    document.querySelector(`.checkButtonSentence`).addEventListener("click", checkAnswer);
}

/* checkAnswer
--------------------------------------------------------------
Description: */
const checkAnswer = () => {
    document.querySelector(`.checkButtonSentence`).removeEventListener("click", checkAnswer);
    if (strSentenceCurrentAns ===  DATA.completeSentence[nSentenceCurrentQuestion].correctAns){
        console.log("תשובה נכונה");
        document.querySelector(`.dropDownTitle`).style.backgroundImage = "url(assets/media/right_button.svg)";   
        correctAns++;
        console.log(correctAns);
        document.querySelector(".completeSentenceContainer .counter").innerHTML = `תשובות נכונות: ${correctAns}`;
    } else {
        console.log("תשובה לא נכונה");   
        document.querySelector(`.dropDownTitle`).style.backgroundImage = "url(assets/media/wrong_button.svg)"; 
    }
    nSentenceCurrentQuestion++;
    document.querySelector(`.dropDownTitle`).removeEventListener("click" , controlDropDown);
    setTimeout(() => {
        if(nSentenceCurrentQuestion <  DATA.completeSentence.length) {
            addContentToSentence();
        } else {
            questionsEndCompleteSentence();
        }
    }, DELAY_AFTER_SENTENCE) 
}

const CORRECT_QUESTIONS = 8
const questionsEndCompleteSentence = () => {
    // user didnt succeed
    if (correctAns < CORRECT_QUESTIONS) {
        // user failed - retry
        retry();
    } else {
        win(); 
    }
}
