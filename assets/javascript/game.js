let wordArray = ["banana", "orange","grapes"];
let bodyArray = ["head", "arms","body","legs"];
let randomWord = "";
let compWordArray;
let userProgress = [];
let userInput = "";
let numGuesses = 0;
let missedLetters = "";
let gameWon = false;
let singlePart = 0;
let gamesWon = 0;
let gamesLost = 0;
// to stop game play
let play = true; 

// get dom elements to manipulate
let wordArea = document.querySelector(".word__text");
let hangman = document.querySelector(".hangman");
let missed = document.querySelector(".missed");
let guesses = document.querySelector(".guesses");
let restart = document.querySelector(".restart");
let svgElement = document.querySelector(".svgbody");
let winOrLose = document.querySelector(".winOrLose")

// svg stuff
let winnerImg = document.createElement("p");



let head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "150px");
head.setAttribute("cy", "30px");
head.setAttribute("rx", "25px");
head.setAttribute("ry", "25px");
let arm1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
arm1.setAttribute("height", "50px");
arm1.setAttribute("width", "10px");
arm1.setAttribute("y","20px");
arm1.setAttribute("x","100px");
arm1.setAttribute("transform","rotate(-30 100 40)");
let arm2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
arm2.setAttribute("height", "50px");
arm2.setAttribute("width", "10px");
arm2.setAttribute("y","20px");
arm2.setAttribute("x","100px");
arm2.setAttribute("transform","rotate(30 170 220)");
let body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
body.setAttribute("cx", "150px");
body.setAttribute("cy", "100px");
body.setAttribute("rx", "21px");
body.setAttribute("ry", "5px");
let leg1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
leg1.setAttribute("height", "70px");
leg1.setAttribute("width", "15px");
leg1.setAttribute("y","190px");
leg1.setAttribute("x","110px");
leg1.setAttribute("transform","rotate(-30 10 40)");
let leg2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
leg2.setAttribute("height", "70px");
leg2.setAttribute("width", "15px");
leg2.setAttribute("y","155px");
leg2.setAttribute("x","75px");
leg2.setAttribute("transform","rotate(30 170 220)");

// get random word for choices
function getRandomWord(){
    randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(randomWord);
}

function initialize(){
    // on load the computer gets a random word from the array
    getRandomWord();
    // turn the random word into an array set equal to compwordarray variable
    compWordArray = randomWord.split("");
    // console.log(compWordArray);
    // loops through the random word as an array
    for(let i = 0; i < compWordArray.length; i++){
        // adds a dash to the user progress array
        userProgress.push("_");
    }
    console.log(userProgress);
    // gets the svg element and sets the html to a hanging stage
    // console.log(svgElement);
    // gets the win or lose text and and sets it to empty string
    winOrLose.innerHTML = "";
    // console.log(winOrLose);
 
    render();
}

// get the users current progress and append it to word area
function render(){
    // gets the area where word is displays and sets the text of the 
    // span element to a string made by joining the user array
    wordArea.textContent = userProgress.join(" ");
    console.log(wordArea);
    // sets the text content of the span for incorrect letters to the missed letters string
    missed.textContent = "Wrong Letters:  " + missedLetters;
    console.log(missed);
    // sets the text of the span for the number of guesses to how many
    // times the user has guessed
    guesses.textContent = "Number of Guesses:  " +  numGuesses;
    console.log(guesses);
}

// check to see if user wins
function checkWinner(){
    if(compWordArray.join(" ") === userProgress.join(" ")){
        // if the game is won display winner and reset the svg to the blank stage
        play = false;
        resetSvg();
        winnerImg.setAttribute("display","flex");
        winnerImg.textContent = "(You saved a mans life(press restart to play again)"
        hangman.appendChild(winnerImg);
        winOrLose.textContent = "WINNER";
        gamesWon++;
        document.querySelector(".gamesWon").textContent = "Games Won: " + gamesWon;
    }
}

// check to see if game is lost
function checkLoser(){
    if(singlePart === bodyArray.length){
        winOrLose.textContent = "Dead MAN";
        gamesLost++;
        hangman.appendChild(winnerImg);
        winnerImg.textContent = "(The man has been hung press restart to redeem yourself)"
        document.querySelector(".gamesLost").textContent = "Games Lost: " + gamesLost;
        play = false;
    }
}


// fires when a key is pressed and released
document.onkeyup = function(e){

    if (play){
        // this code should play normal
        numGuesses ++;
    userInput = e.key.toLowerCase();
    let flag = false;
    // loop through the comp word
    for(let j = 0; j < compWordArray.length; j++){
        // if key pressed is equal to any letter in word
        if(userInput === compWordArray[j]){
            // update user progress to include right guess
            userProgress[j] = userInput;
            console.log(userProgress);
            flag = true;
            checkWinner();   
        }
    }

    if(flag === false){
        missedLetters += userInput; 
        bodyPart = bodyArray[singlePart];
        if(bodyPart === "head"){  
            head.setAttribute("display","flex");
            svgElement.appendChild(head);  
        }else if(bodyPart === "arms"){ 
            arm1.setAttribute("display","flex");
            arm2.setAttribute("display","flex");
            svgElement.appendChild(arm1);  
            svgElement.appendChild(arm2);
        }else if(bodyPart === "body"){
            body.setAttribute("display","flex");
            svgElement.appendChild(body);  
        }else if(bodyPart === "legs"){
            leg1.setAttribute("display","flex");
            leg2.setAttribute("display","flex");
            svgElement.appendChild(leg1);  
            svgElement.appendChild(leg2);
        }

        singlePart++;
        checkLoser();
    }

    render();        
    }
    else{
        // this code should display that the game is over
    }
     
}

function resetSvg(){
    head.setAttribute("display","none");
    leg1.setAttribute("display","none");
    leg2.setAttribute("display","none");
    arm1.setAttribute("display","none");
    arm2.setAttribute("display","none");
    body.setAttribute("display","none");
    winnerImg.setAttribute("display","none");
}

restart.addEventListener("click",function(){
    missedLetters = "";
    numGuesses = 0;
    userProgress = [];
    singlePart = 0;
    resetSvg();
    render();
    winnerImg.textContent = "";
    play = true;
    initialize();   
});

initialize();




