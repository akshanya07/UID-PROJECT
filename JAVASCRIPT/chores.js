console.log("Splitmate Chores Loaded");
let chores = [];

function openForm() {
    document.getElementById("formBox").style.display = "block";
}

function saveChore() {
    let group = document.getElementById("groupName").value;
    let chore = document.getElementById("choreName").value;
    let person = document.getElementById("personName").value;

    if (chore == "" || person == "" || group == "") {
        alert("Please fill all the fields");
        return false;
    }

    let newChore = {
        groupName: group,
        choreName: chore,
        assignedTo: person,
        completed: false
    };
    chores.push(newChore);
    displayChores();
    showPopup("Chore Added!");
    clearForm();
}

function displayChores() {
    let list = document.getElementById("choreList");
    list.innerHTML = "";
    for (let i = 0; i < chores.length; i++) {
        let textStyle = "";
        if (chores[i].completed == true) {
            textStyle = "line-through";
        }
        else {
            textStyle = "none";
        }

        list.innerHTML += `<div class="bg-slate-900 border border-slate-700 rounded-3xl p-6 mb-5 flex items-start gap-5">
            <input type="checkbox" onchange="toggleComplete(${i})" class="w-6 h-6 mt-1">
            <div class="flex-1">
                <div id="text${i}" class="text-3xl font-bold mb-4" style="text-decoration:${textStyle}">${chores[i].choreName}</div>
            </div>

                <div class="flex gap-3 mb-4">
                    <div class="bg-[#1c2333] text-blue-400 px-4 py-2 rounded-full">${chores[i].assignedTo}
                    </div>
                    <div class="bg-[#1c2333] text-teal-400 px-4 py-2 rounded-full">${chores[i].groupName}
                    </div>
                </div>

                <button onclick="removeChore(${i})" class="bg-red-400 text-black px-5 py-2 rounded-xl font-bold">Remove</button>
            </div>
        </div>
        `;
    }
}

function clearForm() {
    document.getElementById("choreName").value = "";
    document.getElementById("groupName").value = "";
    document.getElementById("personName").value = "";
    document.getElementById("formBox").style.display = "none";
}

function cancelForm() {
    clearForm();
}

function removeChore(index) {
    chores.splice(index, 1);
    displayChores();
}

function toggleComplete(index) {
    let text = document.getElementById(`text${index}`);
    chores[index].completed = !chores[index].completed;
    if (chores[index].completed) {
        text.style.textDecoration = "line-through";
    }
    else {
        text.style.textDecoration = "none";
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