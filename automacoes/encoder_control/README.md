# Controle do Encoder para ESP32

Esta é a pasta independente contendo os códigos de automação do ESP32 para o leitor do encoder rotativo.

## 📌 Ligações de Hardware no ESP32

As conexões com o Encoder (modelo KY-040 ou similar) são feitas seguindo a recomendação de suporte a interrupções nos pinos CLK e DT.

| Pino do Encoder | Pino no ESP32 | Função               | Tipo               |
| --------------- | ------------- | -------------------- | ------------------ |
| **CLK**         | **D5 (14)**   | Clock / Passo A      | Hardware Interrupt |
| **DT**          | **D6 (12)**   | Data / Passo B       | Hardware Interrupt |
| **SW**          | **D7 (13)**   | Switch / Botão click | Input c/ Pullup    |
| **+**           | **3V3**       | VCC / Alimentação    | -                  |
| **GND**         | **GND**       | Referência           | -                  |

## 🛠️ Códigos

1. **`encoder_control.ino`**: Este é o código principal em C++ para gravar no seu ESP32 utilizando a Arduino IDE.
   - Ele utiliza a função `attachInterrupt()` no pino D5 para ler a rotação do encoder no momento exato em que ele gira, garantindo zero perda de passos ou travamentos.
   - O pino D7 sofre polling comum no `loop()` com um sistema anti-bounce em milissegundos.
   - Os comandos enviados pela Serial são `LEFT`, `RIGHT`, e `CLICK` (Baud rate: **115200**).

2. **`bridge.js`**: Um script exemplo em Node.js (opcional) que lê os comandos que chegam na porta serial do computador caso você precise conectar esses comandos à sua aplicação web/server.

## 🚀 Como instalar em uma nova máquina

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/felipebrito/puc_trilho
    cd puc_trilho/automacoes/encoder_control
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a ponte (Bridge):**
    Identifique a porta USB da sua ESP32 e rode:
    ```bash
    # Se você souber a porta:
    node bridge.js /dev/cu.usbmodemXXXX
    
    # Se não souber, rode sem argumentos para ver a lista:
    node bridge.js
    ```

4.  **Acesse o Debugger:**
    Abra `http://localhost:3000` no navegador para calibrar a sensibilidade.
