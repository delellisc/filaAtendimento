var user = {};
var count = 0;
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
// ***** ESSAS FUNÇÕES ACIMA DEVERIAM ESTAR NO OUTRO SCRIPT *****
// modelo para criação de objetos do tipo usuário
class User {
    constructor(name, cpf) {
        this.name = name;
        this.cpf = cpf;
        this.id = count;
        this.status = 'Ok';
        this.next = null;
    }
};
// função para criação de um objeto do tipo usuário / criação da lista ligada
function createUser(name, cpf) {
    count++;
    var newUser = new User(name, cpf);
    return newUser;
};
// função para exibir o usuário no topo da fila
function showTopUser(topUser) {
    return topUser;
};
// função para remover o primeiro usuário da fila
function removeTopUser(topUser) {
    var user = topUser;
    topUser = topUser.next;
    return user;
};
// função para adição de usuários na fila
function addNextUser(topUser, name, cpf){
    count ++;
    var start = user;
    var newUser = createUser(name, cpf)
    while (start.next != null) {
        start = start.next;
    }
    newUser.next = start.next;
    start.next = newUser;
    return topUser;
};
// função de espera
function waitForUser(buttonId) {
    console.log('waiting for user...');
    paintDataBackgroundYellow(buttonId);
};
var user = createUser('Camilo', '123');
addNextUser(user, 'Medeiros', '456');
addNextUser(user, 'Santos', '789');
console.log(user);
console.log(count);