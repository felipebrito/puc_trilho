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
    - **Diagnóstico do Timer**: Implementados logs de alta visibilidade no console para monitorar a contagem regressiva e garantir que o tempo de 5 minutos seja respeitado fielmente.
    - **Visibilidade Inteligente**: Revertido o estado inicial do Design Editor para escondido, mantendo a interface limpa.
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
