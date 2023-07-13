document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
  
    startBtn.addEventListener('click', function() {
      const player1Name = document.getElementById('player1-name').value;
      const player2Name = document.getElementById('player2-name').value;
      const player1Color = document.getElementById('player1-color').value;
      const player2Color = document.getElementById('player2-color').value;
  
      if (!player1Name || !player2Name) {
        alert('Please enter both player names.');
        return;
      }
  
      // Store player data in localStorage
      localStorage.setItem('player1Name', player1Name);
      localStorage.setItem('player2Name', player2Name);
      localStorage.setItem('player1Color', player1Color);
      localStorage.setItem('player2Color', player2Color);
  
      // Redirect to the game page
      window.location.href = 'game.html';
    });
  });
  
  let btnRef = document.querySelectorAll(".button-option");
  let popupRef = document.querySelector(".popup");
  let newgameBtn = document.getElementById("new-game");
  let restartBtn = document.getElementById("restart");
  let msgRef = document.getElementById("message");
  let player1WinsRef = document.getElementById("player1-wins");
  let player2WinsRef = document.getElementById("player2-wins");
  // Winning Pattern Array
  let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Player 'X' plays first
  let xTurn = true;
  let count = 0;
  
  // Get player colors from localStorage
  const player1Color = localStorage.getItem('player1Color');
  const player2Color = localStorage.getItem('player2Color');
  
  // Set player colors
  document.documentElement.style.setProperty('--player1-color', player1Color);
  document.documentElement.style.setProperty('--player2-color', player2Color);
  
  // Disable All Buttons
  const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // Enable popup
    popupRef.classList.remove("hide");
  };
  
  // Enable all buttons (For New Game and Restart)
  const enableButtons = () => {
    btnRef.forEach((element) => {
      element.innerText = "";
      element.disabled = false;
    });
    // Disable popup
    popupRef.classList.add("hide");
  };
  
  // This function is executed when a player wins
  const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
      msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
      updatePlayerWins("player1");
    } else {
      msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
      updatePlayerWins("player2");
    }
  };
  
  // Function for draw
  const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  };
  
  // Update player wins
  const updatePlayerWins = (player) => {
    if (player === "player1") {
      let wins = parseInt(player1WinsRef.textContent);
      wins++;
      player1WinsRef.textContent = wins;
      if (wins === 3) {
        player1WinsRef.classList.add("animate-win");
      }
    } else if (player === "player2") {
      let wins = parseInt(player2WinsRef.textContent);
      wins++;
      player2WinsRef.textContent = wins;
      if (wins === 3) {
        player2WinsRef.classList.add("animate-win");
      }
    }
  };
  
  // New Game
  newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  
  // Win Logic
  const winChecker = () => {
    // Loop through all win patterns
    for (let i of winningPattern) {
      let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
      // Check if elements are filled
      // If 3 empty elements are same and would give win as would
      if (element1 != "" && (element2 != "") & (element3 != "")) {
        if (element1 == element2 && element2 == element3) {
          // If all 3 buttons have same values then pass the value to winFunction
          winFunction(element1);
        }
      }
    }
  };
  
  // Display X/O on click
  btnRef.forEach((element) => {
    element.addEventListener("click", () => {
      if (xTurn) {
        xTurn = false;
        // Display X
        element.innerText = "X";
        element.classList.remove("o"); // Remove 'o' class if present
        element.classList.add("x");
      } else {
        xTurn = true;
        // Display O
        element.innerText = "O";
        element.classList.remove("x"); // Remove 'x' class if present
        element.classList.add("o");
      }
      // Increment count on each click
      count += 1;
      if (count == 9) {
        drawFunction();
      }
      // Check for win on every click
      winChecker();
    });
  });
  // Enable Buttons and disable popup on page load
  window.onload = enableButtons;
  
  document.addEventListener('DOMContentLoaded', function() {
    // Retrieve player names and colors from localStorage
    const player1Name = localStorage.getItem('player1Name');
    const player2Name = localStorage.getItem('player2Name');
    const player1Color = localStorage.getItem('player1Color');
    const player2Color = localStorage.getItem('player2Color');
  
    // Set player names and colors in the header
    document.getElementById('player1-name').textContent = player1Name;
    document.getElementById('player2-name').textContent = player2Name;
    document.getElementById('player1-info').style.color = player1Color;
    document.getElementById('player2-info').style.color = player2Color;
  });