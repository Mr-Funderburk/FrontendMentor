// modal
const modal = document.getElementById("modalContainer");
const cover = document.getElementById("cover");
const closeBtn = document.getElementById("closeModal");
const openBtn  = document.getElementById("btnRules");

function modalBox() {
    let modalDisplay = "none";
    let coverDisplay = "none";
    
    if (modal.style.display == "none") { 
        modalDisplay = "flex";
        coverDisplay = "block";
    }

    cover.style.display = coverDisplay;
    modal.style.display = modalDisplay;
}

closeBtn.addEventListener("click", modalBox);
openBtn.addEventListener("click", modalBox);


const picks = ["rock", "paper", "scissors", "lizard", "spock"];
const pickDiv = document.getElementById("pickDiv");
const showDiv = document.getElementById("showDiv");
const playerPickIcon = document.getElementById("youPicked");
const housePickIcon = document.getElementById("housePicked");

let score = 0;
let playerPick = "";
let cpuPick = "";

function pick(picked) {
    playerPick = picked;
    pickDiv.style.display = "none";
    showDiv.style.display = "flex";

    playerPickIcon.className += " " + getClass(playerPick);

    setTimeout(() => {  // computer picks
        cpuPick = picks[Math.floor(Math.random() * picks.length)];
        housePickIcon.classList.remove("noHousePick");
        housePickIcon.className += "rpsButton ";
        housePickIcon.className += getClass(cpuPick);
    }, 1000);

    setTimeout(() => {  // who won?
        document.getElementById("win").style.display = "block";
        let winLabel = document.getElementById("winLabel");
        let playerWon = true;

        if (playerPick != cpuPick) {
            if (playerPick == "rock" && (cpuPick == "paper" || cpuPick == "spock")) playerWon = false;
            if (playerPick == "paper" && (cpuPick == "scissors" || cpuPick == "lizard")) playerWon = false;
            if (playerPick == "scissors" && (cpuPick == "rock" || cpuPick == "spock")) playerWon = false;
            if (playerPick == "lizard" && (cpuPick == "rock" || cpuPick == "scissors")) playerWon = false;
            if (playerPick == "spock" && (cpuPick == "lizard" || cpuPick == "paper")) playerWon = false;

            if (playerWon) {
                winLabel.innerText = "YOU WIN";
                playerPickIcon.className += " winner";
                score++;
            } else {
                winLabel.innerText = "YOU LOSE"
                housePickIcon.className += " winner";
                score--;
            }
        } else {
            winLabel.innerText = "TIE"
        }
        updateScore();
    }, 1000);
}

function getClass(picked) {
    if (picked == "scissors") return "btnScissors";
    if (picked == "spock") return "btnSpock";
    if (picked == "paper") return "btnPaper";
    if (picked == "lizard") return "btnLizard";
    if (picked == "rock") return "btnRock";
}

function updateScore() { document.getElementById("score").innerText = score; }
updateScore();

document.getElementById("playAgainButton").addEventListener("click", function(e){
    pickDiv.style.display = "block";
    showDiv.style.display = "none";
    playerPickIcon.className = "rpsButton";
    housePickIcon.className = "noHousePick";
    document.getElementById("win").style.display = "none";
});