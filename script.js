// let display = document.getElementById("display");
let display = document.getElementById("display");

// Load saved history from Local Storage
let calculationHistory = JSON.parse(
    localStorage.getItem("calculationHistory")
) || [];
// Add numbers to the display
function appendNumber(number) {
    display.value += number;
}

// Add operators to the display
function appendOperator(operator) {
    display.value += operator;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteNumber() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        if (display.value === "") {
            return;
        }

        const expression = display.value;
        const result = eval(expression);

        addToHistory(expression, result);

        display.value = result;
    } catch {
        display.value = "Error";
    }
}
// function calculateResult() {
//     try {
//         if (display.value === "") {
//             return;
//         }

//         display.value = eval(display.value);
//     } catch {
//         display.value = "Error";
//     }
// }
// Keyboard Support

document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal point
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (["+", "-", "*", "/"].includes(key)) {
        appendOperator(key);
    }

    // Calculate result
    else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    }

    // Delete last character
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Clear display
    else if (key === "Escape") {
        clearDisplay();
    }

});
// Add calculation to history
function addToHistory(expression, result) {
    const historyList = document.getElementById("history-list");

    const listItem = document.createElement("li");
    listItem.textContent = expression + " = " + result;

    historyList.prepend(listItem);

    calculationHistory.unshift(expression + " = " + result);

    // Save history in Local Storage
    localStorage.setItem(
        "calculationHistory",
        JSON.stringify(calculationHistory)
    );
}
// function addToHistory(expression, result) {
//     const historyList = document.getElementById("history-list");

//     const listItem = document.createElement("li");
//     listItem.textContent = expression + " = " + result;

//     historyList.prepend(listItem);
// }

// Clear calculation history
function clearHistory() {
    document.getElementById("history-list").innerHTML = "";

    calculationHistory = [];

    localStorage.removeItem("calculationHistory");
}
// function clearHistory() {
//     document.getElementById("history-list").innerHTML = "";
// }
function loadHistory() {
    const historyList = document.getElementById("history-list");

    historyList.innerHTML = "";

    calculationHistory.forEach(function (item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

// Load history when the page opens
loadHistory();
// Toggle between Dark Mode and Light Mode

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");

    localStorage.setItem("calculatorTheme", isLightMode ? "light" : "dark");

    updateThemeButton();
}

// Update button text

function updateThemeButton() {
    const button = document.getElementById("theme-toggle");

    if (document.body.classList.contains("light-mode")) {
        button.textContent = "🌙 Dark Mode";
    } else {
        button.textContent = "☀️ Light Mode";
    }
}

// Load saved theme

function loadTheme() {
    const savedTheme = localStorage.getItem("calculatorTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    updateThemeButton();
}

// Apply saved theme when the page loads

loadTheme();