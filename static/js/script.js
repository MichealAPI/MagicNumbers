const minRandom = 1
const maxRandom = 100
const defaultAttempts = 4

let guessButton = document.querySelector("#guessButton")
let hintText = document.querySelector("#hintText")
let inputBox = document.querySelector("#guess")
let descriptionParagraph = document.querySelector("#descriptionText")

// Internals
let randomValue = getRandomInt(minRandom, maxRandom)
let invalidValueInput = false
let attempts = defaultAttempts

/**
 *
 * @param {*} min min random
 * @param {*} max max random
 * @returns random int value between the given interval
 */
function getRandomInt(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min; 
}

function processHints(goal, selectedVal) {
    return selectedVal < goal ? "Troppo basso, prova un numero più alto!" : "Troppo alto, prova un numero più basso!"
}

/**
 * Handles the main button click event
 * @param {*} event click event 
 * @returns 
 */
function handleClick(event) {
    
    let inputVal = inputBox.value

    if (attempts > 0) {
        
        if (validate(inputVal)) {

            let numVal = parseInt(inputVal)

            if (numVal === randomValue) {
                showPlayAgain()
                hintText.innerText = "Hai vinto!"
                return
            }

            hintText.innerText = processHints(randomValue, numVal)
            attempts--
            updateAttempts()
        }
    }
}

/**
 * Validates the input value after having sanitized it
 * @param {*} inputVal The value of the input textbox
 * @returns true if the input is valid
 */
function validate(inputVal) {
    
    inputVal = sanitize(inputVal)

    if (inputVal === "") {
        return false
    }


    return true
}

/**
 * Sanitizes the given string
 * @param {*} inputVal target value
 * @returns sanitized string
 */
function sanitize(inputVal) {
    return inputVal.trim().toLowerCase()
}

/**
 * Updates the attempts notice
 */
function updateAttempts() {
    descriptionParagraph.innerHTML = `Hai ancora <strong>${attempts + 1}</strong> tentativi`
}


// Registering listeners
document
    .getElementById("guessButton")
    .addEventListener("click", handleClick)