# api-fastify-parking
API para gerenciar o estacionamento de veículos, com funcionalidades para registrar entrada e saída, calcular valores de estacionamento e gerenciar vagas e veículos. A aplicação foi construída utilizando **Fastify**, **TypeScript**, **Prisma** e **Zod**.

---

## Tecnologias Utilizadas

- **Fastify**: Framework para criar APIs de alta performance.
- **TypeScript**: Para tipagem estática e maior segurança no código.
- **Prisma**: ORM para acessar o banco de dados MySQL.
- **Zod**: Biblioteca para validação de dados de forma eficiente.

---

## Funcionalidades

### Estacionamento

- **Registrar Entrada de Veículo**: Registra a entrada de um veículo e associa a uma vaga.
- **Encerrar Estacionamento**: Registra a saída do veículo, calcula o valor com base no tempo de permanência e libera a vaga.
- **Gerenciar Vagas**: Atualiza o status das vagas para "livre" ou "ocupada".

### Vagas

- **Criar Vaga**: Cria uma nova vaga de estacionamento com um número único e setor.
- **Listar Vagas**: Lista todas as vagas disponíveis.
- **Obter Vaga por ID**: Busca uma vaga pelo ID.
- **Obter Vaga por Número**: Busca uma vaga pelo número da vaga.
- **Atualizar Vaga**: Atualiza informações de uma vaga, como número, setor e status.
- **Deletar Vaga**: Exclui uma vaga do sistema.

### Veículos

- **Criar Veículo**: Cria um novo veículo com informações como modelo, placa e tipo.
- **Listar Veículos**: Lista todos os veículos cadastrados.
- **Obter Veículo por ID**: Busca um veículo pelo ID.
- **Obter Veículo por Placa**: Busca um veículo pela sua placa.
- **Atualizar Veículo**: Atualiza informações de um veículo.
- **Deletar Veículo**: Exclui um veículo do sistema.

---

## Regras de Cobrança

- **Até 20 minutos**: Sem cobrança.
- **Até 1 hora**: R$10,00.
- **Até 2 horas**: R$15,00.
- **Acima de 3 horas**: R$25,00.

---
