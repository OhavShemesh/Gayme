let startbtn = document.querySelector(".startbtn");
let cardscontainer = document.querySelector(".cards");
let scale = document.querySelector(".scale");
let cards;
let circlescontainer = document.querySelector(".board");
let circles;
let x = 0;
let startgamebtn = document.querySelector(".startgame");
let finishbtn = document.querySelector(".finishbtn");
let turnsleft = document.querySelector(".turnsleft");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener("load", () => {
  let players = document.querySelectorAll(".player");
  const addcards = () => {
    for (let player of players) {
      player.addEventListener("click", () => {
        cardscontainer.innerHTML = "";
        for (let i = 0; i < player.innerHTML; i++) {
          let card = document.createElement("div");
          card.className = "card";
          card.innerHTML = "?";
          cardscontainer.appendChild(card);
        }
        cards = document.querySelectorAll(".card");
        getRoleAndPlaceName();
      });
    }
  };
  const getRoleAndPlaceName = () => {
    let random = getRandomInt(0, cards.length);
    let count = 0;
    for (let card of cards) {
      card.addEventListener("click", () => {
        if (card.innerHTML == "?") {
          let shadow = document.createElement("div");
          shadow.className = "shadow";
          document.body.appendChild(shadow);
          console.log("count", count);
          console.log("random", random);
          if (count == random) {
            shadow.innerHTML = "ofek";
          } else {
            shadow.innerHTML = "keeper";
          }
          let okbtn = document.createElement("button");
          okbtn.innerHTML = "OK";
          okbtn.className = "okbtn";
          shadow.appendChild(okbtn);
          okbtn.addEventListener("click", () => {
            document.body.removeChild(shadow);
            let shadow2 = document.createElement("div");
            shadow2.className = "shadow";
            let input = document.createElement("input");
            input.type = "text";
            input.className = "name";
            let okbtn2 = document.createElement("button");
            okbtn2.innerHTML = "OK";
            okbtn2.className = "okbtn";
            document.body.appendChild(shadow2);
            shadow2.appendChild(input);
            shadow2.appendChild(okbtn2);
            okbtn2.addEventListener("click", () => {
              if (input.value) {
                document.body.removeChild(shadow2);
                card.innerHTML = input.value;
              } else {
                return;
              }
              displaystartgamebtn();
            });
          });
          count++;
        } else {
          return;
        }
      });
    }
  };
  const displaystartgamebtn = () => {
    cards = document.querySelectorAll(".card");
    let cardisnames = true;

    for (let card of cards) {
      if (card.innerHTML === "?") {
        cardisnames = false;
        break;
      }
    }
    if (cardisnames) {
      startgamebtn.style.display = "flex";
    } else {
      startgamebtn.style.display = "none";
    }
  };
  const startgame = () => {
    startbtn.addEventListener("click", () => {
      let circlesamount = cards.length - x;
      for (let i = 0; i < circlesamount; i++) {
        let circle = document.createElement("div");
        circle.className = "circle";
        circlescontainer.appendChild(circle);
      }
      cardscontainer.remove();
      scale.remove();
      startbtn.remove();
      circles = document.querySelectorAll(".circle");
      colorcircles();
      addsettingsbtn();
      turncounter();
    });
  };
  const colorcircles = () => {
    for (let circle of circles) {
      circle.addEventListener("click", () => {
        for (let circle of circles) {
          circle.style.pointerEvents = "none";
          setTimeout(() => {
            circle.style.pointerEvents = "auto";
          }, 500);
        }
        if (circle.style.backgroundColor == "") {
          circle.style.backgroundColor = "rgba(33, 192, 33, 0.5)";
        } else {
          circle.style.backgroundColor = "";
        }
        checkWin();
      });
    }
  };
  const addsettingsbtn = () => {
    let settings = document.querySelector(".settings");
    let finisbox = document.querySelector(".finishbox");
    settings.style.display = "flex";
    finisbox.style.display = "flex";
  };
  const checkWin = () => {
    let allColored = true;
    for (let circle of circles) {
      if (circle.style.backgroundColor !== "red") {
        allColored = false;
        break;
      }
    }

    if (allColored || circles.length <= 2) {
      setTimeout(() => {
        alert("Keepers Won!");
      }, 50);
    }
  };
  const settings = () => {
    let restartbtn = document.querySelector(".restartbtn");
    restartbtn.addEventListener("click", () => {
      window.location.reload();
    });
  };
  const finishturn = () => {
    let counter = 1;
    finishbtn.addEventListener("click", () => {
      let cardsamount = cards.length - x;
      if (counter == cardsamount) {
        counter = 0;
        let shadow3 = document.createElement("div");
        shadow3.className = "shadow";
        shadow3.innerHTML = "Disccuss";
        shadow3.style.fontSize = "3rem";
        document.body.appendChild(shadow3);
        circlescontainer.innerHTML = "";
        x++;
        let circlesamount = cards.length - x;
        for (let i = 0; i < circlesamount; i++) {
          let circle = document.createElement("div");
          circle.className = "circle";
          circlescontainer.appendChild(circle);
        }
        circles = document.querySelectorAll(".circle");
        if (circles.length <= 2) {
          setTimeout(() => {
            alert("Ofek Won!");
          }, 50);
        }
        colorcircles();

        setTimeout(() => {
          document.body.removeChild(shadow3);
        }, 2000);
      }
      counter++;
    });
  };
  const turncounter = () => {
    circles = document.querySelectorAll(".circle");
    turnsleft.innerHTML = circles.length;
    finishbtn.addEventListener("click", () => {
      turnsleft.innerHTML--;
      if (circles.length <= 2) {
        turnsleft.innerHTML = "Game Ended";
        turnsleft.style.width = "200px";
        turnsleft.style.borderRadius = "20px";
      } else if (turnsleft.innerHTML == 0) {
        setTimeout(() => {
          turnsleft.innerHTML = circles.length;
        }, 2000);
      }
    });
  };
  addcards();
  settings();
  startgame();
  finishturn();
});
