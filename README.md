# InstaHash
InstaHash programa permite o usuário logar com sua conta do Instagram e pesquisar por hashtags, mostrando as hashtags recentes e armazenando todo o histórico de pesquisas do usuário.
Este projeto foi desenvolvido usando as tecnologias NodeJS, AngularJS Framework (v1) e MongoDB.

## Pré-requisitos

 1. Git
 2. NodeJS
 3. NPM
 4. Bower (instalação global `npm install -g bower`)
 5. Grunt (instalação global `npm install -g grunt`)
 6. Mocha (instalação global `npm install -g mocha`)
 7. MongoDB

## Configurando
Antes de poder rodar o app e realizar os testes, é necessário configurar alguns arquivos, a qual são mencionados abaixo:

 - `./config/default.json`:
	 Neste arquivo são configurados os seguintes parâmetros:
	 - `uriMongoDb`: URI de conexão ao banco de dados MongoDB.
	 - `host->port`: Porta que será utilizada pelo Express para receber as requests.
	 - `instagram->client_id`: Client_id fornecido pela API do Instagram ao desenvolvedor.
	 - `instagram->client_secret`: Client_secret fornecido pela API do instagram ao desenvolvedor.
	 - `instagram->grant_type`: Atualmente o valor será sempre 'authorization_code' (veja mais em: [docs Instagram API](https://www.instagram.com/developer/authentication/)).
	 - `instagram->url->access_token`: URL de request para o access_token (veja mais em: [docs Instagram API](https://www.instagram.com/developer/authentication/)).
	 - `instagram->url->tags`: URL de request para o endpoint 'tags' (veja mais em: [docs Instagram API](https://www.instagram.com/developer/endpoints/tags/))
 - `./src/scripts/app.constants.js`:
	 Neste arquivo são configurados algumas variáveis usadas no front-end, pelo AngularJS.
	 - `base_url`: URL base para onde são enviados os requests do sistema.
	 - `instagram->authorize`: URL de request para a autorização da API do Instagram (veja mais em: [docs Instagram API](https://www.instagram.com/developer/authentication/))
	 - `instagram->client_id`: Client_id fornecido pela API do Instagram ao desenvolvedor.
	 - `redirect_uri`: URL de redirecionamento do callback que a API do instagram deve chamar assim que o login do usuário for validado. Este valor pode mudar de acordo com o IP e a porta do servidor usado, mantendo apenas o path do caminho (/callbackLogin).

## Instalando as dependências
Para instalar as dependências do projeto, tenha previamente instalado e configurado o [NodeJS](https://nodejs.org/en/) e o [NPM](https://www.npmjs.com/).

Tendo os itens acima instalados e funcionando corretamente, deve-se entrar na pasta raíz do projeto e executar o seguinte comando: `npm install`.

Após o procedimento acima ser realizado com sucesso, devemos instalar também as dependências do front-end, com a ferramenta [Bower](https://bower.io/). Para instalar a ferramenta, deve-se executar o comando: `npm install -g bower` e então, instalar as dependências do front-end com o comando `bower install`.

Também é necessário ter instalado o servidor do [MongoDB](https://www.mongodb.com/). Este deve ser instalado no mesmo servidor ou em um servidor separado, tendo que, neste caso, configurar corretamente a uri de conexão, como explicado no tópico anterior.

## Realizando o build e testes
O projeto conta com scripts automático de build (concatenação e minificação dos arquivos JS) e teste (testes de functions e requests).
Para rodar os testes, deve-se seguir os seguintes passos:
#### Testes:
 1. Entre na pasta raíz do projeto.
 2. Tenha certeza que o [mocha](https://mochajs.org/) está instalado globalmente (`npm install -g mocha`).
 3. Execute o comando `npm run test`.

 Deve-se analisar a saída do comando, afim de aferir se o mesmo contém erros, e então corrigi-los.

#### Build:

 1. Entre na pasta raíz do projeto.
 2. Tenha certeza que o [Grunt](https://gruntjs.com/) está instalado globalmente (`npm install -g grunt`).
 3. Execute o comando: `npm run build`

 Deve-se então analisar a saída do comando, afim de aferir se o mesmo contém erros, e então corrigi-los.

## Start do servidor e acesso ao index
Nesta etapa, já é possível fazer o start do servidor, bem como acessar a página inicial do projeto.

Para fazer o start do servidor deve-se executar o seguinte comando: `npm run start`. Este comando irá rodar o grunt novamente, afim de gerar uma versão atualizada do instahash.min.js.

Caso o servidor inicie corretamente, uma mensagem será mostrada indicando a porta utilizada. Neste momento deve ser possível acessar a página index do projeto, na seguinte url: [http://localhost:8000/](http://localhost:8000/). Caso seu host ou porta sejam diferentes, deve-se corrigir acessando o link correto (http://192.168.1.5:8080/ por exemplo).

## Pesquisando por uma hashtag
Após realizar o login, o usuário é enviado para a página home.

Nesta página é possível realizar a pesquisa de hashtag. Para isto, basta digitar a hashtag desejada no campo '#something' (sem o caractere '#') e clicar no botão 'Pesquisar'. O resultado da pesquisa será mostrado logo abaixo do campo de busca.

Ao realizar uma busca com resultado, é possível salvar o resultado dessa busca, clicando no botão 'Salvar resultado'. Ao clicar no botão, o resultado dessa pesquisa é salvo no histórico de pesquisas.

## Recuperando o histórico de pesquisar
Na página de histórico é possível recuperar todas as pesquisar já realizadas pelo usuário. Para acessar tal página, basta clicar na aba 'Histórico' localizada no botão no canto superior esquerdo da tela.

Nesta página será mostrada uma lista com todas as hashtags pesquisadas pelo usuário, bem como um número indicando quantos resultados foram retornados no momento em que o usuário fez a pesquisa. Por exemplo: caso um usuário faça uma pesquisa pela hashtag 'nature' na semana passada, e no dia da pesquisa tenham sido retonados 10 resultados, então este indicador deverá mostrar o número 10, mesmo que se a mesma pesquisa por 'nature' hoje retorne 15 resultados.

Isto ocorre porque deve-se armazenar os resultados reais do momento da pesquisa e não apenas a tag.

Ao clicar em um item da lista, é aberta uma tela mostrando todas as fotos que pertencem à aquela hashtag. Para deletar essa hashtag do seu histórico, basta clicar no botão 'Deletar' no canto superior direito da tela.

## Créditos
Este projeto foi criado por [Renato N. Lourenço](mailto://renatonolo@hotmail.com) e pode ser realizado fork, análise e pesquisa afim de uso didático. Caso tenha alguma dúvida, sinta-se a vontade para entrar em contato.
 - Email: [renatonolo@hotmail.com](mailto://renatonolo@hotmail.com)
 - Github: [Renato N. Lourenço](https://github.com/renatonolo)
