const imagens = [
    './src/imagens/slider/bg-gtavi.jpg',
    './src/imagens/slider/bg-spiderman2.jpg',
    './src/imagens/slider/bg-sparkingzero.jpeg',
    './src/imagens/slider/bg-tlou.jpg',
    './src/imagens/slider/bg-reddead.jpg'
];

let index = 0;
const imgFundo = document.getElementById('imagem-fundo');

function trocarImagem() {
    imgFundo.classList.add('hidden');
    
    setTimeout(() => {
        index = (index + 1) % imagens.length;
        imgFundo.src = imagens[index];

        imgFundo.classList.remove('hidden');
    }, 1000);
}

setInterval(trocarImagem, 7000);