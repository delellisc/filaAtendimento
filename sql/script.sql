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

-- Populando banco de dados
INSERT INTO paciente (cpf, nome) VALUES 
('123.456.789-00', 'Maria Silva'),
('987.654.321-11', 'João Oliveira'),
('456.123.789-22', 'Ana Souza'),
('789.456.123-33', 'Carlos Pereira');

INSERT INTO especialidade (especialidade) VALUES 
('Cardiologia'),
('Pediatria'),
('Dermatologia'),
('Neurologia'),
('Ortopedia'),
('Oftalmologia'),
('Psiquiatria'),
('Psicologia'),
('Nutrição');

INSERT INTO profissional (crm, especialidade_id, nome) VALUES 
('CRM001', 1, 'Dr. Roberto Cardoso'),
('CRM002', 2, 'Dra. Ana Paula Nogueira'),
('CRM003', 3, 'Dr. Fernando Lima'),
('CRM004', 4, 'Dra. Carolina Medeiros'),
('CRM006', 5, 'Dr. Ricardo Almeida'),
('CRM007', 6, 'Dra. Marina Gomes'), 
('CRM008', 7, 'Dr. João Henrique'),
('CRM009', 8, 'Dra. Beatriz Castro'),
('CRM010', 9, 'Dra. Laura Fernandes');

INSERT INTO consulta (crm, cpf, data_consulta, horario_inicio, horario_fim, descricao) VALUES 
('CRM001', '123.456.789-00', '2023-09-15', '08:00:00', '08:30:00', 'Consulta de rotina'),
('CRM002', '987.654.321-11', '2023-09-16', '09:00:00', '09:30:00', 'Consulta pediátrica'),
('CRM003', '456.123.789-22', '2023-09-17', '10:00:00', '10:30:00', 'Alergia na pele'),
('CRM004', '789.456.123-33', '2023-09-18', '11:00:00', '11:30:00', 'Dor de cabeça intensa');

INSERT INTO atendimento (crm, data_atendimento) VALUES 
('CRM001', '2024-09-15'),
('CRM002', '2024-09-16'),
('CRM003', '2024-09-17'),
('CRM004', '2024-09-18'),
('CRM005', '2024-09-19'),
('CRM006', '2024-09-20'),
('CRM007', '2024-09-21'),
('CRM008', '2024-09-22'),
('CRM009', '2024-09-23'),
('CRM010', '2024-09-24');