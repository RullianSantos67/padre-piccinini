// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1Mb5hnjECtwo1AIN7ndc2hiamwxBZkMmf-Y-KFgAm-FE';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'acoes'  // Verifique o nome correto da sua aba e o intervalo
    }).then(function(response) {
        const data = response.result.values;
        const container = document.getElementById('actions-cards-container'); // Onde os cards vão aparecer

        // Limpa qualquer conteúdo existente no container de cards
        container.innerHTML = '';

        // Preenche os cartões com os dados da planilha
        data.forEach(function(row) {
            // Supondo que a primeira coluna é 'Ação', a segunda é 'Descrição' e a terceira é a URL da imagem
            const acao = row[0] || '';  // Ajuste conforme o número de colunas
            const descricao = row[1] || '';
            const imagemUrl = row[2] || ''; // URL da imagem na terceira coluna

            // Criação do cartão
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            // Definir a imagem se houver uma URL válida
            let imgTag = '';
            if (imagemUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (imagemUrl.startsWith('http://') || imagemUrl.startsWith('https://'))) {
                imgTag = `<img src="${imagemUrl}" class="card-img-top" alt="Imagem do projeto">`;
            } else {
                imgTag = `<img src="https://via.placeholder.com/150" class="card-img-top" alt="Imagem do projeto">`; // Imagem padrão
            }

            // Define o conteúdo do cartão
            card.innerHTML = `
                <div class="card">
                    ${imgTag} <!-- A imagem será colocada aqui -->
                    <div class="card-body">
                        <h5 class="card-title">${acao}</h5>
                        <p class="card-text">${descricao}</p>
                    </div>
                </div>
            `;
            
            // Adiciona o cartão ao container
            container.appendChild(card);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyBmUFSFBk6QYRIKKiiwzJ-xaVCmWE_eEyA',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();  // Carrega os dados e exibe os cartões
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);

function showImage(src) {
    document.getElementById('modalImage').src = src;
}