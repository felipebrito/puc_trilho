# Changelog - PUC Trilho [2026-05-21]

## 📏 Versão: Alinhamento das Fronteiras de Calibração e Indicação Visual
- **Alinhamento dos Marcadores Visuais (`zone.end`)**:
    - **Fronteira Calibrada Corrigida**: Posicionados os marcadores de seção na trilha visual do `RailWizard` em suas respectivas posições de fim (`zone.end`) em vez das posições iniciais (`zone.start`). 
    - **Correspondência Correta de Seções**: Desta forma, o limite no valor `634` é corretamente identificado com o rótulo "1" (fim da Seção 1) e o limite no valor `1245` com o rótulo "2" (fim da Seção 2), eliminando a incongruência em que o marcador "2" era desenhado na fronteira da Seção 1.
    - **Indicação sem Valor Falso no Zero**: Evitou a plotagem redundante do ponto "1" no valor `0` (onde o trilho encosta na tela), preservando o sentido lógico da calibração onde apenas as fronteiras entre as seções são ajustáveis.
- **Simplificação e Blindagem da Calibração**:
    - **Início Fixo no Zero**: O início da Seção 1 foi permanentemente travado em `0` e os controles deslizantes/manuais de entrada de início da Seção 1 foram desativados e simplificados para exibição de leitura fixa, uma vez que o totem sempre encosta fisicamente no monitor ao alcançar o valor `0`.
    - **Remoção de Controles Redundantes**: Removido o botão "Marcar Início Aqui" da Seção 1, unificando todo o fluxo de calibração em botões simples e intuitivos de "Marcar Fim Aqui".

## 📏 Versão: Ajuste de Range do Primeiro Período (Arqueano) e Calibração Fina
- **Ajuste do Início e Fim do Range do Primeiro Período (Arqueano)**:
    - **Fronteira Física Corrigida**: Configurado o primeiro período (Arqueano, Seção 1) para cobrir o intervalo de `0` a `634`. Isso alinha perfeitamente a leitura física do encoder, onde a posição de repouso (`0` a `634`) encostada na tela representa o primeiro período geológico.
    - **Próximo Período Iniciando em 635**: O segundo período (Proterozoico) agora começa automaticamente em `635` (Fim do Arqueano + 1), permitindo que a contagem e as transições subsequentes de 610 mm (ou conforme calibrado dinamicamente) funcionem em cascata perfeitamente.
    - **Clamping de Segurança Sub-zero**: Implementada lógica resiliente no `App.jsx` e `RailWizard.jsx` para direcionar posições negativas ou abaixo do início configurado (ex: devido a pequenos ruídos ou ajustes mecânicos de encostar na tela) diretamente para o primeiro período (Arqueano), evitando crashes ou estados indefinidos ("FORA").
    - **Botão Restaurar Padrões**: Adicionado um botão "Restaurar Padrões" no painel do `RailWizard`, com uma coloração vermelha e micro-animação premium, permitindo aos técnicos restaurar as configurações do trilho diretamente a partir do arquivo padrão `rail_settings.json` fresco do servidor, limpando com segurança o `localStorage` do quiosque em caso de desalinhamento severo.

