// modelo para criação de objetos do tipo usuário
// todas as operações serão feitas a partir da "cabeça" da lista ligada
class User {
    constructor(name, cpf, id, priority) {
        this.name = name;
        this.cpf = cpf;
        this.id = id;
        this.status = 'Ok';
        this.priority = priority;
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
    }
    // método para adição de usuários na fila
    // deve ser utilizado para adicionar um usuário na fila
    addNextUser(name, cpf, priority){
        const newUser = new User(name, cpf, this.length+1);
        if (this.end != null) {
            this.end.next = newUser;
        }
        this.end = newUser;
        if (this.start == null){
            this.start = newUser;
        }
        this.length++;
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
    };
    // método para exibir o usuário no topo da fila
    showTopUser() {
        return this.start;
    };
    // método para trocar usuários no caso de espera
    // deve ser utilizado para trocar a posição de um usuário ausente
    // obs.: quando o usuário é trocado com o último elemento da lista,
    // o campo "end" continua sendo o elemento anterior, porém o campo "next"
    // se torna o usuário a ser esperado.
    // to-do: verificar se o comportamento descrito acima é um problema
    // to-do: buscar por soluções caso o comportamento seja um problema
    swapUserWithTheNext(userId){
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
};
// testes com a estrutura de dados criada acima
teste = new Queue();
teste.addNextUser('Camilo', '123');
teste.addNextUser('de Lellis', '789');
teste.addNextUser('Medeiros', '789');
teste.addNextUser('Santos', '321');
teste.addNextUser('Rosendo', '654');
teste.waitForUser(2);
console.log(teste.start.next);