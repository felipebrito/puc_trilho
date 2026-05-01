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