## 🎛️ Versão: Calibração de Trilho Dinâmica e Persistência Resiliente
- **Estabilização e Refinamento do Calibrador de Trilho**:
    - **Fronteiras Exclusivas Sem Sobreposição (+1)**: Corrigido o cálculo de encadeamento das zonas do trilho. Agora, o início de cada zona é automaticamente definido como `Fim da zona anterior + 1` (ex: Zona 1 terminando em 610 e Zona 2 começando em 611). Isso impede que a mesma posição de leitura do encoder (como 610) dispare duas zonas ao mesmo tempo, resolvendo conflitos de transição.
    - **Menu Seletor de Períodos (Selectable)**: Adicionado um elemento `<select>` premium em cada seção do editor que permite vincular dinamicamente qualquer seção física do trilho a um período geológico (Arqueano, Siluriano, Permiano, etc.). A aplicação agora analisa o nome da zona de forma dinâmica e normalizada para redirecionar o quiosque para a tela correta.
    - **Interface Não-Sobreposta em Grade/Flow**: Removido o posicionamento absoluto vertical (`style={{ top: ... }}`) dos cards no editor de zonas. Agora, eles fluem em uma lista vertical rolável (`overflow-y: auto`), garantindo que não haja sobreposição visual e permitindo fácil manuseio pelo usuário.
    - **Calibração com Clique Rápido ("Marcar Fim Aqui")**: Adicionado botão de calibração automática ("Marcar Fim Aqui") em cada seção. Ao mover o totem fisicamente e clicar no botão, a posição atual do encoder é instantaneamente definida como o limite final da seção, recalibrando todo o trilho em segundos.
    - **Estabilização da Posição dos Períodos (Trilho)**:
        - Corrigido o bug de stale closures nos hooks do `App.jsx` que ignoravam as atualizações das zonas do trilho até que a página fosse atualizada manualmente. Adicionado o estado `railSettings` às dependências dos efeitos de transição de período e de atalhos de teclado.
        - Implementado gerenciamento de estado dinâmico (`railSettings` como React state) inicializado a partir do `localStorage` com fallback para as configurações iniciais (`rail_settings.json`).
        - Atualizado o componente `RailWizard.jsx` para receber `railSettings` e `onSaveSettings` como props e sincronizar adequadamente seu estado interno ao ser aberto.
        - Implementada persistência dupla (Double Persistence): salva com sucesso no backend do servidor via endpoint `/api/save-rail` e no browser (`localStorage`) para garantir a resiliência em deploys do Vercel e produção sem falhas de escrita de arquivos.

## 🖱️ Versão: Exibição Dinâmica do Cursor no Design Editor
- **Exibição Dinâmica do Cursor**:
    - Implementada lógica no `DesignEditor.jsx` para injetar a classe `show-cursor-editor` no elemento raiz (`document.documentElement`) ao abrir o Design Editor (Tecla 'E').
    - Atualizado o arquivo `App.css` para aplicar `cursor: auto !important` quando a classe do editor estiver ativa, permitindo a exibição do cursor e facilitando o uso do mouse e dos sliders de calibração no quiosque.

## 🛠️ Versão: Sincronização de Ativos Estáticos e Resolução de Mídia
- **Sincronização de Ativos no Repositório**:
    - Sincronizados todos os ativos estáticos de `trilho_app/public/assets/` para a pasta de ativos raiz `public/assets/`.
    - Isso inclui os ícones de instrução (`a1.svg`, `b1.svg`, `c1.svg`, `c2.svg`) e imagens relacionadas, corrigindo a falha de renderização do componente de inatividade "Gire o botão" / "Pressione" nos servidores de produção e deploy (ex: Vercel/GitHub Pages).
    - Copiados todos os vídeos de períodos geológicos (`videos/01_Arqueano_0204.mp4`, etc.) e subpastas de biodiversidade para o diretório raiz de ativos.

## 🖼️ Versão: Atualização de Ativos Visuais (Imagens)
- **Atualização de Imagens**:
    - **Devoniano**: Atualizada a imagem do espécime *Ctenacanthus* (`img_ctenacanthus.png`).
    - **Ordoviciano**: Atualizada a imagem de fundo da introdução da extinção (`extincao_intro_bg.png`).
    - **Permiano**:
        - Atualizada a imagem do espécime *Benthosuchus* (`benthosuchus.png`).
        - Atualizada a imagem de fundo da extinção (`extincao_bg.png`).
        - Atualizada a imagem de fundo da pós-extinção (`pos_extincao_bg.png`).
        - Atualizada a imagem de fundo do menu pós-extinção ("03 e depois") (`pg55 BG.png`).

# Changelog - PUC Trilho [2026-05-20]

