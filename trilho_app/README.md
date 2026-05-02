# PUC Trilho - Quiosque Geológico de Alta Fidelidade

Aplicação interativa de alta fidelidade desenvolvida em React + Vite, em formato Kiosk Vertical (1080x1920), para o Museu de Ciências e Tecnologia da PUC Minas. O projeto exibe a cronologia da Terra através de 8 períodos geológicos, integrando navegação física e visual cinematográfico.

## 🚀 Funcionalidades
- **Navegação Física**: Sincronização em tempo real com hardware de Rotary Encoder sobre um trilho mecânico.
- **8 Períodos Geológicos**: Do Arqueano ao Permiano, com transições fluidas e conteúdos profundos de biodiversidade.
- **Animações Cinematográficas**: Transições laterais ("swipe") simultâneas e revelação sequencial de textos (`Typewriter`) via Framer Motion.
- **Ferramentas Administrativas**: Assistente de calibração do trilho (Wizard) e Editor de Design integrado para ajustes em tempo real.

## 🛠️ Instalação e Execução

### Requisitos:
- Node.js (v18+)
- NPM

### Passos:
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🎮 Controles e Atalhos

### Navegação de Teste:
- **Teclas 1 a 8**: Salto direto para a Home de cada período geológico.
- **Setas Direita/Esquerda**: Navegação sequencial entre slides.

### Administração e Calibração:
- **Tecla 'W'**: Abre o **RailWizard** (Calibração física dos limites do encoder para cada zona).
- **Tecla 'E'**: Abre o **DesignEditor** (Ajustes de cores, escalas, posições e opacidades sem mexer no código).

## 🏗️ Estrutura Técnica
- **Frontend**: React 18, Vite.
- **Animações**: Framer Motion (uso de `AnimatePresence` com `popLayout`).
- **Roteamento**: Baseado em Hash dinâmico (`#periodo-sessao-index`).
- **Assets**: Vídeos 4K otimizados e ilustrações PNG/SVG espelhadas do design original da PUC.

---
*Documentação detalhada disponível em [DOCUMENTATION.md](./DOCUMENTATION.md)*
