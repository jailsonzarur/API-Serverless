# DesafioBGC-Brasil

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
