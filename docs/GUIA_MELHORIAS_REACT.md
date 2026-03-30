# Guia Das Melhorias Em React

Este arquivo explica, de forma simples, as melhorias aplicadas no projeto para que voce entenda o motivo de cada uma e consiga repetir a ideia em outros projetos.

## 📌 Objetivo Das Melhorias

Antes, o projeto funcionava, mas tinha alguns pontos que dificultavam evolucao e manutencao:

- a logica de negocio ficava misturada com a interface
- o componente fazia muitas coisas ao mesmo tempo
- nao havia feedback claro durante a consulta
- o campo de valor aceitava entrada sem tratamento visual
- a chamada da API estava acoplada diretamente ao componente

As melhorias buscaram resolver isso sem quebrar o comportamento existente.

## 🧠 Visao Geral Da Arquitetura

Hoje o fluxo esta dividido assim:

- View: mostra a interface
- ViewModel: prepara os dados e controla o fluxo da tela
- Service: fala com a API externa

Em termos práticos:

- [src/Component/Conversor.js](../src/Component/Conversor.js) = interface do card
- [src/Component/useConversorViewModel.js](../src/Component/useConversorViewModel.js) = regras da tela
- [src/services/exchangeRateService.js](../src/services/exchangeRateService.js) = acesso a API

Isso segue uma ideia parecida com MVVM:

- Model/Service: busca e entrega dados
- ViewModel: organiza estados e acoes da tela
- View: apenas renderiza o que recebeu

## 🔍 O Que Foi Melhorado

### 1. Separacao De Responsabilidades

Antes, o componente `Conversor`:

- controlava o input
- chamava a API
- tratava erro
- formatava valor
- atualizava horario
- renderizava a interface

Isso deixava o componente mais dificil de ler e reaproveitar.

Agora:

- a interface ficou no componente
- a logica ficou no hook
- a API ficou em um service separado

### ✅ Beneficio

Fica mais facil:

- entender o codigo
- testar partes separadas
- trocar a API depois
- reutilizar a mesma logica em outra tela

## 🪝 2. Hook Customizado Como ViewModel

Arquivo:

- [src/Component/useConversorViewModel.js](../src/Component/useConversorViewModel.js)

Esse hook virou o “cerebro” do card.

Ele cuida de:

- valor digitado
- valor convertido
- ultima atualizacao
- status da consulta
- loading do card
- formatacao de entrada
- acao de converter

### 💡 Ideia importante

Um hook customizado e util quando voce percebe que um componente esta ficando muito inteligente e pouco visual.

Se a logica comeca a crescer, mover para um hook costuma deixar tudo mais claro.

### Exemplo mental

- componente = o que aparece na tela
- hook = como a tela pensa

## 🌐 3. Service Para Acesso A API

Arquivo:

- [src/services/exchangeRateService.js](../src/services/exchangeRateService.js)

Criamos um service com a funcao `fetchExchangeRate`.

Ela faz uma unica responsabilidade:

- buscar a cotacao na API
- validar se a resposta tem uma taxa numerica valida

### ✅ Beneficio

Em vez de espalhar `fetch(...)` dentro dos componentes, voce centraliza o acesso externo em um ponto.

Isso ajuda quando voce quiser:

- mudar a URL da API
- adicionar cache
- tratar autenticacao
- fazer logs
- reaproveitar a mesma consulta em outros lugares

### Regra pratica

Se o codigo fala com internet, backend ou localStorage, vale pensar em extrair isso da View.

## 💸 4. Mascara Monetaria No Input

O campo agora formata automaticamente o valor digitado.

Exemplo:

- usuario digita `1234.5`
- a tela mostra `1.234,50`

### Por que isso ajuda?

- melhora a experiencia do usuario
- deixa o valor mais facil de ler
- aproxima a interface do formato financeiro usado no Brasil

### Como foi feito?

No hook foram criadas funcoes para:

- limpar caracteres invalidos
- separar parte inteira e decimal
- aplicar pontuacao brasileira
- converter o valor mascarado de volta para numero

As funcoes sao:

- `formatCurrencyInput`
- `parseCurrencyInput`

### ✅ Beneficio

Separar “valor visual” de “valor numerico” e uma habilidade importante em React.

Em muitos formularios, o usuario ve um formato bonito, mas a regra de negocio precisa de um numero limpo para calcular.

