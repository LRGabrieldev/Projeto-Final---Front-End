// Seleção dos elementos
const btnNovo = document.getElementById("btnNovo");
const listaDocumentos = document.getElementById("listaDocumentos");

// Carregar documentos do localStorage
function carregarDocumentos() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    listaDocumentos.innerHTML = ""; // Limpa a lista

    documentos.forEach(doc => {
        const li = document.createElement("li");

        // Criar um elemento de texto para exibir o nome do documento
        const nomeElemento = document.createElement("span");
        nomeElemento.textContent = doc.nome || "Documento sem título";

        // Criar o botão de edição
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede o clique no item da lista de redirecionar
            editarNomeDocumento(doc.id, nomeElemento);
        });

        // Adicionar o nome e o botão de edição ao item da lista
        li.appendChild(nomeElemento);
        li.appendChild(btnEditar);

        // Adicionar o evento de clique ao item da lista para redirecionar para o editor
        li.addEventListener("click", () => {
            window.location.href = `http://127.0.0.1:5500/Editor%20de%20texto/editor.html?id=${doc.id}`;
        });

        // Adicionar botão de download para cada documento (somente .html)
        const downloadHtmlButton = document.createElement("button");
        downloadHtmlButton.textContent = "Baixar como .html";
        downloadHtmlButton.addEventListener("click", (event) => {
            event.stopPropagation();
            baixarDocumento(doc, 'html');
        });

        // Adicionar botão de exclusão
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o evento de clique no item da lista seja disparado
            excluirDocumento(doc.id);
        });

        li.appendChild(downloadHtmlButton);
        li.appendChild(btnExcluir);

        listaDocumentos.appendChild(li);
    });
}

// Função para editar o nome do documento
function editarNomeDocumento(id, nomeElemento) {
    const novoNome = prompt("Digite o novo nome para o documento:", nomeElemento.textContent);

    if (novoNome && novoNome.trim() !== "") {
        salvarNomeDocumento(id, novoNome); // Salvar o novo nome no localStorage
        nomeElemento.textContent = novoNome; // Atualizar o nome exibido
    } else {
        alert("Você deve fornecer um nome válido.");
    }
}

// Função para salvar o novo nome do documento
function salvarNomeDocumento(id, novoNome) {
    let documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documento = documentos.find(doc => doc.id === id);

    if (documento) {
        documento.nome = novoNome; // Atualizar o nome do documento
        localStorage.setItem("documentos", JSON.stringify(documentos)); // Atualiza o localStorage
    }
}

// Função para excluir o documento
function excluirDocumento(id) {
    let documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    documentos = documentos.filter(doc => doc.id !== id); // Filtra o documento a ser excluído

    localStorage.setItem("documentos", JSON.stringify(documentos)); // Atualiza o localStorage
    carregarDocumentos(); // Recarrega a lista de documentos
}

// Função para baixar o documento em .html
function baixarDocumento(doc, tipo) {
    if (tipo === 'html') {
        // Criar um arquivo .html com a estrutura completa
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${doc.nome}</title>
        </head>
        <body>
            ${doc.conteudo}
        </body>
        </html>
        `;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${doc.nome || 'documento'}.html`;
        link.click();
    }
}

// Criar um novo documento
btnNovo.addEventListener("click", () => {
    // Solicitar nome do documento
    const nomeDocumento = prompt("Digite o nome do novo documento:");

    if (nomeDocumento && nomeDocumento.trim() !== "") {
        const novoId = Date.now().toString();

        // Criar um novo documento no localStorage com o nome fornecido
        const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
        documentos.push({
            id: novoId,
            nome: nomeDocumento,
            conteudo: "" // Novo documento vazio
        });
        localStorage.setItem("documentos", JSON.stringify(documentos));

        // Redirecionar para o editor com o ID do novo documento
        window.location.href = `http://127.0.0.1:5500/Editor%20de%20texto/editor.html?id=${novoId}`;
    } else {
        alert("Você deve fornecer um nome para o documento.");
    }
});

// Inicializar a lista de documentos ao carregar a página
carregarDocumentos();