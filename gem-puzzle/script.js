/**
 *  You have to use state as in react
 */
let changeObj = [];
let arrPuzzle = getFilledPuzzle([]);
let totalClick = 0;
let timeArr = [];

function getFilledPuzzle(arrEmpty) {
  let random = 8;
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      arrEmpty.push({
        index: i,
        val: 0,
      });
    } else {
      arrEmpty.push({ index: i, val: random });
      random--;
    }
  }
  return arrEmpty;
}

function myF(index, ran) {
  let e = document.querySelector(".aa" + index);
  e.classList.add("change");

  if (changeObj.length < 2) {
    changeObj.push({ index: index, val: ran });
    if (changeObj[0].val != 0) {
      changeObj = [];
      addPuzzle(arrPuzzle);
    }
  }

  if (changeObj.length === 2) {
    if (changeObj[0].val === 0) {
      arrPuzzle[changeObj[0].index].val = changeObj[1].val;
      arrPuzzle[changeObj[1].index].val = changeObj[0].val;
      ++totalClick;
      addPuzzle(arrPuzzle);
    }
    changeObj = [];
  }
}

function addPuzzle(arrPuz) {
  let root = document.querySelector(".n-x-n");
  root.innerHTML = "";
  //doMoves();
  for (let i = 0; i < 9; i++) {
    if (arrPuz[i].val === 0) {
      root.innerHTML += `
        <button class=${"aa" + i}
                value=${arrPuz[i].val} 
                index=${arrPuz[i].index}  
                onclick='myF(${arrPuz[i].index},${arrPuz[i].val})'
                type="button" style="background-color:rgba(0, 255, 123, 0.233);">
                  <h3>
                    ${arrPuz[i].val}
                  </h3>
        </button>`;
    } else {
      root.innerHTML += `
        <button class=${"aa" + arrPuz[i].index}
                 value=${arrPuz[i].val} 
                 index=${arrPuz[i].index}
                 onclick='myF(${i},${arrPuz[i].val})'
                 type="button" >
                  <h3>
                    ${arrPuz[i].val}
                  </h3>
        </button>
      `;
    }
  }
}

/*function doMoves() {
  let moves = document.querySelector(".moves");
  moves.innerHTML = "";
  moves.innerHTML = `<div class="moves">moves: ${totalClick}</div>`;
}*/

(function moves() {
  document.querySelector(".root").innerHTML += `
  <div class="navbar">
    <button class="restart" onclick='restartAll()'>Shuffle and start</button>
    <button class="stop" onclick='restartAll()'>Stop</button>
    <button class="save" onclick='restartAll()'>Save</button>
    <button class="results" onclick='restartAll()'>Results</button>
  </div>
  <div class="moves"></div>
  <section class="n-x-n"></section>`;
})();

function restartAll() {
  sec = 0;
  min = 0;
  arrPuzzle = getFilledPuzzle([]);
  changeObj = [];
  totalClick = 0;
  addPuzzle(arrPuzzle);
}

function init() {
  sec = 0;
  min = 0;
  setInterval(tick, 1000);
}

function tick() {
  ++sec;
  if (sec === 59) {
    sec = 0;
    ++min;
  }
  document.querySelector(".moves").innerHTML = `
      <div class="moves">Moves: ${totalClick}</div>
      <div class="timer">Time: ${min}:${sec}</div>`;

  /*
  let flag = false;
  //console.log(arrPuzzle);
  //let correctArr = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  const winMin = 0;
  const winSec = 0;
  const winClick = 0;

  for (let i = 0; i < arrPuzzle.length; i++) {
    if (correctArr[i] === arrPuzzle[i].val) {
      flag = true;
      winMin = min;
      winSec = sec;
      winClick = totalClick;
    } else {
      flag = false;
    }
  }
  */

  /*
  if (flag) {
    document.querySelector(".moves").innerHTML = "";
    document.querySelector(".moves").innerHTML = `
      <div class="moves">You won Moves: ${winClick}</div>
      <div class="timer">Time: ${winMin}:${winSec}</div>`;
  } else {
    
  }*/
}

addPuzzle(arrPuzzle);
