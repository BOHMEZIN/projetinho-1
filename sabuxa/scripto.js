let musicas = [
    {titulo:'Sweather Weather', artista:'The Neighbourhood', src:'musicas/Sweater Weather.mp3', img:'imagens/sweather.jpg'},
    {titulo:'I miss you', artista:'Blink-182', src:'musicas/I Miss You.mp3', img:'imagens/blink-182.jpg'},
    {titulo:'strangers', artista:'Kenya Grace', src:'musicas/Strangers.mp3', img:'imagens/Strangers.png'},
    {titulo:'Painkiller', artista:'Judas Priest', src:'musicas/Painkiller.mp3', img:'imagens/painkiller.jpg'},
    {titulo:'Assobio Levanta Defunto', artista:'DJ russo', src:'musicas/Assobio Levanta Defunto.mp3', img:'imagens/assobio.jpg'},
    {titulo:'Blade', artista:'Imperanon', src:'musicas/Blade.mp3', img:'imagens/blade.jpg'},
    {titulo:'nanana X cola', artista:'Lewis Hanton', src:'musicas/na na na x Cola.mp3', img:'imagens/nanana.jpg'},
    {titulo:'Wrong Side Of Heaven', artista:'Five Finger Death Punch', src:'musicas/Wrong Side Of Heaven.mp3', img:'imagens/wrong-side.jpg'},
    {titulo:'On Melancholy Hill', artista:'Gorillaz', src:'musicas/On Melancholy Hill.mp3', img:'imagens/on melancho.jpg'},
    {titulo:'Alive!', artista:'Bakar', src:'musicas/Alive!.mp3', img:'imagens/alive!.jpg'},
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 10;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 10){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}

function playNextSong() {
    indexMusica++;
    if (indexMusica >= musicas.length) {
        indexMusica = 0; 
    }
    renderizarMusica(indexMusica);

    musica.addEventListener('ended', playNextSong);
