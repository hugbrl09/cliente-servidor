# Atividade com a Arquitetura Cliente-Servidor (Arquitetura de Software)

Este projeto apresenta duas aplicações web desenvolvidas para comparar o comportamento dos servidores Apache + PHP e Node.js + Express ao executar rotas específicas. Foram implementadas três rotas: `/` (página inicial), `/demorado` (simula uma operação que dura mais de 1 minuto) e `/excecao` (gera uma exceção de runtime). Foram realizados experimentos para observar como cada servidor lida com requisições concorrentes e com erros.

---

## Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Apache + PHP](#apache--php)
  - [Node.js + Express](#nodejs--express)
- [Experimentos e Observações](#experimentos-e-observações)
- [Participantes](#participantes)
- [Conclusão](#conclusão)

---

## Estrutura do Projeto

### Apache + PHP

Esta aplicação foi desenvolvida para rodar em um servidor Apache com suporte a PHP. Os arquivos estão organizados em uma pasta (por exemplo, `php_app`) que deve ser colocada no diretório raiz do Apache (em sistemas Linux, geralmente `/var/www/html`).

- **index.php**  
  Rota: `/`  
  Descrição: Exibe uma mensagem de boas-vindas.

- **demorado.php**  
  Rota: `/demorado`  
  Descrição: Simula uma operação demorada (70 segundos de delay utilizando `sleep(70)`).

- **excecao.php**  
  Rota: `/excecao`  
  Descrição: Gera uma exceção de runtime intencionalmente.

**Acesso:**  
Após configurar o servidor Apache, as rotas podem ser acessadas pelos URLs:
- `http://localhost/php_app/index.php`
- `http://localhost/php_app/demorado.php`
- `http://localhost/php_app/excecao.php`

---

### Node.js + Express

Esta aplicação utiliza o framework Express para criar um servidor não bloqueante. O código está contido no arquivo `server.js`.

- **server.js**  
  Descrição: Contém as três rotas:
  - `/`: Rota principal, que exibe uma mensagem de boas-vindas.
  - `/demorado`: Rota que simula uma operação demorada (70 segundos utilizando `setTimeout`).
  - `/excecao`: Rota que lança uma exceção de runtime.

**Instruções de Execução:**

1. **Instalação do Node.js e do Express:**
   - Instale o [Node.js](https://nodejs.org/) se ainda não o tiver.
   - No diretório do projeto, inicialize o npm:
     ```bash
     npm init -y
     ```
   - Instale o Express:
     ```bash
     npm install express
     ```

2. **Executar o Servidor:**
   - No terminal, na pasta onde está o `server.js`, execute:
     ```bash
     node server.js
     ```
   - Acesse as rotas pelos seguintes URLs:
     - `http://localhost:3000/`
     - `http://localhost:3000/demorado`
     - `http://localhost:3000/excecao`

---

## Experimentos e Observações

Foram realizados os seguintes testes para analisar o comportamento de cada servidor:

1. **Sequência 1:** Acessar `/` e, em seguida, `/demorado`.  
   - **Objetivo:** Verificar se a requisição à rota principal é processada normalmente após uma requisição demorada.

2. **Sequência 2:** Acessar `/demorado` e, enquanto a requisição estiver em andamento, acessar `/`.  
   - **Objetivo:** Observar se o servidor consegue lidar com requisições concorrentes ou se uma requisição demorada bloqueia o processamento de outras.

3. **Sequência 3:** Acessar `/excecao` e, em seguida, `/`.  
   - **Objetivo:** Verificar se uma exceção na rota `/excecao` impacta a disponibilidade do servidor para atender a novas requisições.

### Observações

- **Node.js/Express:**  
  Por ser uma plataforma não bloqueante, o servidor continua respondendo normalmente às requisições mesmo com operações demoradas ou após erros.

- **Apache/PHP:**  
  No seu ambiente, o Apache com PHP também não bloqueou as requisições. Mesmo após acessar a rota `/demorado` ou a rota que gera exceção, a página inicial (`/index.php`) foi carregada sem problemas. Essa característica pode variar conforme a configuração do servidor Apache e do PHP (por exemplo, quantidade de processos ou threads disponíveis).

---

## Participantes

- Hugo Gabriel Sales Soares

---

## Conclusão

Este projeto permitiu a análise comparativa do comportamento de dois servidores sob condições de operações demoradas e erros de runtime. Observou-se que o **Node.js/Express** lida de forma não bloqueante com requisições concorrentes, e, no ambiente testado, o **Apache/PHP** também não apresentou bloqueios nas requisições, mesmo durante operações demoradas ou após a ocorrência de erros. Esses resultados evidenciam a importância de entender as configurações e limitações de cada ambiente na prática.
