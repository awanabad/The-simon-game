//ButtonArray and GamePattern
var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var buttonLock = true; //Prevents button click and hover effects when tutorial sequence is playing
var started = false;

//Play Audio File 
function playSound(soundfile) {
    var audio = new Audio('sounds/'+ soundfile);
    audio.play();
}

//Hide Buttons, Win, and Lose screens in the start
$(".buttons-div").hide();
$(".win").hide();
$(".loss").hide();
$(".level-details").hide();

//Bounce Effect
var firstTime = true;
$(".simon-text").on("mousedown", function() {
    $(".simon-text").addClass("bounce").css("color", "#F67E7D");
    $(".simon-punctuation").text("!");

    //Reset and Remove Cycling 
    clearInterval(textCycle);
    $(".simon-description").fadeOut(500);

    //Tutorial
    setTimeout(() => {
        showTutorial();
    }, 500);

    //If first time clicking, play sound, else do nothing.
    if (firstTime) {playSound("pop.wav");
                    firstTime = false;}
 
});

//Text Description Cycle
var simonDescs = ["welcome to the simon game",
                "for the complete experience, enable sound",
                "click on the text above to start"]
let i = 0;
$(".simon-description").text(simonDescs[0]);

//Time Cycling Function
var textCycle = setInterval(() => {
    i++;
    $(".simon-description").fadeOut(500);
    setTimeout(() => {
        $(".simon-description").text(simonDescs[i]).fadeIn(500);
    }, 500);

    if (i===simonDescs.length) {
        i=0;
    }
    
}, 3000);

//Tutorial 
$(".simon-instructions").hide();
var whooshed = true;
function showTutorial() {
    
    if (whooshed){
        //Move title text to the top
        $(".simon-description").fadeOut(500);
        $(".simon-text").animate({  'marginTop' : '10vh' }, 200);
        playSound("woosh.wav");
        whooshed = false;
        $(".simon-instructions").text("hey, it's me simon");
   
        //Tutorial Sequence
        setTimeout(() => {
            $(".simon-instructions").fadeIn(500);
            playSound("simon_line_1.wav");
        }, 1000);
        
        setTimeout(() => {
            $(".simon-instructions").fadeOut(500);
            
        }, 2500);

        setTimeout(() => {
            $(".simon-instructions").text("it makes sense to have a simon game hosted by...");
            $(".simon-instructions").fadeIn(500);
        }, 3000);

        setTimeout(() => {
            $(".simon-instructions").fadeOut(300);
        }, 6200);

        setTimeout(() => {
            $(".simon-instructions").text("..well, simon");
            $(".simon-instructions").fadeIn(500);
        }, 6500);

        setTimeout(() => {
            $(".simon-instructions").fadeOut(300);
        }, 8200);

        setTimeout(() => {
            $(".simon-instructions").text("so, i'll be your host for today");
            $(".simon-instructions").fadeIn(500);
        }, 8500);

        setTimeout(() => {
            $(".simon-instructions").fadeOut(300);
        }, 11100);

        setTimeout(() => {
            $(".simon-instructions").text("here's how to play");
            $(".simon-instructions").fadeIn(500);
        }, 11400);

        setTimeout(() => {
            $(".simon-instructions").fadeOut(300);
        }, 13100);

        setTimeout(() => {
            $(".simon-instructions").hide(300);
            playSound("simon_line_2.wav");
            $(".buttons-div").fadeIn();
        }, 13800);  

        setTimeout(() => {
            tutorialSequence();
        }, 14800); 


    }//if statement end bracket
}

//Button Press (Border Radius) and Button Clicked (Color)
function buttonPress(buttonColor) {
    switch(buttonColor){
        case 'red':
            $(".red").animate({'borderRadius':'15%'},200).delay(200).animate({'borderRadius':'0%'}, 200);
        break;
        case 'green':
            $(".green").animate({'borderRadius':'15%'},200).delay(200).animate({'borderRadius':'0%'}, 200);
        break;
        case 'blue':
            $(".blue").animate({'borderRadius':'15%'},200).delay(200).animate({'borderRadius':'0%'}, 200);
        break;
        case 'yellow':
            $(".yellow").animate({'borderRadius':'15%'},200).delay(200).animate({'borderRadius':'0%'}, 200);
        break;
    }
}