## 🛠️ Versão: Rigor Científico e Nomenclatura Biológica
- **Padronização do 'sp.'**:
    - Implementado `formatSpecies.jsx`, um utilitário inteligente que detecta a abreviação "sp." e remove o itálico (aplicando `font-style: normal`), preservando o itálico do nome do gênero (*ex: Homotelus* sp.).
    - Injetado em todos os componentes de texto, incluindo o componente animado `Typewriter.jsx` e os layouts das telas do Siluriano (`SilurianSpecimen` e `SilurianDoubleSpecimen`).
- **Nomes Binominais**: 
    - Removido o sufixo incorreto "sp." de todas as espécies que já possuíam nome binominal completo (gênero + epíteto específico), respeitando a regra taxonômica (*Arctotypus sylvaensis*, *Archosaurus rossicus*, *Dvinia prima*, *Palaeoisopus problematicus*, etc.).
- **Unidades de Medida**:
    - Realizada auditoria no banco de dados (`slides.js`) para padronizar todas as métricas de tamanho e comprimento.
    - Adicionado espaçamento obrigatório antes das unidades (ex: de `30cm` para `30 cm`, de `1m` para `1 m`).
    - Substituição de pontos por vírgulas nas medidas decimais (ex: `2.5m` para `2,5 m`).

# Changelog - PUC Trilho [2026-05-13]

## 🛠️ Versão: Estabilização do Design Editor e Inteligência de Repouso
- **Inteligência de Inatividade**: 
    - Reformulada a lógica de repouso no `App.jsx` para diferenciar "ações do sistema" de "interações do usuário", garantindo que as instruções não sumam durante a navegação automática.
    - Implementado **Filtro de Ruído** para o hardware: o timer só é resetado se o totem se mover mais de 1 unidade, evitando que vibrações impeçam o repouso.
    - Adicionadas instruções completas ao `RailIdleOverlay` (Mover + Pressionar), mantendo consistência visual com os menus.
    - Ajustado o tempo padrão de inatividade para **60 segundos**.
    - Implementados logs de diagnóstico detalhados para monitorar o ciclo de vida do timer e atividade de hardware.
- **Design Editor Robusto**: 
    - Implementada lógica de salvamento baseada em `useRef` para garantir persistência atômica dos dados.
    - Adicionado atalho global **Ctrl+S / Cmd+S**.
    - **Sincronização de IDs**: Padronizada a nomenclatura de rotas e configurações para o formato `periodo-secao-id` (ex: `devoniano-pos_extincao-globe`), eliminando falhas de mapeamento.
    - **Injetor de Estilos Híbrido**: O motor de injeção no `App.jsx` agora suporta tanto o formato legado (camelCase) quanto o novo formato de variáveis CSS diretas, preservando calibrações antigas.
    - **Resiliência de Crash**: Adicionado tratamento de erros no editor para evitar falhas fatais em páginas sem configuração mapeada (ex: transição para o Cambriano).
    - **Persistência de Hardware**: O tempo de inatividade configurado no Menu C agora é salvo no `localStorage`, impedindo resets indesejados.
    - **Diagnóstico do Timer**: Implementados logs de alta visibilidade no console para monitorar a contagem regressiva.
    - **Interface de Repouso Contextual**: O `RailIdleOverlay` agora oculta automaticamente as instruções de botões (B1/C1) em telas sem menus interativos, evitando confusão visual.
    - **Infraestrutura Vercel**: Configurado `vercel.json` na raiz para corrigir o roteamento do build e eliminar o erro 404 no deploy.
    - **Visibilidade Inteligente**: Revertido o estado inicial do Design Editor para escondido.
- **Expansão de Calibração**: 
    - Ativado suporte total de edição para **todos os espécimes do Carbonífero** (Stethacanthus, Arthropleura, Amphibamus, etc.) e **Biodiversidade do Permiano**.
    - Mapeadas as pontes de variáveis CSS no `SpecimenDetail.css` para garantir que o editor atue em tempo real em todas as novas telas.
- **Renderização e Conteúdo**: 
    - Alterado `object-fit` para `contain` em todos os espécimes para evitar cortes de imagem (crop).
    - Renomeada espécie *Atrypa* para *Favosites* em todo o ecossistema do app.
    - Corrigidos textos da 1ª Extinção em Massa.

