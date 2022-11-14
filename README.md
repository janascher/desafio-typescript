<div align="center">
	<a  href="https://www.alphaedtech.org.br/">
	    <img  src="https://user-images.githubusercontent.com/79182711/187928980-1c1c834c-d92c-4565-b7b6-9cf5b644873e.png"  alt="Alpha EdTech"  title="Alpha EdTech"  width="250" />
	</a>
	<h3>
		Desafio TypeScript da
		<a  href="https://www.alphaedtech.org.br/">
		Alpha EdTech
		</a>
	</h3>
</div>

## 🧐 Sobre o projeto 

Desafio final do módulo **Typescript**, em grupos de 5 pessoas, onde cada integrante deve enviar os arquivos do projeto, exceto  node_modules,  .env  e a pasta de compilação.

## 📌 Regras do grupo

### Sobre as atividades:
1 - Atualizar a versão atual com a remota;
2 - Criar ou voltar para branch;
3 - Adicionar e escolher uma atividade no Trello;
4 - Ao concluir uma atividade, abrir uma PR (pull request);
5 - Após atualizar na branch main, marcar a atividade como concluída no Trello.

### Sobre Pull Request (PR):
1 - É proibido realizar commits e push na branch main;
2 - Ir para branch main, realizar fetch e merge com a  origin/main;
3 - Retornar a sua topic branch e realizar merge com a main. **Observação: resolver os conflitos caso exista**;
4 - Fazer push com repositório remoto;
5 - Abrir a PR e solicitar via Whatsapp para que os demais possam revisar;
6 - Pelo menos um revisor deve aprovar ou solicitar explicitamente quais correções devem ser feitas;
7 - Somente após todas as correções terem sido realizadas e, pelo menos um revisor ter aprovado, que o dono da PR pode realizar o merge na main.
**Observação: caso na hora de realizar o merge o GitHub acusar algum conflito, a PR deve ir para o estado de draft e retomar para o passo 2**;
8 - Após concluir uma PR, fica ao critério da pessoa em apagar ou não a topic branch.

## ✨ Requisitos do projeto

**Leia atentamente as regras de negócio e os endpoints antes de começar a codar**:

- Criar uma  **API** para gerenciamento de funcionários e equipes, deve incluir 3 tipos de usuários e suas respectivas permissões;
-   Tipos de  **Usuários**:
    - Administrador;
    - Líder;
    - Funcionários.
- Devem ter  **Validators**, que foram aprendidos em aula ao decorrer das aulas. Todos os dados inseridos devem ser validados pelo backend;
- Cada **administrador** tem permissão para ver e modificar qualquer dado de qualquer usuário ou equipe;
- Cada **equipe** tem um líder, que deve receber sua respectiva permissão para alterar os dados da equipe, mas não de seus membros, poderá também ver os dados de outras equipes e seus líderes (exceto password).
- Cada **funcionário** poderá alterar seus próprios dados e ver os dados da própria equipe e os outros membros (exceto password) da própria equipe;
- Podem existir usuários sem equipe.

**Entidades:**

-   **Usuario**: id(uuid), username, email, first_name, last_name, password, squad(fk), is_admin;
-   **Equipe**: id(uuid), name, leader(fk).

**EndPoints:**

-   GET “/users/me” - **Ver** seu próprio usuário (Todos);
-   GET “/users/” - **Ver** todos os usuários (Admin);
-   GET “/users/:user_id” - **Ver** determinado usuário (Admin, Líder);
-   GET “/teams/” - **Ver** todas as equipes (Admin);
-   GET “/teams/:team” - **Ver** determinada equipe (Admin, Líderes, Funcionário);
-   POST “/users/” - **Criar** um novo usuário (Todos e não autenticado);
-   POST “/team/” - **Criar** uma nova equipe (Admin);
-   PATCH “/users/:user_id” - **Atualizar** usuário (Somente o próprio usuário);
-   PATCH “/team/:team_id” - **Atualizar** equipe (Admin, Líder da equipe);
-   POST “/team/:team_id/member/:user_id” - **Adicionar** membro na equipe (Admin, Líder da equipe);
-   DELETE “/team/:team_id/member/:user_id” - **Retirar** membro da equipe (Admin, Líder da equipe);
-   DELETE “/users/:user_id” - **Deletar** usuário (Admin);
-   DELETE “/team/:team_id” - **Deletar** equipe (Admin).

## 🔗 Links de sobrevivência

- [Guia Git e Github - Boas Práticas](https://diegocoliveira.github.io/equipe10-dev-html/index.html);
- [Guia com alguns comandos para trabalhar com Git e GitHub](https://github.com/janascher/guia-git-github);
- [TypeScript: JavaScript With Syntax For Types. (typescriptlang.org)](https://www.typescriptlang.org/).

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- **[TypeScript](https://www.typescriptlang.org/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[npm](https://www.npmjs.com/)**
- **[Node.js](https://nodejs.org/en/)**
- **[WhatsApp](https://www.whatsapp.com/?lang=pt_br)**
- **[Discord](https://discord.com/)**
- **[Trello](https://trello.com/pt-BR)**

## 🤝 Contribuidores

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/dbbitz"><img src="https://avatars.githubusercontent.com/u/81662636?v=4" width="100px;" alt="Daniel Rocha"/><br /><sub><b>Daniel Rocha</b></sub></a>	<br />🚀<br />
		</td>
		<td align="center">
			<a href="https://github.com/Fabio-Cesar"><img src="https://avatars.githubusercontent.com/u/103617454?v=4" width="100px;" alt="Fábio César"/><br /><sub><b>Fábio César</b></sub></a>	<br />🚀<br />
		</td>
	    <td align="center">
			<a href="https://github.com/janascher"><img src="https://avatars.githubusercontent.com/u/79182711?v=4" width="100px;" alt="Janaína Scher"/><br /><sub><b>Janaína Scher</b></sub></a>	<br />🚀<br />
		</td>
		<td align="center">
			<a href="https://github.com/marlissonls"><img src="https://avatars.githubusercontent.com/u/103654093?v=4" width="100px;" alt="Marlisson Silva"/><br /><sub><b>Marlisson Silva</b></sub></a>	<br />🚀<br />
		</td>
		<td align="center">
			<a href="https://github.com/rogeriokotsubo"><img src="https://avatars.githubusercontent.com/u/81968045?v=4" width="100px;" alt="Rogério Kotsubo"/><br /><sub><b>Rogério Kotsubo</b></sub></a>	<br>🚀</br>
		</td>
	</tr>
</table>
