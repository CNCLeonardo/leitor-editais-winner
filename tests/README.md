# Regressões do Leitor

Execute `node tests/regression.mjs` depois de alterar `index.html`.

Os casos usam dados inteiramente fictícios para simular problemas já discutidos. O
programa executa a função de extração real da página e compara os campos e
itens esperados. Não inclui PDFs, planilhas internas nem dados do Winner.

Este primeiro teste cobre as regras de interpretação após a extração do texto.
Ele ainda não verifica a leitura visual do PDF, o OCR nem a importação real
de XLSX/ZIP. Um resultado verde não substitui a conferência desses estágios.

Para acrescentar casos, adicione uma entrada em `cases.json` com `pages` (um
texto por página), um catálogo mínimo (`medicamento`, `concentracao`,
`apresentacao`) e os campos confirmados em `expected`. `rows` é opcional e
simula as linhas já lidas de uma planilha de itens. A saída lista apenas as
divergências por caso e campo.
