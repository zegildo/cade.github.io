--DROP VIEW agg_num
--DROP TABLE letra_num
/**
CRIA TABELA DE LETRAS DE NUMEROS
**/
CREATE TABLE letra_num(
	letra char(1),
	num int
);

/**
PREENCHE TABELA COM DADOS SINTÉTICOS
**/
INSERT INTO letra_num
	SELECT chr((65 + round(random() * 25))::int) as letra,
	      (floor(random() * 10 + 1)::int) as num
	FROM generate_series(1,10000);
	
/**
PROPOSTA DE SOLUCAO
**/
WITH agg_num AS(
SELECT letra, array_agg(num) as agg
FROM letra_num
GROUP BY letra
ORDER BY letra ASC
)

SELECT t1.letra as letra_i, t2.letra as letra_i, (SELECT COUNT(1) 
							FROM (SELECT unnest(t1.agg) 
							      INTERSECT 
							      SELECT unnest(t2.agg))T) as weigh
FROM agg_num t1, agg_num t2

/**
obs: Ainda bastante ineficiente podemos conseguir melhorar o desempenho utilizando a função 
crosstab e criando agregações fixas e evitando a construção da estrutura em tempo de execução
**/