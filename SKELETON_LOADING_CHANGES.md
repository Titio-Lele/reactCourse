# Skeleton Loading - Alteracoes Implementadas

## Objetivo
Adicionar modo de carregamento com skeleton para melhorar a experiencia inicial da pagina enquanto os componentes finais sao exibidos.

## Alteracoes

### 1) App com estado de carregamento inicial
- Arquivo: [src/App.js](src/App.js)
- Mudanca: adicionado `isLoading` com `useState` e `useEffect`, usando um delay curto de 600ms antes de exibir os conversores reais.
- Motivo: criar uma fase de transicao visual no primeiro carregamento, reduzindo sensacao de pagina "vazia".

### 2) Componente de placeholder (skeleton)
- Arquivo: [src/App.js](src/App.js)
- Mudanca: criado `ConversorSkeleton` e renderizacao de 6 placeholders (2 por linha) enquanto `isLoading` estiver ativo.
- Motivo: manter consistencia visual com o layout final e sinalizar carregamento de forma clara para o usuario.

### 3) Estrutura de pares de moedas centralizada
- Arquivo: [src/App.js](src/App.js)
- Mudanca: adicionado array `PAIRS` para mapear pares de moedas.
- Motivo: reduzir repeticao e facilitar manutencao/escala dos conversores.

### 4) Estilos e animacao de skeleton
- Arquivo: [src/App.css](src/App.css)
- Mudanca: adicionadas classes `.conversor-skeleton`, `.skeleton-line` e variacoes de tamanho, com `@keyframes skeleton-loading`.
- Motivo: criar feedback visual moderno e compreensivel durante o estado de loading.

### 5) Testes atualizados para o novo fluxo
- Arquivo: [src/App.test.js](src/App.test.js)
- Mudanca: adicionado teste para verificar skeleton inicial e ajuste do teste de pares para apos o loading usando fake timers.
- Motivo: garantir comportamento deterministico e evitar regressao no fluxo de carregamento.

## Resultado esperado
- Inicio da pagina com placeholders visuais.
- Transicao para os conversores reais apos o periodo de loading.
- Cobertura de testes alinhada ao novo comportamento de UI.
