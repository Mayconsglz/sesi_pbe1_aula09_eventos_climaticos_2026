## eventos_climaticos 

# Descrição
Aplicação Back-end desenvolvida com Node.js, Express e MariaDB/MySQL

# (DER)
<img src="https://github.com/Mayconsglz/sesi_pbe1_aula09_eventos_climaticos_2026/blob/main/docs/mer_der_conceitual.png">
<br>

# (UML)
<img src="https://github.com/Mayconsglz/sesi_pbe1_aula09_eventos_climaticos_2026/blob/main/docs/uml_dc.png">

# Tecnologias Utilizadas

* Node.js: Ambiente de execução JavaScript no servidor.
* Express.js: Framework web para criação das rotas e APIs
* MariaDB / MySQL: Banco de dados relacional.
* Thunder Client: Extensão do VS Code para execução de testes das rotas HTTP.

# Testes de Requisições (Thunder Client)

Os prints dos testes das requisições e respostas estão armazenados no diretório docs/prints/

[Pasta de prints](./docs/prints)

# Instruções para Testar

* Configurar o Banco de Dados

Execute o script contido em db/script.sql em seu gerenciador de banco de dados (MySQL / MariaDB / phpMyAdmin).

O script criará o banco registros_climaticos e populará com os dados iniciais.

* Executar o Servidor
```
Abra o terminal na pasta raiz eventos_climaticos.
```

Instale as dependências executando:
```
npm install
```

Inicie o servidor:
```
npm run dev
```
