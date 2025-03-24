# DesafioBGC-Brasil

## Guia de Instalação e Configuração do Projeto Serverless

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

  - Node.js (versão LTS recomendada)
  - AWS CLI configurado com suas credenciais
  - Serverless Framework:

    ```bash
      npm install -g serverless
    ```

### Configuração das Credenciais AWS

Se você ainda não configurou suas credenciais da AWS, execute:

```bash
  aws configure
```

Isso pedirá:

  - AWS Access Key ID
  - AWS Secret Access Key
  - Região padrão (ex: us-east-1)

As credenciais serão salvas em ~/.aws/credentials.
