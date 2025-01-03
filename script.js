let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; //playerX playerO

const winpatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

boxes.forEach((box) =>{
box.addEventListener("click",() =>{
  //console.log("btn was clicked");
  if(turnO){//playerX
    box.innerText = "O";
    turnO = false;
  }
  else{//playerO
    box.innerText = "X";
    turnO = true;
  }
  box.disabled = true;

  checkWinner();
})
});

const resetGame =() =>{
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

const enableBoxes = () =>{//if restart the game enable all boxes
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const disabledBoxes = () =>{//if winner is found then disable all boxes
  for(let box of boxes){
    box.disabled = true;
  }
}

const showWinner = (winner) =>{
  msg.innerText = `Congrulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  disabledBoxes();

}

const checkWinner = () =>{ //check all conditions for winner
  let winnerFound = false;
  for(let pattern of winpatterns){
    // console.log(
    //   boxes[pattern[0]].innerText, 
    //   boxes[pattern[1]].innerText, 
    //   boxes[pattern[2]].innerText);

      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if(pos1Val !=="" && pos2Val !=="" && pos3Val !==""){
        if(pos1Val===pos2Val && pos2Val===pos3Val){
          //console.log("Winner", pos1Val);
          winnerFound = true;

          showWinner(pos1Val);//display the winner into the screen
          return;
        }
      }
    }

    const showMessage = () =>{ //show the message if game is draw
      msg.innerHTML = 'Game Was <span style="color: red; font-size: 3rem;">Draw</span>, Restart to Try Again';
      msgContainer.classList.remove("hide");
      disabledBoxes();
    }
    //check the condition if the the boxes are filled and the winner is not "O" and "X" basically match is draw
    const allBoxesFilled =Array.from(boxes).every(box => box.innerText !== "");
    if(!winnerFound && allBoxesFilled){
      showMessage();
    }
}

newGameBtn.addEventListener("click", resetGame);//reset the new game btn
resetbtn.addEventListener("click", resetGame); //reset the resetbtn