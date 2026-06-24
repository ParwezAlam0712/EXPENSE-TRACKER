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

    renderTransactions();

    console.log(
        "Application Initialized"
    );

}


function addTransaction(e) {

    e.preventDefault();

    const text = textInput.value.trim();

    const type = document.getElementById("type").value;

    let amount = Number(amountInput.value);

    const category = categoryInput.value;

    if (type === "expense") {
        amount = -amount;
    }

    if (text === "" || amount === 0) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount,
        category,
        type
    };

    transactions.push(transaction);

    updateLocalStorage();

    renderTransactions();

    console.log(transactions);

    form.reset();
}

init();



form.addEventListener("submit", addTransaction);

function renderTransactions() {

    transactionsList.innerHTML = "";

    transactions.forEach((transaction) => {

        const li = document.createElement("li");

        li.classList.add(
            transaction.amount > 0
                ? "income"
                : "expense"
        );

        li.innerHTML = `
    <div>
        <strong>${transaction.text}</strong>
        <br>
        <small>${transaction.category}</small>
    </div>

     <div>
        ₹${Math.abs(transaction.amount)}

         <button
            class="delete-btn"
            onclick="deleteTransaction(${transaction.id})">
            ❌
         </button>
     </div>
    `;

        transactionsList.appendChild(li);

    });


    updateSummary();

}

function updateLocalStorage() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );

    updateLocalStorage();

    renderTransactions();
}

function updateSummary() {

    const amounts = transactions.map(
        transaction => transaction.amount
    );

    const total = amounts
        .reduce((acc, item) => acc + item, 0);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0);

    balanceEl.textContent =
        `₹${total.toFixed(2)}`;

    incomeEl.textContent =
        `₹${income.toFixed(2)}`;

    expenseEl.textContent =
        `₹${Math.abs(expense).toFixed(2)}`;
}