## 🕒 5. Painel De Ultima Atualizacao

Cada card agora mostra quando foi atualizado.

Exemplo:

- `30/03/2026 as 14:35`

### Por que isso e util?

Em interfaces bancarias ou financeiras, o usuario precisa sentir que a informacao esta viva e recente.

Esse detalhe melhora:

- confianca
- contexto
- sensacao de sistema real

### ✅ Beneficio arquitetural

Esse dado esta no ViewModel, nao espalhado pela View.

Isso significa que:

- a regra de quando atualizar continua centralizada
- a View apenas mostra a informacao

## ⏳ 6. Loading Por Card

Antes, o usuario clicava no botao e nao via claramente o estado da consulta daquele card.

Agora, cada card controla seu proprio loading:

- o botao muda para `Consultando...`
- o botao fica desabilitado
- o card informa o status da consulta

### ✅ Beneficio

Isso melhora a UX porque o usuario entende que:

- a acao foi iniciada
- aquela consulta esta em andamento
- nao precisa clicar varias vezes

### 💡 Licao importante

Estados de loading pequenos e locais costumam ser melhores do que um loading global para tudo.

Se cada card funciona de forma independente, cada card pode ter seu proprio estado.

## 🧪 7. Testes Mantidos E Expandidos

Arquivo:

- [src/Component/Conversor.test.js](../src/Component/Conversor.test.js)

Os testes nao foram ignorados durante a refatoracao. Pelo contrario: eles foram usados para garantir seguranca.

Hoje os testes validam:

- conversao com resposta valida
- comportamento com input vazio
- comportamento em caso de erro
- mascara monetaria
- exibicao da ultima atualizacao
- loading durante a consulta

### ✅ Beneficio

Quando voce refatora com testes, voce ganha confianca para melhorar a arquitetura sem medo de quebrar tudo.

## ⚠️ Anti-Patterns Evitados

Esses sao problemas comuns que foram reduzidos:

- componente grande demais
- logica de rede dentro da View
- mistura de renderizacao com regra de negocio
- falta de feedback visual durante a consulta
- pouca clareza sobre o papel de cada arquivo

## 🧱 Como Repetir Esse Padrao Em Outros Projetos

Se voce quiser aplicar essa mesma ideia em outro projeto React, use este passo a passo:

### 1. Identifique um componente sobrecarregado

Sinais comuns:

- usa muitos estados
- tem muito `fetch`
- faz muita formatacao
- possui muitos `if/else`
- esta dificil de ler

### 2. Extraia a logica para um hook

Pergunte:

- quais estados esse componente controla?
- quais acoes ele executa?
- quais dados sao preparados antes de renderizar?

Coloque isso em um hook customizado.

### 3. Extraia acessos externos para services

Tudo que conversa com fora da tela pode virar service:

- API
- localStorage
- sessionStorage
- analytics
- websocket

### 4. Deixe a View mais burra

A View deve focar em:

- mostrar dados
- chamar callbacks
- renderizar estados

Quanto menos regra a View tiver, melhor.

### 5. Proteja a mudanca com testes

Teste principalmente:

- o fluxo principal
- os estados de erro
- os estados de loading
- a formatacao visivel ao usuario

## 📝 Resumo Simples

### Antes

- um componente fazia tudo
- a API estava acoplada na interface
- a tela tinha menos feedback

### Depois

- componente mais limpo
- hook com a logica da tela
- service com a chamada externa
- input mascarado
- status de consulta por card
- data e hora da ultima atualizacao
- testes cobrindo os comportamentos novos

## 🚀 O Principal Aprendizado

Em React, crescer um projeto nao significa criar componentes gigantes.

O ideal e dividir bem as responsabilidades:

- interface em componentes
- fluxo e estado em hooks
- integracoes externas em services

Se voce lembrar dessa ideia, ja vai conseguir construir interfaces mais organizadas e mais faceis de manter.

## ✅ Checklist Para Usar Em Outro Projeto

- meu componente esta fazendo mais de uma responsabilidade?
- existe logica de negocio misturada no JSX?
- existe chamada externa dentro da View?
- o usuario recebe feedback de loading e erro?
- os testes cobrem o comportamento visivel?
- eu conseguiria reaproveitar essa logica em outro componente?

Se varias respostas forem “sim”, provavelmente vale aplicar o mesmo tipo de refatoracao.