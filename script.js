const computerScore=document.getElementById("pcScore")
const userScore=document.getElementById("userScore")
const resetBtn=document.getElementById("resetBtn")
const computerSelect=document.getElementById("computerSelect")
const userSelect=document.getElementById("userSelect")
const panelComputer=document.getElementById("panelComputer")
const panelUser=document.getElementById("panelUser")
const rock=document.getElementById("rock")
const scissors=document.getElementById("scissors")
const paper=document.getElementById("paper")
const zoneBottom=zone.getBoundingClientRect().bottom
const notice=document.getElementById("notice")
const hands=document.getElementById("hands")
game()
let userScoreValue=0
let computerScoreValue=0
userScore.innerText=userScoreValue
computerScore.innerText=computerScoreValue

function reset(){
    userSelectionValue=""
    notice.innerText=""
    userScoreValue=0
    computerScoreValue=0   
    userScore.innerText=userScoreValue
    computerScore.innerText=computerScoreValue    
    userSelect.innerHTML=''
    computerSelect.innerHTML=''
    panelUser.innerHTML='<div id="zone"></div><div id="hands"><img class="choosenHand" id="rock" src="img/rock.png" alt=""><img class="choosenHand" id="scissors" src="img/scissors.png" alt=""><img class="choosenHand" id="paper" src="img/paper.png" alt=""></div>'
    game()    
}


function nextRound(){
    console.log("next round")
    userSelectionValue=""
    notice.innerText=""
    computerSelect.innerHTML=''
    userSelect.innerHTML=''
    panelUser.innerHTML='<div id="zone"></div><div id="hands"><img class="choosenHand" id="rock" src="img/rock.png" alt=""><img class="choosenHand" id="scissors" src="img/scissors.png" alt=""><img class="choosenHand" id="paper" src="img/paper.png" alt=""></div>'
    game()
}

function game(){
    console.log("start game")
    const choosenHand=document.querySelectorAll(".choosenHand")
    const zone=document.getElementById("zone")
    let randomNumber
    let turnFlag=false
    let computerSelectionValue=null
    let userSelection=null
    let userSelectionValue=""
    let node=null
    let winner=""
    let newX = 0
    let newY = 0
    let startX = 0
    let startY = 0

    randomNumber=parseInt(Math.random()*3)+1
    switch(randomNumber){
        case 1:
            computerSelectionValue="rock";
            break;       
        case 2:
            computerSelectionValue="scissors";
            break;    
        case 3:
            computerSelectionValue="paper";
            break;       
    }

    console.log(randomNumber)
    choosenHand.forEach((val) => {
        console.log(val)
        val.addEventListener('mousedown', mouseDown)
    })
    function mouseDown(e){
        console.log("mouse down")
        startX = e.clientX
        startY = e.clientY
        e.target.addEventListener('mousemove', mouseMove)
        e.target.addEventListener('mouseup', mouseUp)
    }

    function mouseMove(e){
        newX = startX - e.clientX 
        newY = startY - e.clientY 
        startX = e.clientX
        startY = e.clientY 
        e.target.style.top = (e.target.offsetTop - newY) + 'px'
        e.target.style.left = (e.target.offsetLeft - newX) + 'px'
    }

    function mouseUp(e){
        document.removeEventListener('mousemove', mouseMove)
        if(e.clientY < zoneBottom){
        zone.appendChild(e.target)
        userSelectionValue=zone.children[0].getAttribute("id")
        console.log(zone.children[0].getAttribute("id"))
        userTurn()
        setTimeout(() => {
            computerTurn()
        }, 1000);
        setTimeout(() => {
            checkGame()
        }, 1000);
        }
    }
    function userTurn(){
        console.log("userturn")

        switch(userSelectionValue){
            case "rock":
                userSelect.innerHTML='<img style="rotate: 90deg" src="img/rock.png" alt="">';
                break;       
            case "scissors":
                userSelect.innerHTML='<img style="rotate: 90deg" src="img/scissors.png" alt="">';
                break;    
            case "paper":
                userSelect.innerHTML='<img style="rotate: 90deg" src="img/paper.png" alt="">';
                break;       
        }
    }
    function computerTurn(){
        switch(computerSelectionValue){
            case "rock":
                computerSelect.innerHTML='<img style="rotate: -90deg" src="img/rock.png" alt="">';
                break;       
            case "scissors":
                computerSelect.innerHTML='<img style="rotate: -90deg" src="img/scissors.png" alt="">';
                break;    
            case "paper":
                computerSelect.innerHTML='<img style="rotate: -90deg" src="img/paper.png" alt="">';
                break;       
        }  
    }

    function checkGame(){
        console.log("check")
        switch(true){
            case (computerSelectionValue==userSelectionValue) :
                winner="مساوی شدی" ;break;
            case (userSelectionValue=="rock") && (computerSelectionValue=="scissors"):
                winner="برنده شدی" ;
                userScoreValue++;
                break;
            case (userSelectionValue=="rock") && (computerSelectionValue=="paper"):
                winner="باختی!" ;
                computerScoreValue++;
                break;
            case (userSelectionValue=="paper") && (computerSelectionValue=="scissors"):
                winner="باختی!" ;
                computerScoreValue++;
                break;
            case (userSelectionValue=="paper") && (computerSelectionValue=="rock"):
                winner="برنده شدی" ;
                userScoreValue++;
                break;
            case (userSelectionValue=="scissors") && (computerSelectionValue=="rock"):
                winner="باختی!" ;
                computerScoreValue++;
                break;
            case (userSelectionValue=="scissors") && (computerSelectionValue=="paper"):
                winner="برنده شدی" ;
                userScoreValue++;
                break;
        }
        notice.innerText=winner
        userScore.innerText=userScoreValue
        computerScore.innerText=computerScoreValue    

        setTimeout(() => {
            console.log("set time out next round")
            nextRound()
        }, 2000);
        
    }
}

