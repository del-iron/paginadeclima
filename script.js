const campoCidade = document.getElementById('campo-cidade');
const botaoBuscar = document.getElementById('botao-buscar');
const toggleTema = document.getElementById('toggle-tema');
const historico = JSON.parse(localStorage.getItem('historico')) || [];
const API_KEY = 'd66e7c3151ea9d9d550bbd23819e2a8a'; // Substitua pela chave da API de clima

function buscarClima(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) {
                atualizarInformacoes(data);
                salvarHistorico(cidade);
            } else {
                alert('Cidade não encontrada!');
            }
        })
        .catch(err => console.error(err));
}

function atualizarInformacoes(data) {
    document.getElementById('localizacao').textContent = `Localização: ${data.name}, ${data.sys.country}`;
    document.getElementById('icone-clima').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('umidade').textContent = `Humidade do ar: ${data.main.humidity}%`;
    document.getElementById('descricao').textContent = `Descrição: ${data.weather[0].description}`;
    document.getElementById('vento').textContent = `Velocidade do vento: ${data.wind.speed} km/h`;
}

function salvarHistorico(cidade) {
    if (!historico.includes(cidade)) {
        historico.push(cidade);
        localStorage.setItem('historico', JSON.stringify(historico));
    }
}

function alternarTema() {
    document.body.classList.toggle('dark-mode');
}

botaoBuscar.addEventListener('click', () => {
    const cidade = campoCidade.value.trim();
    if (cidade) buscarClima(cidade);
});

toggleTema.addEventListener('click', alternarTema);
