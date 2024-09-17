SELECT * FROM atendimento a
INNER JOIN profissional p ON a.crm = p.crm
INNER JOIN especialidade e ON e.especialidade_id = p.especialidade_id;