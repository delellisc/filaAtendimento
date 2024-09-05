-- script para criação do banco de dados relacional
CREATE DATABASE fila_atendimento;
USE DATABASE fila_atendimento;
CREATE TABLE paciente(
	paciente_id SERIAL PRIMARY KEY,
	nome TEXT,
    cpf VARCHAR(14),
);
CREATE TABLE especialidade(
	especialidade_id SERIAL PRIMARY KEY,
    especialidade TEXT
);
CREATE TABLE profissional(
	profissional_id SERIAL PRIMARY KEY,
    especialidade_id INTEGER,
    nome TEXT,
    crm VARCHAR(),
    FOREIGN KEY (especialidade_id) REFERENCES especialidade(especialidade_id)
);
CREATE TABLE consulta(
	profissional_id INTEGER,
    paciente_id INTEGER,
    data_consulta DATE,
	horario_inicio DATE,
    horario_fim DATE,
    descricao TEXT,
    FOREIGN KEY (profissional_id) REFERENCES profissional(profissional_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);
CREATE TABLE atendimento(
	atendimento_id SERIAL PRIMARY KEY,
	profissional_id INTEGER,
    data_atendimento DATE,
    -- horario_inicio DATE,
    -- horario_fim DATE,
    FOREIGN KEY (profissional_id) REFERENCES profissional(profissional_id);
);
