# Leitor de Editais para Winner

Ferramenta web para extrair e organizar informações de editais, avisos de dispensa e termos de referência antes do cadastro no Winner.

## Recursos

- upload ou arraste de PDF, planilha XLSX/XLS ou pacote ZIP;
- leitura do documento diretamente no navegador;
- catálogo de medicamentos carregado localmente pelo usuário;
- filtragem para manter apenas as formulações manipuladas;
- conferência de apresentação e concentração quando disponíveis;
- identificação dos principais campos do Winner;
- página de origem e nível de confiança;
- alertas para informações que exigem conferência;
- campos editáveis e botões para copiar;
- nenhuma informação ausente é inventada.

## Como usar

1. Abra a página da ferramenta.
2. Em **Catálogo de manipulados**, carregue a planilha com as colunas Medicamento, Apresentação, Concentração e Validade.
3. O catálogo será lembrado somente neste navegador.
4. Anexe o edital e seus anexos. O leitor também tenta aplicar OCR às páginas digitalizadas.
5. Clique em **Analisar edital**.
6. Confira os campos marcados como **Conferir**.
7. Copie os valores para o Winner.

## Privacidade

O catálogo e o PDF são processados localmente no navegador. A planilha de formulações não é incorporada ao repositório público nem enviada ao GitHub.

## Conferência automática

Execute `node tests/regression.mjs` para repetir os casos de regressão. O
GitHub Actions executa o mesmo comando após alterações em `index.html` ou nos
testes. Os cenários simulam texto e linhas de planilha que já foram extraídos;
os PDFs originais e o catálogo interno não ficam neste repositório público.
Consulte [tests/README.md](tests/README.md) para o alcance do teste.

## Limitação atual

OCR e planilhas dependem da legibilidade e da estrutura dos arquivos. Sempre
confira a página indicada, a quantidade, o preço e as restrições de
participação antes de cadastrar uma proposta.
