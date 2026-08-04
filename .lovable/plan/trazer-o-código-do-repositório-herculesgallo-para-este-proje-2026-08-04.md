# Trazer o código do repositório herculesgallo para este projeto

O repositório `fabiozamboni-tech/herculesgallo` não responde publicamente (retorna "não encontrado"), o que indica que ele é **privado**. Para ler os arquivos dele preciso de autorização sua no GitHub.

## Como vai funcionar

1. **Autorizar o GitHub** — abro um card de conexão no chat; você aprova com sua conta GitHub (escopo de leitura de repositórios privados).
2. **Listar o conteúdo do repositório** — leio a árvore de arquivos do branch principal para entender o que existe (páginas, componentes, estilos, imagens).
3. **Mostrar um resumo para você** — tipo de projeto, stack usada e o que faz sentido trazer.
4. **Você escolhe o que importar** — o projeto inteiro ou apenas partes (uma página, um componente, imagens).
5. **Adaptar e importar** — copio os arquivos escolhidos para este projeto, ajustando para a stack daqui (React + TanStack Router + Tailwind) e para o design chocolate/creme já existente.

## Pontos importantes

- Este projeto (Que Brigadeiro) já tem páginas próprias. Se o repositório for outro site completo, a importação vai **sobrescrever ou conviver** com o que já existe — vou perguntar antes de mexer no que já está pronto.
- Se o repositório usar outra tecnologia (Next.js, Vue, HTML puro, WordPress), não dá para copiar arquivo por arquivo: eu recrio as telas equivalentes na stack daqui, preservando textos, imagens e layout.
- Se preferir não conectar o GitHub, a alternativa é você tornar o repositório público temporariamente, ou colar os arquivos direto no chat.

## Detalhes técnicos

- Conexão via connector GitHub (OAuth) do Lovable; chamadas à API pelo gateway (`repos/{owner}/{repo}/git/trees/{branch}?recursive=1` e `repos/{owner}/{repo}/contents/{path}`).
- Arquivos binários (imagens) chegam em base64 e são gravados em `src/assets/`.
- Nenhum token fica no código do app; a leitura acontece durante o desenvolvimento.
