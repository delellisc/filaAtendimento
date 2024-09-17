SELECT * FROM atendimento a
INNER JOIN profissional p ON a.crm = p.crm
INNER JOIN especialidade e ON e.especialidade_id = p.especialidade_id;

SELECT p.cpf, p.nome, pf.nome, pf.crm FROM paciente p
INNER JOIN consulta c ON c.cpf = p.cpf
INNER JOIN profissional pf ON pf.crm = c.crm;