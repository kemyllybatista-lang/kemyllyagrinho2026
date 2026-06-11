
// Configurações e estado inicial do jogo
let moedas = 10;
const custoPlantar = 2;
const recompensaColheita = 5;
const tempoCrescimento = 3000; // 3 segundos em milissegundos

// Array para controlar o estado de cada um dos 5 lotes ('vazio', 'plantado', 'pronto')
const estadosLotes = ['vazio', 'vazio', 'vazio', 'vazio', 'vazio'];

// Função para atualizar o painel de moedas na tela
function atualizarPainel() {
    document.getElementById('moedas').textContent = moedas;
}

// Inicializa os lotes com o texto "Vazio" ao carregar a página
function inicializarFazenda() {
    for (let i = 0; i < estadosLotes.length; i++) {
        const loteElement = document.getElementById(`lote-${i}`);
        loteElement.innerHTML = '<span class="status-texto">Vazio</span>';
    }
}

// Função principal chamada pelo clique no lote
function interagir(idLote) {
    const loteElement = document.getElementById(`lote-${idLote}`);
    const estadoAtual = estadosLotes[idLote];

    // 1. AÇÃO: PLANTAR
    if (estadoAtual === 'vazio') {
        if (moedas >= custoPlantar) {
            moedas -= custoPlantar;
            atualizarPainel();
            
            estadosLotes[idLote] = 'plantado';
            loteElement.classList.add('plantado');
            loteElement.innerHTML = '<div class="emoji">🌱</div><span class="status-texto">Crescendo...</span>';

            // Programação para crescer após o tempo determinado
            setTimeout(() => {
                estadosLotes[idLote] = 'pronto';
                loteElement.classList.remove('plantado');
                loteElement.classList.add('pronto');
                loteElement.innerHTML = '<div class="emoji">🌽</div><span class="status-texto">Colher!</span>';
            }, tempoCrescimento);
        } else {
            alert("Moedas insuficientes para plantar!");
        }
    } 
    // 2. AÇÃO: COLHER
    else if (estadoAtual === 'pronto') {
        moedas += recompensaColheita;
        atualizarPainel();

        estadosLotes[idLote] = 'vazio';
        loteElement.classList.remove('pronto');
        loteElement.innerHTML = '<span class="status-texto">Vazio</span>';
    }
}

// Executa a inicialização assim que o script é carregado
inicializarFazenda();
