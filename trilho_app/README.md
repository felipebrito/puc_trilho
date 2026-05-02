# 🌍 PUC Trilho: Uma Jornada pelo Tempo Geológico

### 🦖 O que é este projeto?
O **PUC Trilho** é uma experiência interativa de alta fidelidade criada para o **Museu de Ciências e Tecnologia da PUC Minas**. Imagine um monitor vertical de 1.90m instalado sobre um trilho mecânico. Conforme o visitante move o monitor (totem) fisicamente ao longo do trilho, a tela reage em tempo real, transportando o usuário por **4,5 bilhões de anos de história da Terra**.

Este repositório contém o software que dá vida a essa jornada, combinando tecnologia web moderna com controle de hardware físico.

---

## 🛰️ Como a experiência funciona?
A magia acontece através da integração entre o movimento físico e o visual digital:

1.  **O Trilho Físico**: Um sensor (Rotary Encoder) detecta a posição exata do totem no trilho.
2.  **A Reação Digital**: O software mapeia essa posição para slides específicos. Se você está no início do trilho, vê o nascimento da Terra; se move para o meio, entra na era dos peixes; se chega ao fim, testemunha as grandes extinções.
3.  **Visual Premium**: Desenvolvido para parecer um filme interativo, com transições suaves, efeitos de desfoque (blur) e textos que surgem conforme você "descobre" novas espécies.

---

## 🏛️ O que o visitante encontra na jornada?

A experiência é dividida em **8 grandes períodos geológicos**:

*   **As Eras Primitivas (Arqueano, Proterozoico, Cambriano)**: Vídeos imersivos que mostram a formação do planeta e os primeiros sinais de vida.
*   **O Mergulho Profundo (Ordoviciano e Devoniano)**: Menus interativos onde o visitante pode parar o trilho para conhecer criaturas como o *Dunkleosteus* (um peixe blindado gigante) ou o *Homotelus* (trilobita).
*   **O Grande Final (Permiano)**: O clímax da jornada que mostra a formação do supercontinente Pangeia e a maior extinção em massa da história do planeta.

---

## 🛠️ Ferramentas para Administradores e Museólogos

Para garantir que a experiência esteja sempre perfeita no museu, o sistema inclui ferramentas internas de ajuste:

*   **Configuração do Trilho (Tecla 'W')**: Um assistente visual (Wizard) que permite calibrar onde cada período começa e termina no trilho físico.
*   **Editor de Design (Tecla 'E')**: Permite que o museólogo altere o tamanho dos textos, a posição das imagens ou o brilho dos vídeos em tempo real, sem precisar de um programador.
*   **Atalhos Rápidos (Teclas 1 a 8)**: Permite saltar instantaneamente para qualquer período para fins de demonstração.

---

## 💻 Informações Técnicas (Para Desenvolvedores)

*   **Tecnologia**: Construído com **React 18** e **Vite** para máxima velocidade.
*   **Animações**: Utiliza a biblioteca **Framer Motion** para criar as transições suaves de "swipe" lateral.
*   **Hardware**: Preparado para receber sinais via porta serial de um **ESP32** que lê o Rotary Encoder.
*   **Resolução**: Otimizado estritamente para displays verticais **1080x1920 (9:16)**.

---

## 🚀 Como rodar o projeto?

1.  Certifique-se de ter o **Node.js** instalado.
2.  No terminal, entre na pasta do projeto e instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:5173` no seu navegador (recomendado usar Chrome em modo Kiosk).

---
*Desenvolvido com foco em preservação histórica e educação científica. PUC Minas & Museu de Ciências e Tecnologia.*
