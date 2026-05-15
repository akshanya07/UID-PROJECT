console.log("Splitmate Expenses Loaded");
let expenses = [];

function openForm() {
    document.getElementById("formBox").style.display = "block";
}

function saveExpense() {
    let group = document.getElementById("groupName").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let person = document.getElementById("personName").value;
    let category = document.getElementById("category").value;
    if (group === "" || amount === "" || description === "" || person === "" || category === "" || amount < 0) {
        alert("Please fill in all fields and ensure amount is non-negative");
        return false;
    }

    let newExpense = {
        groupName: group,
        amount: parseFloat(amount),
        description: description,
        paidBy: person,
        category: category,
        completed: false
    };
    expenses.push(newExpense);
    displayExpenses();
    showPopup("Expense Added!");
    clearForm();
    return true;
}

function displayExpenses() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        let textStyle = "";
        if (expenses[i].completed == true) {
            textStyle = "line-through";
        } else {
            textStyle = "none";
        }

        list.innerHTML += `<div class="bg-slate-900 border border-slate-700 rounded-3xl p-6 mb-5 flex items-start gap-5">
            <input type="checkbox" onchange="toggleComplete(${i})" class="w-6 h-6 mt-1">
            <div class="flex-1">
                <div id="text${i}" class="text-3xl font-bold mb-3" style="text-decoration:${textStyle}">${expenses[i].description}</div>
                <div class="text-2xl text-teal-400 mb-4">₹${expenses[i].amount.toFixed(2)}</div>
                <div class="flex gap-3 mb-4 flex-wrap">
                    <div class="bg-[#1c2333] text-blue-400 px-4 py-2 rounded-full">${expenses[i].paidBy}</div>
                    <div class="bg-[#1c2333] text-teal-400 px-4 py-2 rounded-full">${expenses[i].groupName}</div>
                    <div class="bg-[#1c2333] text-pink-400 px-4 py-2 rounded-full">${expenses[i].category}</div>
                </div>
                <button onclick="removeExpense(${i})" class="bg-red-400 text-black px-5 py-2 rounded-xl font-bold">Remove</button>
            </div>
        </div>`;
    }
}

function removeExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

function clearForm() {
    document.getElementById("groupName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("personName").value = "";
    document.getElementById("category").value = "grocery";
    document.getElementById("formBox").style.display = "none";
}

function cancelForm() {
    clearForm();
}

function toggleComplete(index) {
    expenses[index].completed = !expenses[index].completed;
    if (expenses[index].completed) {
        document.getElementById(`text${index}`).style.textDecoration = "line-through";
    } else {
        document.getElementById(`text${index}`).style.textDecoration = "none";
    }
}

function showPopup(message) {
    let popup = document.getElementById("popup");
    popup.innerText = message;
    popup.classList.remove("hidden");
    setTimeout(function () {
        popup.classList.add("hidden");
    }, 3000);
}