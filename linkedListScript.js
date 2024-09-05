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
    var start = topUser; 
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