# Changelog - PUC Trilho [2026-05-02]

## 🛠️ Versão: Finalização dos Sobreviventes e Ajustes de Navegação
- **Padronização Visual**: Removido o uso de imagens para títulos nos sobreviventes do Permiano (*Benthosuchus*, *Lystrosaurus*, etc.), restaurando o uso de texto com efeito `Typewriter` para consistência com o restante do projeto.
- **Navegação Física**: Invertida a orientação das transições (Esquerda/Direita) para alinhar o movimento do conteúdo na tela com o deslocamento físico do totem sobre o trilho.
- **Design Editor**: 
    - Corrigido o mapeamento de variáveis para todos os sobreviventes (*Lystrosaurus*, *Thrinaxodon*, *Procolophon*, *Voltziopsis*), permitindo edição completa via editor.
    - Sincronizados os valores padrão do *Benthosuchus* com os do *Thrinaxodon* conforme referência validada.
- **Correções de Layout**: 
    - Restaurados estilos essenciais do título no `SpecimenDetail.css` após remoção acidental.
    - Corrigido o `white-mt` do *Benthosuchus* que estava empurrando o conteúdo para fora da área visível.
- **Sincronização de Dados**: 
    - Atualizados todos os caminhos de ativos para os sobreviventes do Permiano no `slides.js`.
    - Internalizados todos os ativos de todos os períodos (imagens de espécies, selos, introduções e referências de layout) para dentro da pasta `public/assets/`, eliminando totalmente a dependência do diretório externo `_conteudo`.
    - Removido o middleware de servidor do `vite.config.js` que servia arquivos externos, tornando o projeto 100% autônomo.
    - Organizadas as imagens de referência em subpastas por período (`ordoviciano/`, `devoniano/`, `permiano/`).
    - Renomeados arquivos para um padrão padronizado (lowercase, sem espaços ou prefixos de página).

# Changelog - PUC Trilho [2026-05-02]

## 🛠️ Versão: Refinamento da 3ª Extinção e Design Editor
- **Restauração de Layout**: Revertida a página da Extinção do Permiano para o padrão `SectionIntro` (fundo escuro com imagem dos vulcões), alinhando com a estética do Ordoviciano.
- **Sincronização de Dados**: Corrigido o mapeamento de IDs entre `slides.js` e `DesignEditor.jsx`, garantindo que o editor carregue as configurações automáticas para todas as seções do Permiano.
- **Tipografia**: Ajustado o CSS para forçar textos 100% brancos na introdução da extinção, conforme solicitado.
- **Evolução do Editor**: 
    - Aumentado o range negativo de posicionamento vertical para até **-1000px**, permitindo colocar títulos no topo absoluto da tela.
    - Corrigido o bug do **Body Size** que não estava sendo aplicado ao texto principal das introduções.
- **Conteúdo**: Atualizados os textos técnicos sobre atividade vulcânica e liberação de metano no Permiano.

# Changelog - PUC Trilho [2026-05-01]

## 🛠️ Versão: Otimização de Performance e Fidelidade (Permiano Final)

### 🚀 Novas Funcionalidades
- **Otimização de Ativos**: Realizado resize em massa de todos os ativos do Permiano (Backgrounds e Espécies). Redução drástica de ~300MB para ~25MB, eliminando travamentos causados por imagens de 10K (60MP).
- **Sincronização de Textos**: Realizada auditoria completa e sincronização dos textos da biodiversidade permiana (Archosaurus, Scutosaurus, Dvinia, Arctotypus, Dicynodon, Glossopteris e Phyllotheca) com as referências oficiais (págs 45-52).
- **Orquestração de Animações**: Implementado sistema de "Unified Animation Pulse" no `App.jsx`, sincronizando a transição de slide com a entrada escalonada (staggered) dos elementos internos.
- **Async Decoding**: Implementada decodificação assíncrona de imagens para garantir que a interface permaneça responsiva durante o carregamento de novos cenários.

