// modelo para criação de objetos do tipo usuário
// todas as operações serão feitas a partir da "cabeça" da lista ligada
class User {
    constructor(name, cpf, id) {
        this.name = name;
        this.cpf = cpf;
        this.id = id;
        this.status = 'Ok';
        this.position = null;
        this.next = null;
    };
};
// criação do objeto fila
// to-do: criação de uma fila de prioridade alternando entre pessoas com e sem prioridade de atendimento
class Queue {
    constructor(){
        this.start = null;
        this.end = null;
        this.length = 0;
        this.idCounter = 1;
    };
    // método para atualizar posições
    // deve ser utilizado sempre que a lista for atualizada
    updatePositions(){
        let tmp = this.start;
        let position = 1;
        while (tmp != null){
            tmp.position = position;
            tmp = tmp.next;
            position++;
        }
    };
    // método para adição de usuários na fila
    // deve ser utilizado para adicionar um usuário na fila
    addNextUser(name, cpf){
        const newUser = new User(name, cpf, this.idCounter);
        // criação da lista
        if (this.start == null) {
            this.start = newUser;
            this.end = newUser;
        }
        // adição no final da lista
        else {
            this.end.next = newUser;
            this.end = newUser;
        }
        this.length++;
        this.idCounter++;
        this.updatePositions();
    };
    // método para remover o primeiro usuário da fila
    // deve ser utilizado quando uma consulta for concluída
    removeTopUser() {
        if (this.start == null){
            return null;
        }
        const patient = this.start;
        this.start = this.start.next;
        if (this.start == null){
            this.end = null;
        }
        this.length--;
        patient.next = null;
        this.updatePositions();
        return patient;
    };
    // método para exibir o usuário no topo da fila
    showTopUser() {
        return this.start;
    };
    // método para trocar usuários no caso de espera
    // deve ser utilizado para trocar a posição de um usuário ausente
    swapUserWithTheNext(userId){
        // não deve haver troca se o início da lista ou o elemento seguinte não existir
        if (this.start == null || this.start.next == null){
            return;
        }
        let tmp = this.start;
        let tmp2 = null;
        while (tmp.next != null && tmp.id !== userId){
            tmp2 = tmp;
            tmp = tmp.next;
        }
        if (tmp == null || tmp.next == null){
            return;
        }
        const userToSwap = tmp;
        const nextUser = tmp.next;
        if (userToSwap == this.start){
            this.start = nextUser;
        }
        else {
            tmp2.next = nextUser;
        }
        userToSwap.next = nextUser.next;
        nextUser.next = userToSwap;
        if (userToSwap == this.end){
            this.end = nextUser;
        }
        this.updatePositions();
    };
    // método de espera
    // deve ser utilizado quando algum usuário não estiver presente e for o próximo na fila
    waitForUser(userId) {
        if (this.start == null){
            return null;
        }
        let tmp = this.start;
        while (tmp.next != null){
            if (tmp.id == userId){
                tmp.status = 'Waiting';
                break;
            }
            tmp = tmp.next;
        }
        this.swapUserWithTheNext(tmp.id);
    };
    // método para testes
    printQueue(){
        let start = this.start;
        while (start.next != null){
            console.log(`Nome: ${start.name} | CPF: ${start.cpf} | Posição: ${start.position}`);
            start = start.next;
        };
        console.log(`Nome: ${start.name} | CPF: ${start.cpf} | Posição: ${start.position}`);
    }
};
// função para converter a fila armazenada no mongoDB para um objeto da classe fila
function createQueueByJSONObject(jsonObject) {
    let patientQueue = new Queue();
    let tmp = jsonObject.start;
    let tmp2 = null;
    while (tmp != null){
        const newUser = new User(tmp.name, tmp.cpf, tmp.id);
        newUser.status = tmp.status;
        newUser.position = tmp.position;
        if (tmp2 == null){
            patientQueue.start = newUser;
        }
        else{
            tmp2.next = newUser;
        }
        tmp2 = newUser;
        if (tmp.next == null){
            patientQueue.end = newUser;
        }
        tmp = tmp.next;
    };
    patientQueue.length = jsonObject.length;
    patientQueue.idCounter = jsonObject.idCounter;
    return patientQueue;
}
/*
// testes com a estrutura de dados criada acima
let teste = new Queue();
teste.addNextUser('Camilo', '123');
teste.addNextUser('de Lellis', '789');
teste.addNextUser('Medeiros', '789');
teste.addNextUser('Santos', '321');
teste.addNextUser('Rosendo', '654');
// teste.waitForUser(2);
// teste.printQueue();
let camilo = teste.removeTopUser();
//console.log(camilo);
teste.printQueue();
console.log(teste);
//console.log(teste);
*/
/*
let objetoJson = {
    "start": {
        "name": 'de Lellis',
        "cpf": '789',
        "id": 2,
        "status": 'Ok',
        "position": 1,
        "next": {
        "name": 'Medeiros',
        "cpf": '789',
        "id": 3,
        "status": 'Ok',
        "position": 2,
        "next": {
            "name": 'Rosendo',
            "cpf": '654',
            "id": 5,
            "status": 'Ok',
            "position": 4,
            "next": null
        }
    }
    },
    "end": {
        "name": 'Rosendo',
        "cpf": '654',
        "id": 5,
        "status": 'Ok',
        "position": 4,
        "next": null
    },
    "length": 4,
    "idCounter": 6
};
let fila2 = createQueueByJSONObject(objetoJson);
fila2.addNextUser('Santos', '321');
console.log(fila2);
fila2.printQueue();
*/
module.exports = {Queue, createQueueByJSONObject};