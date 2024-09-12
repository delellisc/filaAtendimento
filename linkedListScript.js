// modelo para criação de objetos do tipo usuário
// todas as operações serão feitas a partir da "cabeça" da lista ligada
class User {
    constructor(name, cpf, id) {
        this.name = name;
        this.cpf = cpf;
        this.id = id;
        this.status = 'Ok';
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
    // método para adição de usuários na fila
    // deve ser utilizado para adicionar um usuário na fila
    addNextUser(name, cpf, priority){
        const newUser = new User(name, cpf, this.idCounter);
         // criação da lista
         if (this.start == null) {
            this.start = newUser;
            this.end = newUser;
        }
        // adição ao fim da lista
        else {
            let tmp = this.start;
            while (tmp.next != null){
                tmp = tmp.next;
            };
            tmp.next = newUser;
            // this.end.next = newUser;
            this.end = newUser;
        }
        this.length++;
        this.idCounter++;
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
            console.log(`Nome: ${start.name} | CPF: ${start.cpf} | ID: ${start.id}`);
            start = start.next;
        };
        console.log(`Nome: ${start.name} | CPF: ${start.cpf} | ID: ${start.id}`);
    }
};
/*
// testes com a estrutura de dados criada acima
let teste = new Queue();
teste.addNextUser('Camilo', '123');
teste.addNextUser('de Lellis', '789');
teste.addNextUser('Medeiros', '789');
teste.addNextUser('Santos', '321');
teste.addNextUser('Rosendo', '654');
//teste.waitForUser(2);
teste.printQueue();
//let camilo = teste.removeTopUser();
//console.log(camilo);
//teste.printQueue();
console.log(teste);
*/
module.exports = {Queue};