function buttonClick(buttonColor) {
    switch(buttonColor){
        case 'red':
            $(".red").addClass("button-pressed");
            setTimeout(() => {
                $(".red").removeClass("button-pressed");
            }, 200);
        break;
        case 'green':
            $(".green").addClass("button-pressed");
            setTimeout(() => {
                $(".green").removeClass("button-pressed");
            }, 200);
        break;
        case 'blue':
            $(".blue").addClass("button-pressed");
            setTimeout(() => {
                $(".blue").removeClass("button-pressed");
            }, 200);
        break;
        case 'yellow':
            $(".yellow").addClass("button-pressed");
            setTimeout(() => {
                $(".yellow").removeClass("button-pressed");
            }, 200);
        break;
    }
}

//Simon Press and user Press
function SimonPress(buttonColor){
    switch(buttonColor){
        case "red":
           buttonPress("red");
           buttonClick("red");
           playSound("red.wav");
        break;
        case "green":
            buttonPress("green");
            buttonClick("green");
            playSound("green.wav");
        break;
        case "blue":
            buttonPress("blue");
            buttonClick("blue");
            playSound("blue.wav");
        break;
        case "yellow":
            buttonPress("yellow");
            buttonClick("yellow");
            playSound("yellow.wav");
        break;
    }
}

function UserPress(buttonColor){
    switch(buttonColor){
        case "red":
           buttonPress("red");
           playSound("red.wav");
        break;
        case "green":
            buttonPress("green");
            playSound("green.wav");
        break;
        case "blue":
            buttonPress("blue");
            playSound("blue.wav");
        break;
        case "yellow":
            buttonPress("yellow");
            playSound("yellow.wav");
        break;
    }
}

//Provides the next color
var levelCounter = 1;
function nextSequence() {
    disableButtons();
    userClickedPattern = []; //Clears User Patten from Previous Input
    var rand = Math.floor(Math.random()*4)
    var randChosenColor =  buttonColors[rand];
    gamePattern.push(randChosenColor);
    $(".level-details").text("level " + levelCounter);
    $(".level-details").fadeIn();

    if (levelCounter===1) { playSound("simon_level_1.wav");}

    setTimeout(() => {
        for (let j = 0; j<gamePattern.length; j++)
        {   
            setTimeout(() => {
                SimonPress(gamePattern[j]);
                
                if (j===(gamePattern.length-1))
                {
                    setTimeout(() => {
                        enableButtons();
                    }, 750);
                }
                
            }, 800*j); 
        }
    }, 2000);
    
    
}

