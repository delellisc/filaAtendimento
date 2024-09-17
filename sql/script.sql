-- Criação do banco de dados
CREATE DATABASE fila_atendimento;
USE fila_atendimento;

CREATE TABLE paciente(
    cpf VARCHAR(14) PRIMARY KEY,
    nome TEXT
);

CREATE TABLE especialidade(
    especialidade_id INT AUTO_INCREMENT PRIMARY KEY,
    especialidade TEXT
);

CREATE TABLE profissional(
    crm VARCHAR(20) PRIMARY KEY,
    especialidade_id INT,
    nome TEXT,
    FOREIGN KEY (especialidade_id) REFERENCES especialidade(especialidade_id)
);

CREATE TABLE consulta(
    crm VARCHAR(14),
    cpf VARCHAR(14),
    data_consulta DATE,
    horario_inicio TIME,
    horario_fim TIME,
    descricao TEXT,
    FOREIGN KEY (crm) REFERENCES profissional(crm),
    FOREIGN KEY (cpf) REFERENCES paciente(cpf)
);

CREATE TABLE atendimento(
    atendimento_id INT AUTO_INCREMENT PRIMARY KEY,
    crm VARCHAR(14),
    data_atendimento DATE,
    FOREIGN KEY (crm) REFERENCES profissional(crm)
);