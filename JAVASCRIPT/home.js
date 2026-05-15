window.onload = loadGroups;
function addGroup() {
    let groupName =
        prompt("Enter Group Name:");
    let members =
        prompt("Enter Number of Members:");
    let expense =
        prompt("Enter Total Expense:");
    let chores =
        prompt("Enter Total Chores:");
    if (
        groupName === "" ||
        members === "" ||
        expense === "" ||
        chores === "" ||
        groupName === null ||
        members === null ||
        expense === null ||
        chores === null
    ) {

        alert("Please fill all details");
        return;
    }

    let group = {
        id: Date.now(),
        name: groupName,
        members: members,
        expense: expense,
        chores: chores
    };

    let groups =
        JSON.parse(localStorage.getItem("groups"))
        || [];

    groups.push(group);

    localStorage.setItem(
        "groups",
        JSON.stringify(groups)
    );

    createCard(group);
    updateStats();

}

function createCard(group) {

    let card =
        document.createElement("div");

    card.className =
        `bg-[#161b22] border border-emerald-400/30 rounded-3xl p-5 cursor-pointer hover:scale-105 hover:border-emerald-400 transition
                duration-300 shadow-xl`;

    card.onclick = function () {
        window.location.href =
            "group.html?id=" + group.id;

    };

    card.innerHTML = `

        <div class="flex items-center justify-between mb-5">

            <h2 class="text-2xl font-bold text-purple-300">
                ${group.name}
            </h2>

            <button onclick="deleteGroup(event, ${group.id})"
                class="bg-gray-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
        </div>


        <p class="text-gray-400 text-sm mb-5">
            ·${group.chores} chores
        </p>


        <div class="text-5xl font-extrabold text-emerald-400 mb-6">
            ₹${group.expense}
        </div>


        <div
            class="border-t border-gray-700 pt-4 flex justify-between items-center text-sm text-gray-300">
            <span>
                ${group.members} members
            </span>

            <span class="text-yellow-300">
                ${group.chores} chores
            </span>

        </div>

    `;
    document
        .getElementById("cardContainer")
        .appendChild(card);
}

function deleteGroup(event, id) {
    event.stopPropagation();
    let groups =
        JSON.parse(localStorage.getItem("groups"))
        || [];
    groups = groups.filter(group => group.id != id);

    localStorage.setItem(
        "groups",
        JSON.stringify(groups)
    );

    updateStats();
    location.reload();
}

function updateStats() {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    let totalGroups = groups.length;
    let totalExpense = 0;
    let totalChores = 0;

    groups.forEach(group => {
        totalExpense += Number(group.expense);
        totalChores += Number(group.chores);
    });

    document.getElementById("ngrps").innerText = `${totalGroups} Groups`;
    document.getElementById("nexpense").innerText = `Total ₹${totalExpense}`;
    document.getElementById("nchores").innerText = `${totalChores} Pending Chores`;

}
function loadGroups() {
    let groups =
        JSON.parse(localStorage.getItem("groups"))
        || [];

    groups.forEach(group => {

        createCard(group);
        updateStats();
    });
}