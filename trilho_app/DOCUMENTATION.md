# Documentação Técnica - Quiosque Geológico PUC Trilho

## 1. Visão Geral
A aplicação "PUC Trilho" é um quiosque interativo de alta fidelidade desenvolvido para museus, projetado para exibir a cronologia geológica da Terra (8 períodos) através de uma navegação física sincronizada. O usuário interage movendo um totem sobre um trilho físico equipado com um rotary encoder, que mapeia a posição mecânica para slides específicos na aplicação web.

## 2. Arquitetura de Navegação
O sistema utiliza um modelo de navegação baseado em **Hash Routing**, onde a posição do encoder é convertida em coordenadas de slides.

### Atalhos de Calibração e Teste:
- **Teclas 1 a 8**: Pula instantaneamente para a "Home" de cada um dos 8 períodos geológicos.
- **Tecla 'W' (RailWizard)**: Abre o assistente de calibração para definir os limites físicos do trilho para cada período.
- **Tecla 'E' (DesignEditor)**: Abre o editor visual para ajustes finos de layout, opacidade e escala em tempo real.
- **Setas (L/R/U/D)**: Navegação manual de emergência.

## 3. Estrutura de Conteúdo (Os 8 Períodos)

### Períodos Transicionais (Apenas Vídeo)
Estes períodos não possuem menus de biodiversidade e servem como transições cinematográficas de tela cheia:
1. **Arqueano**
2. **Proterozoico**
3. **Cambriano**
4. **Siluriano**
5. **Carbonífero**

### Períodos de Imersão (Com Interação)
Estes períodos possuem menus de biodiversidade que surgem automaticamente ao parar o trilho:
6. **Ordoviciano**: Foco na primeira extinção em massa e invertebrados marinhos (*Homotelus*, *Cameroceras*).
7. **Devoniano**: Era dos peixes e primeiras florestas (*Dunkleosteus*, *Tiktaalik*).
8. **Permiano**: Grande extinção P-T e sobreviventes terrestres (*Pareiasaurus*, *Glossopteris*).

## 4. Componentes de Visualização (Views)
- **PeriodVideoView**: Loop de vídeo 4K com interface minimalista (apenas vídeo e menus).
- **HomePeriod**: Capa de entrada de um período complexo.
- **SectionIntro**: Transição temática (ex: Introdução à Extinção) com efeitos de blur e escala.
- **SpecimenDetail**: Detalhes de espécies com efeito de digitação sequencial (`Typewriter`) e selos informativos.
- **ExtinctionContent**: Infográficos científicos multicamadas com textos dinâmicos e ilustrações.

## 5. Requisitos Técnicos
- **Display**: 1080x1920 (Vertical).
- **Engine**: React + Vite + Framer Motion.
- **Assets**: Vídeos H.264/MP4 e imagens PNG/SVG internalizadas na pasta `public`.
- **Persistência**: Configurações de calibração salvas em `rail_settings.json` e `design_settings.json`.

---
*Desenvolvido para PUC Trilho - Maio 2026*