function tutorialSequence() {
    disableButtons();
    //Simon Presses Button
        buttonPress("red");
        buttonClick("red");
        playSound("click.wav");
    setTimeout(() => {
        buttonPress("blue");
        buttonClick("blue");
        playSound("click.wav");
    }, 750);
    setTimeout(() => {
        buttonPress("yellow"); 
        buttonClick("yellow"); 
        playSound("click.wav");
    }, 1500);


    //Pause
    setTimeout(() => {
    }, 2700);

    //Player Follows
    setTimeout(() => {
        buttonPress("red");
        playSound("click.wav");
        playSound("red.wav");
    }, 3400);
    setTimeout(() => {
        buttonPress("blue");
        playSound("click.wav");
        playSound("blue.wav"); 
    }, 4000);
    setTimeout(() => {
        buttonPress("yellow");
        playSound("click.wav"); 
        playSound("yellow.wav"); 
        playSound("correct.wav");
    }, 4750);


        //Pause
        setTimeout(() => {
        }, 6000);

    //Simon Presses Button Again
    setTimeout(() => {
        playSound("simon_line_2.5.wav");
    buttonPress("red");
    buttonClick("red");
    playSound("click.wav");
    }, 6500);
    setTimeout(() => {
     buttonPress("blue"); 
     buttonClick("blue"); 
     playSound("click.wav");
    }, 7250);
     setTimeout(() => {
     buttonPress("yellow");  
     buttonClick("yellow"); 
     playSound("click.wav");
    }, 8000);
    setTimeout(() => {
        buttonPress("green");  
        buttonClick("green"); 
        playSound("click.wav");
    }, 8750);


    //Pause
    setTimeout(() => {
        }, 10250);

    //Player Press Again
        setTimeout(() => {
        buttonPress("red");
        playSound("click.wav");
        playSound("red.wav");
        }, 11000);

        setTimeout(() => {
         buttonPress("blue");  
         playSound("click.wav");
         playSound("blue.wav");
        }, 11750);
         setTimeout(() => {
            buttonPress("green");  
            playSound("click.wav");
            playSound("wrong.wav");
            playSound("simon_line_3.wav");
        }, 12500);
        setTimeout(() => {
            $(".buttons-div").fadeOut();
        }, 13000);

    //Show Lose Screen
        setTimeout(() => {
            $(".loss").fadeIn();
        }, 13450);

        setTimeout(() => {
            $(".loss").fadeOut();
        }, 15450);


    //End
        setTimeout(() => {
            endTutorial();
        }, 20050);


   
}

function endTutorial() {
    playSound("simon_line_4.wav");
    $(".buttons-div").fadeIn();
    //Start Game
    startGame();

}

//Start Game Function
function startGame() {

    setTimeout(() => {
        playSound("simon_line_start.wav");
        $(".level-details").fadeIn();

//Press Any Key to Start AND the keypress conditional
            
            $(document).keypress(function(){
                if (started===false){
                    started = true;
                    $(".level-details").fadeOut();
                    playSound("game_start.wav");
                    setTimeout( ()=> {
                        nextSequence();
                    }, 2500)

                }
        });
    
    }, 4200);    
}

//Check Sequence Function
var currentButton = 0; //create a button counter to keep track of wrongs

function checkSequence() {
    if (userClickedPattern[currentButton]===gamePattern[currentButton])
    {   
        currentButton++; //incrementbutton
       
        if (userClickedPattern.length===gamePattern.length)
        {   
            playSound("correct.wav")
            levelCounter++;
            nextSequence();
            
            setTimeout(() => {
                positiveFeedback();
                currentButton = 0;
            }, 500);
        }
    }
    else if ((userClickedPattern[currentButton])!=(gamePattern[currentButton])){
            console.log(currentButton);
            playSound("wrong.wav");
            disableButtons();
            setTimeout(() => {
                $(".buttons-div").fadeOut();
                $(".loss").fadeOut();
                
            }, 500);
            setTimeout(() => {
                $(".level-details").text("you lose, refresh to play again");
                $(".loss").fadeIn();
                playSound("simon_line_5.wav");
            }, 1000);
    }
}

//Play Random Positive FeedBack 
function positiveFeedback() {
    var rand2 = Math.floor((Math.random()*8)+1);
    playSound("simon_positive_" + rand2 + ".wav");
}



//Unlock and Lock Button Functions 
function enableButtons() {
    $(".button").css("cursor","pointer");
    $(".button").mouseover(function(){ //button hover and soundevent listeners 
   
        $(this).animate({'borderRadius':'15%'},50);   playSound("click.wav");
    });
    
    $(".button").mouseleave(function(){ $(".button").animate({'borderRadius':'0%'},50)});

    $(".button").click(function() {
        var userChosenColor = $(this).attr('id');
        UserPress(userChosenColor);
        userClickedPattern.push(userChosenColor);
        checkSequence();
    })
}

function disableButtons() {
    $(".button").off();
     //Disable Selection Cursor
     $(".button").css("cursor","not-allowed")
 }