const listaFilmes = document.getElementById('listaFilmes');
let filmeSalvo = [];
let indiceFilme;
nomeFilme.focus();

function adicionarFilme() {
    novoFilme();
    exibeNaTela();
}

function novoFilme() {
    nomeFilme = document.getElementById('nomeFilme').value;
    filmeFavorito = document.getElementById('filme').value;
    trailerFilme = document.getElementById('trailer').value;
    

    let filmeAdicionado = {

        nome: nomeFilme,
        filme: filmeFavorito,
        trailer: trailerFilme
    };

    filmeSalvo = JSON.parse(localStorage.getItem('filmeSalvo')) || [];
    filmeSalvo.push(filmeAdicionado);
    localStorage.setItem('filmeSalvo', JSON.stringify(filmeSalvo));


    document.getElementById('nomeFilme').value = '';
    document.getElementById('filme').value = '';
    document.getElementById('trailer').value = '';
}

function exibeNaTela() {
    listaFilmes.innerHTML = '';

    filmeSalvo.forEach(filme => {
        let nomeFilme = filme.nome;
        let filmeFavorito = filme.filme;
        let trailerFilme = filme.trailer;

        if ((filmeFavorito.endsWith('.png') || filmeFavorito.endsWith('.jpg') || filmeFavorito.endsWith('.svg ') || filmeFavorito.endsWith('.jpeg'))
            && trailerFilme.includes('youtube.com')){
            listaFilmes.innerHTML += `<div class="filmes"> 
                <a href=${trailerFilme} target='_blank'><img src= ${filmeFavorito}><h2>${nomeFilme} </h2></a> 
                </div>`;
        } else {
            alert('Por favor verifique a extenção da Imagem e se a URL do trailer é do Youtube!');
        };

    });
}

function removerFilme() {
    let remover = document.getElementById('remover').value;
    document.getElementById('remover').value = '';
    indiceFilme = filmeSalvo.findIndex(filmeAdicionado => filmeAdicionado.nome === remover);

    if (indiceFilme !== -1) {
        filmesalvo = filmeSalvo.splice(indiceFilme, 1);
        localStorage.setItem('filmeSalvo', JSON.stringify(filmeSalvo));
        exibeNaTela();
    } else {
        alert('Esse filme não está na lista');
    }

}

window.addEventListener('load', function () { // O LOAD USAMOS PARA EXECUTAR UMA FUNÇÃO QUE RECUPERA OS FILMES SALVOS 

    filmeSalvo = JSON.parse(localStorage.getItem('filmeSalvo')) || [];

    for (var i = 0; i < filmeSalvo.length; i++) {
        let filme = filmeSalvo[i];
        let img = document.createElement('img');
        img.src = filme.filme;
        listaFilmes.appendChild(img);
        exibeNaTela();
    }
});

// localStorage.clear();