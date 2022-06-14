var nPage = 1;

var arrPages = [
        {
            // about- page 0
            divName: ["about"],
            functions: ['pop_buttons(document.querySelector("#back-button-odot"), "1")']
        },
        {
            // opening game question- page 1
            divName: ["instructions"],
            functions: [ `pop_buttons(document.querySelector(".odot-logo"), "0")`, `pop_buttons(document.querySelector(".start-button"), "+1")`]
        },
        {
            // questions- page 2
            divName: ["questions"], // the last div contains the speech bubble
            functions: [`arrMultipleQuestions = shuffle(DATA.questions);`, `addContentToQuestion()`, `document.querySelector(".odot-logo").style.display = "none"`] // array of functions that are needed to the page. If the functions contain the word "pop", it will happen only once and will be popped out of the array afterwards
        },
        {
            // questions- page 2
            divName: ["end"], // the last div contains the speech bubble
            functions: [] // array of functions that are needed to the page. If the functions contain the word "pop", it will happen only once and will be popped out of the array afterwards
        }
];

let correctAns = 0;

window.addEventListener('load', () => {
    document.querySelector(".loader").classList.add("fade");
    showPage();
});

// check if the user can start the mission
// checkCode = (event) => {
//     let input = event.target;
    
//     // if the code is correct
//     if (input.value === eval(`coordinate_${input.getAttribute("data-num")}`)) {
//         input.removeEventListener('input', checkCode);
//         input.style.borderColor = "rgb(32, 219, 159)";
//         cooardinates++;
//     }

//     // if the user assigned all coordinates
//     if (cooardinates === document.querySelectorAll('input').length) {
//         // move part
//         movePage("1","0"); 
//         document.querySelector(".odot-logo").style.display = "none";
//     }
// }

movePage = (num) => {
    hidePage();

    if (num.length === 1) {
        nPage = Number(num);
    } else {
        nPage = nPage + Number(num);
    }

    showPage();
}

function hidePage() {
    // hides last divs
    for (let i = 0; i < arrPages[nPage].divName.length; i++) {
        document.querySelector("#" + arrPages[nPage].divName[i]).style.display =  "none";
    }
}

function showPage() {
    // shows current divs
    for (let i = 0; i < arrPages[nPage].divName.length; i++) {
        document.querySelector("#" + arrPages[nPage].divName[i]).style.display = "block";
    }
    callPageFunctions();    
}

callPageFunctions = (event) => {
    // functions
    // calls the functions of the page
    if (arrPages[nPage].functions.length > 0) {
        let nFunction = 0;
        while (nFunction < arrPages[nPage].functions.length) {
          eval(arrPages[nPage].functions[nFunction]);
          // functions that contains the word "pop" will accur only once
          if (arrPages[nPage].functions[nFunction].includes("pop")) {
            arrPages[nPage].functions.splice(nFunction , 1);
            // since the function happens only once there is no need in adding nFunction +1
          } else {
            nFunction++;
          }
        }
    }
}

// function that adds events listeners to buttons that affects the page's display- called only one time for each button
pop_buttons = (button, part, num) => {
    button.addEventListener('click', function() {
        movePage(part, num)   
    });
}

// function that adds events listeners only one time
pop_eventListener = (elem, act, func) => {
    elem.addEventListener(act, func);
}

retry = () => {
    movePage("1");
    document.querySelector('#instructions .instructions').innerHTML = "ענית על פחות מ-8 שאלות ולא הוכחת בקיאות בנושא הסודי.<br>עליך לנסות שוב.";
    nMultipleCurrentQuestion = 0;
    arrMultipleQuestions = []
    nSentenceCurrentQuestion = 0;
    strSentenceCurrentAns = 0;
    correctAns = 0
    document.querySelector(".multipleQuestionContainer").style.display = "block";
    document.querySelector(".completeSentenceContainer").style.display = "none";
}

win = () => {
    movePage("3");
}


// let currLock;
// loadMission = () => {
//     document.querySelector('#opening').style.display = "none";
//     document.querySelector('#mission').style.display = "block";
//     // allow drag and drop
//     setDrag();
//     setDrop();

//     let lock;
//     let ArrLocks = [];
//     for (let i = 1; i <= 9; i++) {
//         // drag
//         lock = El("div", {classes: [`drag`, `background`], attributes: {"data-num": i, "draggable" : "false"}}, 
//         El("div", {classes: [`background`, `lock`], listeners: {click : question}}));
//         ArrLocks.push(lock); 
//         lock.style.backgroundImage = `url(assets/media/puzzle_${i}.svg)`;
//         // drop
//         drop = El("div", {classes: [`drop`, `flex`], attributes: {"data-num": i}});
//         document.querySelector(`#puzzle`).append(drop);
//     }
//     let random;
//     for (let i = 1; i <= 9; i++) {
//         random = Math.floor(Math.random() * ArrLocks.length);
//         document.querySelector(`#pieces`).append(ArrLocks[random]);
//         ArrLocks.splice(random, 1);
//     }
//     // document.querySelectorAll('.lock').forEach((lock) => {
//     //     lock.addEventListener('click', question);
        
//     // });
// }

// // popping question
// question = (event) => {
//     //event.target.style.display = "none";
//     // event.target.parentElement.setAttribute("draggable", "true");
//     // document.querySelector('.completeSentenceContainer').style.display = "block";
//     // addAnimation(document.querySelector('.completeSentenceContainer'), "fade-in", 1500, 500);
//     // addAnimation(document.querySelector('.completeSentenceContainer'), "fade-in", 1500, 200);
//     // if (document.querySelector('.completeSentenceContainer').classList.contains("fade-out")) {
//     //     document.querySelector('.completeSentenceContainer').classList.remove("fade-out")
//     // };
//     document.querySelector('.completeSentenceContainer').style.animation = "fadeIn 1s ease forwards";
//     addContentToSentence();
//     currLock = event.target;
// }

// const questionsEndAmerican = () => {
//     console.log("סיימתי");
//     // if (document.querySelector('.completeSentenceContainer').classList.contains("fade-in")) {
//     //     document.querySelector('.completeSentenceContainer').classList.remove("fade-in")
//     // };
//     // addAnimation(document.querySelector('.completeSentenceContainer'), "fade-out", 1500, 200);
//     // display lock
//     currLock.style.display = "none";
//     currLock.parentElement.setAttribute("draggable", "true");
// }

// closeWindow = (event) => {
//     // document.querySelector('.completeSentenceContainer').classList.remove("fade-in");
//     document.querySelector('.completeSentenceContainer').style.animation = "fadeOut 1s ease forwards";
// //     document.querySelector('.completeSentenceContainer').classList.add("fade-out");
// //    addAnimation(document.querySelector('.completeSentenceContainer'), "fade-out", 1500, 200, function() {
// //         // document.querySelector('.completeSentenceContainer').classList.remove("fade-in");
// //    });
// }

// let countDrag = 0;
// // after an item has been dropped correctly
// onDrop = (drag, drop) => {
//     drag.setAttribute("draggable", "false");
//     countDrag++;
//     if (countDrag === document.querySelectorAll('.drag').length) {
//         document.querySelector('#mission .instructions').innerHTML = "כל הכבוד! חשפתם את המספר הבא!"
//     }
// }







