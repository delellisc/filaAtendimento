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
class Queue {
    constructor(){
        this.start = null;
        this.end = null;
        this.length = 0;
    }
    // função para adição de usuários na fila
    addNextUser(name, cpf){
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
    // função para remover o primeiro usuário da fila
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
    // função para exibir o usuário no topo da fila
    showTopUser() {
        return this.start;
    };
    // função para trocar usuários no caso de espera
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
    // função de espera
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
teste = new Queue();
teste.addNextUser('Camilo', '123');
teste.addNextUser('de Lellis', '789');
teste.addNextUser('Medeiros', '789');
teste.waitForUser(2);
console.log(teste);