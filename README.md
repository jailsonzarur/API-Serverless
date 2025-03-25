# DesafioBGC-Brasil

## Endpoint: https://t5c18258d7.execute-api.us-east-1.amazonaws.com

## Documentação da API

Esta tabela apresenta os endpoints da API, suas respectivas URLs, exemplos de entrada, os métodos HTTP utilizados e uma breve descrição de suas funcionalidades.

| Tipo       | URL                                               | Exemplo de Saída                                      | Descrição |
| ---------- | ------------------------------------------------- | ------------------------------------------------------| --------- |
| **GET**   | `/dev/last-best-sellers-scraping`                  | `{"success": true,"data": {}}`                        | Retorna o último scraping feito.   |
| **GET**   | `/dev/all-best-sellers-scraping`                   | `{"success": true,"data": [{}]}`                      | Retorna todos os scrapings feitos. |
| **GET**    | `/dev/`                                           | `{"success": true,"data": null}`                      | Health Check.                      |

## Introdução

Este projeto implementa uma API Serverless para capturar os bestsellers da Amazon usando Web Scraping. A extração dos dados ocorre localmente, e os resultados são armazenados no DynamoDB.

### Como funciona?
O Web Scraper captura informações da página de mais vendidos da Amazon.

Os dados são salvos no DynamoDB, registrando:

  - Data da extração (scraping_date): timestamp em formato string, que indica o exato momento em que aquele processo de extração ocorreu.
  - Top 3 produtos (top3): lista com os três produtos mais vendidos no momento da extração.

Cada produto contém:

  - Nome do produto.
  - Avaliação (rating).
  - Preço no momento da extração.

O endpoint(/best-sellers) da API retorna a última extração disponível, incluindo a data e os produtos extraídos.

### Diferencial
Diferente de abordagens que apenas sobrescrevem os dados com os produtos mais vendidos do momento, este projeto mantém um histórico das extrações.

Cada extração feita pelo Web Scraper gera um novo registro no banco de dados.

O que isso significa na prática?

Você pode consultar todas as extrações feitas no passado e analisar como os produtos mais vendidos mudaram ao longo do tempo.

O banco de dados não contém apenas os produtos mais vendidos no momento atual, mas sim um histórico das extrações, permitindo análises mais detalhadas sobre tendências de mercado.

Essa abordagem permite que sua API ofereça insights sobre variações dos bestsellers ao longo do tempo.

## Guia de Instalação e Configuração do Projeto Serverless

### 1. Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

  - Node.js (versão LTS recomendada)
  - AWS CLI configurado com suas credenciais
  - Serverless Framework:

    ```bash
      npm install -g serverless
    ```

### 2. Configuração das Credenciais AWS

Se você ainda não configurou suas credenciais da AWS, execute:

```bash
  aws configure
```

Isso pedirá:

  - AWS Access Key ID
  - AWS Secret Access Key
  - Região padrão (ex: us-east-1)

As credenciais serão salvas em ~/.aws/credentials.

### 3. Instalação do Projeto

Clone o projeto executando o seguinte comando:

```bash
  git clone https://github.com/jailsonzarur/DesafioBGC-Brasil.git
```

Entre na pasta do projeto

```bash
  cd DesafioBGC-Brasil
```

Execute o seguinte comando para instalar as dependências do projeto:

```bash
  npm install
```


### 4. Configuração do Serverless Framework (Caso você queira fazer novos deploy's) 

Verifique se o Serverless Framework está funcionando corretamente:

```bash
  serverless --version
```

Autentique-se na AWS via Serverless:

```bash
  serverless config credentials --provider aws --key SEU_ACCESS_KEY --secret SEU_SECRET_KEY
```

Em seguida, para implantar a aplicação na AWS:

```bash
  serverless deploy
```

### 5. Executar o script para o WebScraping da página de Mais Vendidos da Amazon

Compile o código Typescript existente para Javascript:

```bash
  npx tsc
```

Execute o script para popular o Banco de Dados com as informações:

```bash
  node dist/scrapper/scrapper-bestsellers.js
```
