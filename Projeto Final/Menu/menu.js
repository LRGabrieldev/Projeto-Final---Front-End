
const btnNovo = document.getElementById("btnNovo");
const listaDocumentos = document.getElementById("listaDocumentos");

const modalEditarNome = document.getElementById("modalEditarNome");
const modalNovoDocumento = document.getElementById("modalNovoDocumento");

const modalInputEditarNome = document.getElementById("modalInputEditarNome");
const modalInputNovoNome = document.getElementById("modalInputNovoNome");

const closeEditar = document.getElementById("closeEditar");
const closeNovo = document.getElementById("closeNovo");

const modalCancelarEditar = document.getElementById("modalCancelarEditar");
const modalCancelarNovo = document.getElementById("modalCancelarNovo");

const modalSalvarEditar = document.getElementById("modalSalvarEditar");
const modalSalvarNovo = document.getElementById("modalSalvarNovo");

let documentoAEditar;

function carregarDocumentos() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    listaDocumentos.innerHTML = ""; 

    documentos.forEach(doc => {
        const li = document.createElement("li");

        const nomeElemento = document.createElement("span");
        nomeElemento.textContent = doc.nome || "Documento sem título";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", (event) => {
            event.stopPropagation(); 
            editarNomeDocumento(doc.id, nomeElemento);
        });

        li.appendChild(nomeElemento);
        li.appendChild(btnEditar);

        li.addEventListener("click", () => {
            //window.location.href = `http://127.0.0.1:5500/Editor%20de%20texto/editor.html?id=${doc.id}`;
            window.location.href = `http://127.0.0.1:5500/Projeto%20Final/Editor%20de%20texto/editor.html?id=${doc.id}`; 
        });

        const downloadHtmlButton = document.createElement("button");
        downloadHtmlButton.textContent = "Baixar como .html";
        downloadHtmlButton.addEventListener("click", (event) => {
            event.stopPropagation();
            baixarDocumento(doc, 'html');
        });

        const downloadTxtButton = document.createElement("button");
        downloadTxtButton.textContent = "Baixar como .txt";
        downloadTxtButton.addEventListener("click", (event) => {
            event.stopPropagation();
            baixarDocumentoTxt(doc, 'txt');
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", (event) => {
            event.stopPropagation();
            excluirDocumento(doc.id);
        });

        li.appendChild(downloadHtmlButton);
        li.appendChild(downloadTxtButton);
        li.appendChild(btnExcluir);

        listaDocumentos.appendChild(li);
    });
}

function editarNomeDocumento(id, nomeElemento) {
    const novoNome = prompt("Digite o novo nome para o documento:", nomeElemento.textContent);

    if (novoNome && novoNome.trim() !== "") {
        salvarNomeDocumento(id, novoNome); 
        nomeElemento.textContent = novoNome; 
    } else {
        alert("Você deve fornecer um nome válido.");
    }
}

function salvarNomeDocumento(id, novoNome) {
    let documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documento = documentos.find(doc => doc.id === id);

    if (documento) {
        documento.nome = novoNome;
        localStorage.setItem("documentos", JSON.stringify(documentos)); 
    }
}

function excluirDocumento(id) {
    let documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    documentos = documentos.filter(doc => doc.id !== id);

    localStorage.setItem("documentos", JSON.stringify(documentos)); 
    carregarDocumentos(); 
}


function baixarDocumento(doc, tipo) {
    if (tipo === 'html') {
        
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

function baixarDocumentoTxt(doc, tipo) {
    if (tipo === 'txt') {

        const txtContent = doc.conteudo.replace(/<\/?[^>]+(>|$)/g, "");
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${doc.nome || 'documento'}.txt`;
        link.click();
    }
}


function editarNomeDocumento(id, nomeElemento) {
    documentoAEditar = { id, nomeElemento };
    modalInputEditarNome.value = nomeElemento.textContent;
    modalEditarNome.style.display = "block";
}

closeEditar.onclick = function() {
    modalEditarNome.style.display = "none";
}

modalCancelarEditar.onclick = function() {
    modalEditarNome.style.display = "none";
}

modalSalvarEditar.onclick = function() {
    const novoNome = modalInputEditarNome.value.trim();
    if (novoNome !== "") {
        salvarNomeDocumento(documentoAEditar.id, novoNome);
        documentoAEditar.nomeElemento.textContent = novoNome;
        modalEditarNome.style.display = "none";
    } else {
        alert("Você deve fornecer um nome válido.");
    }
}


btnNovo.addEventListener("click", () => {
    modalNovoDocumento.style.display = "block"; 
});


closeNovo.onclick = function() {
    modalNovoDocumento.style.display = "none";
}

modalCancelarNovo.onclick = function() {
    modalNovoDocumento.style.display = "none";
}

modalSalvarNovo.onclick = function() {
    const nomeDocumento = modalInputNovoNome.value.trim();
    if (nomeDocumento !== "") {
        const novoId = Date.now().toString();
        const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
        documentos.push({
            id: novoId,
            nome: nomeDocumento,
            conteudo: ""
        });
        localStorage.setItem("documentos", JSON.stringify(documentos));
        modalNovoDocumento.style.display = "none";
        //window.location.href = 'http://127.0.0.1:5500/Editor%20de%20texto/editor.html?id=${novoId}';
    window.location.href = 'http://127.0.0.1:5500/Projeto%20Final/Menu/menu.html?id=${novoId}';
    } else {
        alert("Você deve fornecer um nome para o documento.");
    }
}

window.onclick = function(event) {
    if (event.target == modalEditarNome) {
        modalEditarNome.style.display = "none";
    }
    if (event.target == modalNovoDocumento) {
        modalNovoDocumento.style.display = "none";
    }
}

carregarDocumentos();