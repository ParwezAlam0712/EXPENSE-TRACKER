// Form Elements

const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

// Summary Elements

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

// Transaction List

const transactionsList = document.getElementById("transactions");

// Search Input

const searchInput = document.getElementById("search");

// Load Data From LocalStorage

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

console.log("ExpenseFlow Pro Started");

console.log(transactions);

function init() {
    console.log("Application Initialized");
}

init();

function addTransaction(e) {
    e.preventDefault();

    const text = textInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (text === "" || amount === 0) {
        alert("Please enter valid data");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount,
        category
    };

    transactions.push(transaction);

    console.log(transactions);

    form.reset();
}

form.addEventListener("submit", addTransaction);