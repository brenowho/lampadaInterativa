// Seleção dos elementos
const lamp = document.getElementById('lampImage');
const colorPicker = document.getElementById('colorPicker');
const audioLigar = document.getElementById('audioLigar');
const audioDesligar = document.getElementById('audioDesligar');
const audioBroken = document.getElementById('audioBroken');
const audioParty = document.getElementById('audioParty');
let partyMode = false;
let partyInterval;
let originalColor = colorPicker.value; // Armazena a cor original

// Função para verificar se a lâmpada está quebrada
function isBroken() {
    return lamp.src.includes('lampada_broken.svg');
}

// Função para exibir mensagens de erro
function showError(message) {
    alert(message);
}

// Função para ligar a lâmpada
function Ligar() {
    if (isBroken()) {
        showError("A lâmpada está quebrada e não pode ser ligada.");
        return;
    }
    if (lamp.classList.contains('on')) {
        showError("A lâmpada já está ligada.");
        return;
    }
    lamp.src = 'img/lampada_on.svg';
    lamp.classList.add('on'); // Adiciona brilho quando ligada
    lamp.classList.remove('off', 'broken');
    colorPicker.disabled = false; // Habilita o seletor de cor quando ligada
    ChangeColor(); // Atualiza a cor quando ligada
    audioLigar.play(); // Reproduz o som de ligar
}

// Função para desligar a lâmpada
function Desligar() {
    if (isBroken()) {
        showError("A lâmpada está quebrada e não pode ser desligada.");
        return;
    }
    if (lamp.classList.contains('off')) {
        showError("A lâmpada já está desligada.");
        return;
    }
    lamp.src = 'img/lampada_off.svg';
    lamp.classList.remove('on'); // Remove brilho quando desligada
    lamp.classList.add('off');
    colorPicker.disabled = true; // Desabilita o seletor de cor quando desligada
    audioDesligar.play(); // Reproduz o som de desligar

    // Reseta o seletor de cor
    colorPicker.value = originalColor;
    lamp.style.filter = ""; // Remove o efeito de brilho

    // Para qualquer som de festa se estiver tocando
    audioParty.pause();
    audioParty.currentTime = 0;

    if (partyMode) {
        partyMode = false;
        clearInterval(partyInterval); // Desativa o modo festa se estiver ativo
    }

    document.body.style.backgroundColor = 'rgb(48, 48, 48)'; // Volta ao fundo original
}

// Função para quebrar a lâmpada
lamp.addEventListener('click', Quebrar);
function Quebrar() {
    if (isBroken()) {
        showError("A lâmpada já está quebrada.");
        return;
    }
    lamp.src = 'img/lampada_broken.svg';
    lamp.classList.remove('on', 'off'); // Remove brilho quando quebrada
    lamp.classList.add('broken');
    colorPicker.disabled = true; // Desabilita o seletor de cor quando quebrada
    audioBroken.play(); // Reproduz o som de quebrado

    // Para qualquer som de festa se estiver tocando
    audioParty.pause();
    audioParty.currentTime = 0;

    if (partyMode) {
        partyMode = false;
        clearInterval(partyInterval); // Desativa o modo festa se estiver ativo
    }

    document.body.style.backgroundColor = 'rgb(48, 48, 48)'; // Volta ao fundo original
}

function ChangeColor() {
    if (lamp.classList.contains('on')) {
        let color = colorPicker.value; // Obtém a nova cor do seletor
        lamp.style.filter = `drop-shadow(0 0 20px ${color})`; // Aplica a nova cor com efeito de brilho
    }
}

// Adiciona evento ao seletor de cor para detectar mudanças
colorPicker.addEventListener('input', ChangeColor);

// Função para alternar o modo festa
function TogglePartyMode() {
    if (isBroken()) {
        showError("A lâmpada está quebrada e não pode entrar no modo festa.");
        return;
    }

    if (partyMode) {
        // Desativa o modo festa
        partyMode = false;
        clearInterval(partyInterval);
        lamp.src = 'img/lampada_on.svg'; // Volta para a lâmpada ligada
        lamp.classList.add('on'); // Adiciona brilho
        document.body.style.backgroundColor = 'rgb(48, 48, 48)'; // Volta ao fundo original
        colorPicker.value = originalColor; // Restaura a cor original
        colorPicker.disabled = false; // Habilita o seletor de cor
        ChangeColor(); // Aplica a cor original
        audioParty.pause(); // Pausa a música de festa
        audioParty.currentTime = 0; // Reseta o tempo de reprodução
    } else {
        // Ativa o modo festa
        if (!lamp.classList.contains('on')) {
            Ligar(); // Liga a lâmpada se estiver desligada
        }
        partyMode = true;
        originalColor = colorPicker.value; // Armazena a cor original
        partyInterval = setInterval(() => {
            // Gera uma cor aleatória
            let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            colorPicker.value = randomColor; // Atualiza o seletor de cor
            ChangeColor(); // Aplica a nova cor
        }, 100); // Muda a cor a cada 100 ms
        document.body.style.backgroundColor = 'black'; // Muda o fundo para preto
        colorPicker.disabled = true; // Desabilita o seletor de cor
        audioParty.play(); // Reproduz a música de festa
        audioParty.loop = true; // Garante que a música toque em loop
    }
}

// Adiciona eventos aos botões e ao seletor de cor
document.getElementById('liga').addEventListener('click', Ligar);
document.getElementById('desliga').addEventListener('click', Desligar);
document.getElementById('modoFesta').addEventListener('click', TogglePartyMode);
lamp.addEventListener('click', Quebrar);
colorPicker.addEventListener('input', ChangeColor);
