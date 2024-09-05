var count = 0;
// modelo para criação de objetos do tipo usuário
// todas as operações serão feitas a partir da "cabeça" da lista ligada
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
// "topUser" é a cabeça da lista ligadas
function showTopUser(topUser) {
    return topUser;
};
// função para remover o primeiro usuário da fila
function removeTopUser(topUser) {
    var user = topUser;
    topUser = topUser.next;
    return user;
};
// função para adição de usuários na filaUser
function addNextUser(topUser, name, cpf){
    var start = topUser;
    var newUser = createUser(name, cpf)
    while (start.next != null) {
        start = start.next;
    }
    newUser.next = start.next;
    start.next = newUser;
    console.log(topUser);
    return topUser;
};
// função de espera
function waitForUser(topUser, userId) {
    var start = topUser;
    while (start.next != null) {
        if (start.id == userId){
            start.status = 'Waiting';
            break;
        }
        start = start.next;
    }
    /*
    console.log('waiting for user...');
    paintDataBackgroundYellow(buttonId);
    */
};
// função para reordenar a lista ligada
function reorderUsers(topUser){
    var start = topUser;
}
// to-do: rodar essa linha quando a fila for inicializada
teste = createUser('Camilo', '123');
// to-do: rodar as linhas abaixo quando adicionar os demais pacientes
teste = addNextUser(teste, 'de Lellis', '456');
teste = addNextUser(teste, 'Medeiros', '789');
waitForUser(teste, 2);
console.log(teste);