Sistema de Telefonia - .NET e Angular
Este projeto é uma aplicação de telefonia que integra um back-end em .NET com um front-end em Angular. O objetivo principal é gerenciar clientes, planos de telefonia e suas relações, proporcionando uma estrutura escalável e de fácil manutenção.

Estrutura do Projeto
Repositórios
Back-end (API em .NET): GitHub - BackTelefonia
Front-end (Angular): GitHub - FrontTelefonia
Front-end (Angular)
O front-end é desenvolvido utilizando o framework Angular, composto por 3 componentes principais e um serviço responsável pela comunicação com o back-end:

Cliente: Componente para gerenciar os dados dos clientes.
Dashboard: Componente para visualizar as métricas e informações gerais do sistema.
PlanoTelefonia: Componente para gerenciar os planos de telefonia disponíveis.
Além disso, foi implementado um Service que contém métodos para se comunicar com o back-end via HTTP e WebAPI.

Back-end (API em .NET)
O back-end foi desenvolvido utilizando .NET e Entity Framework, com persistência de dados em um banco de dados SQL Server. As principais entidades e suas relações incluem:

Cliente: Tabela que armazena as informações dos clientes.
PlanoDeTelefonia: Tabela que contém os planos de telefonia disponíveis.
ClientePlano: Tabela de junção que realiza a relação de muitos para muitos entre clientes e planos de telefonia.
Estrutura do Back-end
Migrations: Controle de versão do banco de dados utilizando Entity Framework.
Models: Contém as entidades de dados (Cliente, PlanoDeTelefonia, ClientePlano).
Services: Lógica de negócios que interage com os dados.
Data: Contém a configuração de acesso ao banco de dados.
Controllers: Endpoints da API que manipulam as requisições HTTP.
Arquitetura
O sistema segue uma arquitetura de camadas para garantir escalabilidade e manutenção eficiente:

Front-end: Angular
Back-end: .NET com Entity Framework e SQL Server
Comunicacão: HTTP e WebAPI
Persistência de Dados: SQL Server via Entity Framework
Como Rodar o Projeto
1. Back-end (API em .NET)
Clone o repositório do back-end:
bash
Copiar
git clone https://github.com/tiagoramos049/BackTelefonia
Abra o projeto no Visual Studio ou no Visual Studio Code.
Configure a string de conexão no arquivo appsettings.json para o seu banco de dados SQL Server.
Rode as migrations para criar as tabelas no banco de dados:
bash
Copiar
dotnet ef database update
Execute a API:
bash
Copiar
dotnet run
A API estará disponível no endereço configurado, normalmente http://localhost:5000.

2. Front-end (Angular)
Clone o repositório do front-end:
bash
Copiar
git clone https://github.com/tiagoramos049/FrontTelefonia
Navegue até o diretório do projeto e instale as dependências:
bash
Copiar
cd FrontTelefonia
npm install
Configure o serviço de comunicação com o back-end no arquivo src/app/services/telefone.service.ts.
Execute o projeto:
bash
Copiar
ng serve
A aplicação Angular estará disponível em http://localhost:4200.

Funcionalidades
Cadastro e Gerenciamento de Clientes: Através do componente Cliente, é possível cadastrar e listar os clientes.
Gerenciamento de Planos de Telefonia: O componente PlanoTelefonia permite cadastrar, listar e editar os planos disponíveis.
Dashboard: O componente Dashboard fornece uma visão geral dos dados, com informações como número de clientes e planos ativos.
Relação Cliente-Plano: A tabela ClientePlano armazena a relação de muitos para muitos entre clientes e planos de telefonia.
Escalabilidade
A estrutura do projeto foi projetada para ser escalável, permitindo fácil adição de novas funcionalidades e crescimento da base de código. A divisão entre front-end e back-end, além das camadas bem definidas no back-end (Controllers, Services, Data, Models), facilita a manutenção e futuras melhorias.

Implementação do Dashboard
O Dashboard ainda está em desenvolvimento. Planeja-se incluir métricas como:

Total de clientes cadastrados.
Total de planos de telefonia disponíveis.
Relação de clientes por plano.
Essas informações serão extraídas da base de dados e exibidas no front-end através de gráficos e tabelas dinâmicas.

Tecnologias Usadas
Front-end: Angular, HTML, CSS, TypeScript
Back-end: .NET, Entity Framework, SQL Server
Comunicação: HTTP, WebAPI
Banco de Dados: SQL Server
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests, sugerir melhorias ou relatar problemas.

Faça um fork deste repositório.
Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade').
Envie para o repositório remoto (git push origin feature/nova-funcionalidade).
Abra um pull request.
