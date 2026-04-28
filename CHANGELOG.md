# Changelog

## [Unreleased] - 2026-04-27

### Trilho Kiosk App

- **Correção: Flash preto na transição Home → Biodiversidade**
    - **Diagnóstico**: A transição da tela `HomeOrdovician` para `SectionIntro` (biodiversidade) apresentava um flash preto e engasgava ao carregar. O problema não era ordem de execução nem animação CSS, mas sim o ciclo de vida de decode de imagens do browser.
    - **Causa raiz**: O browser distingue *download* de *decode*. A home carregava sem problemas porque a imagem de fundo (`home_bg.png`) era decodificada no primeiro render do app, antes de qualquer interação. As demais telas (biodiversidade, extinção, etc.) só tinham suas imagens requisitadas no momento da transição — tarde demais para o browser decodificar antes da primeira pintura, resultando em um frame preto visível.
    - **Tentativas descartadas**:
        - `new Image().src = ...` (preload via JS): apenas baixa o arquivo, não garante decode. Não resolveu.
        - Aumento do `initialDelay` do componente `Typewriter`: atacava sintoma errado (re-renders), não a causa.
    - **Solução aplicada** (`App.jsx`): Adicionado um bloco de `<img>` invisível no DOM para **todos os slides** que possuem imagem de fundo (`videoSrc`, `bgImage`, `imageSrc`). Por serem elementos reais no DOM (mesmo com `opacity: 0`, `width: 0`, `overflow: hidden`), o browser realiza o decode completo durante o tempo ocioso (idle), e quando a transição começar a imagem já está pronta para pintar instantaneamente — o mesmo comportamento que a home já tinha por padrão.

- **Correção: `HomeOrdovician` ausente no roteador de componentes** (`App.jsx`)
    - O tipo `home_ordoviciano` não estava mapeado no switch de renderização de `App.jsx`, fazendo com que a tela home do Ordoviciano não renderizasse componente algum.
    - Adicionado o import de `HomeOrdovician` e o caso `else if (type === 'home_ordoviciano')` no roteador.

- **Correção: prop `viewKey` → `viewId` no `DesignEditor`** (`App.jsx`)
    - O componente `DesignEditor` recebia a prop com nome errado (`viewKey`), que foi corrigido para `viewId`, alinhando ao contrato da interface do componente.

- **Correção: remoção da classe `animate-fade-in` de todas as views**
    - A classe `animate-fade-in` aplicada manualmente nos elementos raiz dos componentes conflitava com as animações de transição gerenciadas pelo `framer-motion` via `AnimatePresence` em `App.jsx`, causando dupla animação de entrada.
    - Removida de todos os componentes de view: `Home`, `HomeOrdovician`, `HomeDevonian`, `HomePermian`, `SectionIntro`, `SpecimenDetail`, `DoubleSpecimenDetail`, `EventHeader`, `EventDetail`, `ExtinctionContent`, `ExtinctionContentDevonian`, `SilurianGlobe`, `SilurianSpecimen`, `SilurianDoubleSpecimen`, `DevonianExtinctionEnvironments`.

- **Features & Infraestrutura** (sessão anterior):
    - Implementação de navegação robusta via rotas URL Hash (`/#periodo-sessao-id`), facilitando edição e preview de telas específicas.
    - Implementação da ferramenta `DesignEditor` como overlay: permite injeção dinâmica de variáveis CSS sobre uma imagem de referência, com suporte de exportação para código.
    - Script e ambiente criados para exportar referências originais em PDF como uma galeria de imagens para uso no overlay.
- **Telas e Conteúdo** (sessão anterior):
    - **Devoniano (Home)**:
        - Troca do background genérico pelo arquivo definitivo (`devoniano_home_bg.png`).
        - Inclusão dos textos finais e alinhamento visual preciso utilizando o `DesignEditor`.
        - Substituição do comportamento dos botões do menu inferior por recortes de imagem nativos (`botaoOFF.png`) correspondendo ao design de estado ativo.
## [Unreleased] - 2026-02-10

### Booth App
-   **Stability Fixes**:
    -   Fixed "stuck at 3" countdown issue by using explicit `timerRef` management.
    -   Replaced fragile boolean cooldown with robust timestamp-based check (`cooldownTimeRef`) to prevent race conditions.
    -   Persisted `Webcam` component to avoid camera re-initialization delays between photos.
-   **Resource Optimization**:
    -   Implemented "Deadlock Prevention": Paused `face-api` detection loop while `background-removal` is running to prevent GPU/CPU resource contention.
    -   Added "Resource Protection": Disabled "Tirar Foto" button and blocked `startCapture` calls while background processing is active.
-   **UI/UX Improvements**:
    -   Added `GooeyLoader` component for engaging visual feedback during processing.
    -   Implemented full-screen "Processing" overlay:
        -   Hides camera video and controls during upload/processing.
        -   Displays `GooeyLoader` and a "Processando..." message.
        -   Prevents user interaction until processing is complete.
    -   Added non-blocking "Success" overlay.
    -   Improved face feedback messages ("Aproxime-se", "Centralize", "Sorria").
-   **Features**:
    -   Integrated `face-api.js` for smart face detection and V-shape jawline cropping.
    -   Integrated `@imgly/background-removal` for client-side background removal.
    -   Implemented V-shape mask logic to include neck but exclude shoulders.

### General
-   Initialized Unity project structure (`Unity/Gigantes`).
-   Updated project documentation and task tracking.
