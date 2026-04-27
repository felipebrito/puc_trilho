# Changelog

## [Unreleased] - 2026-04-27

### Trilho Kiosk App
- **Features & Infraestrutura**:
    - Implementação de navegação robusta via rotas URL Hash (`/#periodo-sessao-id`), facilitando edição e preview de telas específicas.
    - Implementação da ferramenta `DesignEditor` como overlay: permite injeção dinâmica de variáveis CSS sobre uma imagem de referência, com suporte de exportação para código.
    - Script e ambiente criados para exportar referências originais em PDF como uma galeria de imagens para uso no overlay.
- **Telas e Conteúdo**:
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
