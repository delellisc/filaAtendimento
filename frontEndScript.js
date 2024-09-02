// função para colorir em amarelo as células da tabela
function paintDataBackgroundYellow(id) {
    console.log("painting data cells yellow...");
    var dataCells = document.getElementsByClassName(`data${id}`);
    for (let i = 0; i < dataCells.length; i++) {
        dataCells[i].style.backgroundColor = "Yellow";        
    }
};
// função para exibir formulário após clicar no botão "Adicionar primeiro usuário"
function showForm() {
    console.log("showing form...");
    document.getElementById("form").style.display = "block";
    document.getElementById("firstButton").style.display = "none";
};
// função para exibir tabela após inserção do primeiro usuário
function showTable() {
    console.log("showing table...");
    document.getElementById("table").style.display = "block";
    document.getElementById("form").style.display = "none";
};
// função para atualizar tabela após operações na fila
function refreshTable(topUser) {
    console.log("refreshing table...")
    for (let i = 0; topUser != null; i++) {
        addUserToTable(topUser);
        topUser = topUser.next;
    }
};
// função que adiciona primeiro usuário
function addFirstUser() {
    console.log("adding first user...")
    var name = document.getElementById("nameInput").value;
    var cpf = document.getElementById("cpfInput").value;
    var user = createUser(name, cpf);
    addUserToTable(user);
    showTable();
};
// função que adiciona usuário à tabela
function addUserToTable(user) {
    console.log("adding user to table...")
    var table = document.getElementById("table");
    var tableRow = document.createElement("tr");
    var userInfo = [user.name, user.cpf, user.status];
    for (let i = 0; i < userInfo.length; i++) {
        var currentInfo = userInfo[i];
        var tableData = document.createElement("td");
        tableData.setAttribute("class", `data${user.id}`);
        tableData.appendChild(document.createTextNode(`${currentInfo}`));
        tableRow.appendChild(tableData);
    }
    var waitButton = document.createElement("input");
    var okButton = document.createElement("input");
    waitButton.setAttribute("class", `data${user.id}`);
    waitButton.setAttribute("type", "button");
    waitButton.setAttribute("value", "Espera");
    waitButton.setAttribute("onclick", `waitForUser(${user.id})`);
    okButton.setAttribute("class", `data${user.id}`);
    okButton.setAttribute("type", "button");
    okButton.setAttribute("value", "Concluído");
    // okButton.setAttribute("onclick", `waitForUser(${user.id})`);
    var firstButton = document.createElement("td");
    var secondButton = document.createElement("td");
    firstButton.appendChild(okButton);
    secondButton.appendChild(waitButton);
    tableRow.appendChild(firstButton);
    tableRow.appendChild(secondButton);
    table.appendChild(tableRow);
};