### 🎨 Correções e Alinhamento
- **Fim do Stuttering**: Removidos filtros de `blur` das animações de Framer Motion, reduzindo significativamente a carga sobre a GPU.
- **Timeline de Entrada**: Adicionado delay de 0.6s em todos os conteúdos internos para garantir que os elementos surjam apenas após a "aterrissagem" do slide.
- **Correção de Stagger**: Restaurada a lógica de entrada sequencial dos itens (títulos, botões e labels) que estava corrompida.
- **Sanitização de Caminhos**: Implementado `encodeURI` em todos os componentes de mídia para suportar caminhos de arquivo com espaços ou caracteres especiais.

# Changelog - PUC Trilho [2026-05-01]

## 🛠️ Versão: Implementação Período Permiano (Menu)

### 🚀 Novas Funcionalidades
- **Módulo Permiano**: Finalizada a implementação da biodiversidade e iniciada a 3ª extinção em massa.
- **Biodiversidade Permiana**: Implementados os 7 espécimes com nomes corrigidos (Sentence Case), subtítulos oficiais e selos de extinção.
- **Design Editor**: Adicionado suporte total para os 7 espécimes e para o slide de introdução da extinção.
- **Ajuste Fino**: Mapeadas imagens de referência (páginas 44 a 54) e configuradas variáveis CSS individuais para cada slide.
- **Ativos**: Configurado symlink para `_conteudo` garantindo o carregamento correto de todas as imagens e vídeos do servidor.
- **3ª Extinção em Massa**: Implementado slide de introdução (`perm-ext-intro`) com título em azul seguindo o padrão do Ordoviciano.

### 🎨 Correções e Alinhamento
- **Efeito de Crop**: Implementado `clip-path` diagonal em todos os botões do menu para alinhar com o design high-fidelity.
- **Correção de pageKey**: Ajustada lógica de navegação no `App.jsx` para suportar múltiplos períodos com slides de "Home" distintos.
- **Blindagem de Textos**: Transcritos conteúdos oficiais sobre a 3ª Extinção em Massa e formação da Pangeia.

# Changelog - PUC Trilho [2026-04-27]

## 🛠️ Versão: Estabilidade JSON-First (Ponto Zero)

### 🚀 Novas Funcionalidades
- **Arquitetura de Dados**: Implementado o `design_settings.json` como banco de dados central para coordenadas de layout.
- **Injetor de Estilos Dynamico**: Criado `useEffect` no `App.jsx` que injeta variáveis CSS específicas por espécie (`--devonian-{id}-{prop}`) a cada troca de slide.
- **IDs de Navegação**: Atribuídos IDs persistentes (`intro`, `globe`, `dalmanites`, etc.) para garantir que as coordenadas fiquem atreladas ao conteúdo e não ao índice numérico.

### 🎨 Correções e Alinhamento
- **Finalização Homotelus sp.**: Coordenadas travadas e blindadas no JSON (Slide 1 Biodiversidade Ordoviciano).
- **Restauração do Editor**: Corrigidos erros de sincronização e mapeamento (viewId) que impediam o funcionamento dos sliders.
- **Limpeza de Transição**: Removida animação de sobreposição que causava "texto fantasma" durante a navegação.
- **Restauração Global**: Revertidas mudanças estruturais no `SpecimenDetail.css` que causavam regressões no Devoniano/Carbonífero.
- **Correção Meganeura**: Restaurado alinhamento original (96px Name MT) via injeção de dados estáveis.
- **Blindagem Dalmanites**: Aplicadas as coordenadas finais do chat (Box Top: 926px, TopText: 181px) via JSON.
- **Fix Globo Siluriano**: Corrigido header encavalado e texto sobreposto ao globo (-61px header adjustment).

### 🔒 Segurança de Código
- **Isolamento de Estilos**: Implementado padrão de variáveis CSS por ID, garantindo que alterações em uma página não impactem as outras.
- **Persistência**: Configurações do `DesignEditor` agora refletem o estado real do banco de dados JSON.
