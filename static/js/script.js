const minRandom = 1;
const maxRandom = 100;
const defaultAttempts = 5;

let guessButton = document.querySelector("#guessButton");
let hintText = document.querySelector("#hintText");
let inputBox = document.querySelector("#guess");
let descriptionParagraph = document.querySelector("#descriptionText");

// Internals
let randomValue = getRandomInt(minRandom, maxRandom);
let attempts = defaultAttempts;

let backgroundIndex = 0
let backgrounds = ["bg-default", "bg-yellow", "bg-cyan", "bg-light-blue", "bg-purple", "bg-light-red"]
let backgroundElement = document.querySelector("#background")


updateAttempts();

/**
 * Generates a random integer between the given interval
 * @param {*} min min random
 * @param {*} max max random
 * @returns random int value between the given interval
 */
function getRandomInt(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function processHints(goal, selectedVal) {
    return selectedVal < goal ? "Troppo basso, prova un numero più alto!" : "Troppo alto, prova un numero più basso!";
}

/**
 * Handles the main button click event
 * @param {*} event click event
 */
function handleClick(event) {
    let inputVal = inputBox.value;

    if (attempts > 0) {
        if (validate(inputVal)) {
            let numVal = parseInt(inputVal);

            if (numVal === randomValue) {
                hintText.innerText = `Hai vinto in ${(defaultAttempts - attempts) + 1} tentativi!`;
                return;
            }

            attempts--;
            changeBackground();
            hintText.innerText = processHints(randomValue, numVal);
            updateAttempts();
        }
    }

    if (attempts <= 0) {
        hintText.innerText = "Hai perso, tentativi terminati!";
    }


}

function changeBackground() {

    let currentBackground = backgrounds[backgroundIndex]
    let nextBackground = backgrounds[backgroundIndex + 1]

    backgroundElement.classList.remove(currentBackground)
    backgroundElement.classList.add(nextBackground)

    backgroundIndex++;

}

/**
 * Validates the input value after having sanitized it
 * @param {*} inputVal The value of the input textbox
 * @returns true if the input is valid
 */
function validate(inputVal) {
    inputVal = sanitize(inputVal);

    if (inputVal === "") {
        hintText.innerText = "Inserisci un numero valido!";
        return false;
    }
    return !isNaN(inputVal);  // Ensures input is a number
}

/**
 * Sanitizes the given string
 * @param {*} inputVal target value
 * @returns sanitized string
 */
function sanitize(inputVal) {
    return inputVal.trim();
}

/**
 * Updates the attempts notice
 */
function updateAttempts() {
    descriptionParagraph.innerHTML = `Hai ancora <strong>${attempts}</strong> tentativi`;
}

// Registering listeners
guessButton.addEventListener("click", handleClick);
console.log(randomValue)