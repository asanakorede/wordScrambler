// Selecting HTML elements
const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");

// Variables to store game state
let correctWord, timer;

// Function to initialize and start the countdown timer
const initTimer = maxTime => {
    // Clear any existing timer intervals
    clearInterval(timer);

    // Set up a new interval for the countdown
    timer = setInterval(() => {
        // Update timer display and check if time is up
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }

        // If time is up, show an alert with the correct word and restart the game
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000); // Update every 1000 milliseconds (1 second)
};

// Function to initialize the game
const initGame = () => {
    // Start a new 30-second timer
    initTimer(30);

    // Select a random word object from the 'words' array
    //This line selects a random object (randomObj) from the words array using Math.random() to generate a random index.
    let randomObj = words[Math.floor(Math.random() * words.length)];

    // Shuffle the characters of the word for display
    // This line splits the characters of the selected word into an array (wordArray). Each character becomes an element in the array.

    let wordArray = randomObj.word.split("");

    //This process shuffles the characters randomly within the array.
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    // Display the shuffled word and hint
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;

    // Store the correct word in lowercase
    correctWord = randomObj.word.toLowerCase();

    // Reset input field and set its maxlength to the length of the correct word
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

// Initial game setup
initGame();

// Function to check the user's input against the correct word
const checkWord = () => {
    // Get user's input and convert to lowercase
    let userWord = inputField.value.toLowerCase();

    // Check if input is empty
    if (!userWord) return alert("Please enter the word to check!");

    // Check if user's input is incorrect and show alert
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);

    // If input is correct, show congratulatory alert and restart the game
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
};

inputField.addEventListener("keyup", (event) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (event.key === "Enter") {
        // Trigger the checkWord function when "Enter" is pressed
        checkWord();
    }
});

// Event listeners for "Refresh" and "Check" buttons
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);