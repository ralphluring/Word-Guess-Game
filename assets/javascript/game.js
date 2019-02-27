let wordArray = ["banana", "orange","grapes"];
let bodyArray = ["head", "arms","legs","feet","hands","eyes"]
let randomWord = "";
let compWordArray;
let userProgress = [];
let userInput = "";
let numGuesses = 0;
let missedLetters = "";
// get dom elements to manipulate
let wordArea = document.querySelector(".word__text");
let hangman = document.querySelector(".hangman");
let missed = document.querySelector(".missed");
let guesses = document.querySelector(".guesses");
let restart = document.querySelector(".restart");

// get random word for choices
function getRandomWord(){
    randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
}

function initialize(){
    getRandomWord();
    // turn the random word into an array
    compWordArray = randomWord.split("");
    // add a blank for each letter 
    for(let i = 0; i < compWordArray.length; i++){
        userProgress.push("_");
    }
    
    document.querySelector(".hangman__text").innerHTML = "";
    render();
}
// check to see if user wins
function checkWinner(){
    if(compWordArray.join(" ") === userProgress.join(" ")){
        document.querySelector(".hangman__text").textContent = "WINNNER";
        document.querySelector(".svgbody").innerHTML = "";
    }
}

// get the users current progress and append it to word area
function render(){
    wordArea.textContent = userProgress.join(" ");
    missed.textContent = "Wrong Letters:  " + missedLetters;
    guesses.textContent = "Number of Guesses:  " +  numGuesses;
}

document.onkeyup = function(e){
    numGuesses ++;
    userInput = e.key.toLowerCase();
    let flag = false;

    for(let j = 0; j < compWordArray.length;j++){

        if(userInput === compWordArray[j]){
            userProgress[j] = userInput;
            flag = true;
            checkWinner();   
        }
    }

    function getRandomBodyPart(){
        bodyPart = bodyArray[Math.floor(Math.random() * bodyArray.length)];
    }

    if(flag === false){
        missedLetters += userInput;
        getRandomBodyPart();
        if(bodyPart === "head"){  
            let head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            head.setAttribute("cx", "150px");
            head.setAttribute("cy", "30px");
            head.setAttribute("rx", "25px");
            head.setAttribute("ry", "25px");
            document.querySelector(".svgbody").append(head);  
        }else if(bodyPart === "arms"){
            let arms = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            arms.setAttribute("height", "50px");
            arms.setAttribute("width", "10px");
            arms.setAttribute("y","20px");
            arms.setAttribute("x","100px");
            arms.setAttribute("transform","rotate(-30 100 40)");
            document.querySelector(".svgbody").append(arms);  
        }
          
    }
    render();         
}

restart.addEventListener("click",function(){
    missedLetters = "";
    numGuesses = 0;
    userProgress = [];
    initialize();
    render();
  
});

initialize();




