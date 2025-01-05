//Selecionar elementos
const nomeInput = document.getElementById("nomeDocumento");
const btnVoltar = document.getElementById("btnVoltar");
const btnSalvar = document.getElementById("btnSalvar");
const editor = document.getElementById("editorTexto");

//Identificar o documento pelo ID (Através da URL)
const urlParams = new URLSearchParams(window.location.search);
const documentoId = urlParams.get("id");

//Carregar os dados do documentos
function carregarDocumento() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documento = documentos.find(doc => doc.id === documentoId);

    if(documento) {
        nomeInput.value = documento.nome;
        editor.innerHTML = documento.conteudo;
    }
}

carregarDocumento();

function salvarDocumento() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documentoIndex = documentos.findIndex(doc => doc.id === documentoId);

    //Atualizar documento existente
    if(documentoIndex !== -1) {
        documentos[documentoIndex].nome = nomeInput.value;
        documentos[documentoIndex].conteudo = editor.innerHTML;
    } else {
        //Criar novo documento se não existir 
        documentos.push({
            id: documentoId || Date.now().toString(),
            nome: nomeInput.value || "Documento sem título",
            conteudo: editor.innerHTML
        });
    }

    localStorage.setItem("documentos", JSON.stringify(documentos));
    console.log("Documento salvo com sucesso");
}

btnSalvar.addEventListener("click", salvarDocumento);
btnVoltar.addEventListener("click", () => {
    window.location.href = "menu.html";
});

function autoSalvar() {
    salvarDocumento();
}

setInterval(autoSalvar, 5000);

//Seleção dos elementos da barra de ferramentas
const btnNegrito = document.getElementById("btnNegrito");
const btnSublinhar = document.getElementById("btnSublinhar");
const btnItalico = document.getElementById("btnItalico");
const alinEsquerdo = document.getElementById("alinEsquerdo");
const alinDireito = document.getElementById("alinDireito");
const alinCentro = document.getElementById("alinCentro");
const alinJustificado = document.getElementById("alinJustificado");
const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");
const colorPicker = document.getElementById("colorPicker");

//Funções de formatações
btnNegrito.addEventListener("click", () => document.execCommand("bold"));
btnItalico.addEventListener("click", () => document.execCommand("italic"));
btnSublinhar.addEventListener("click", () => document.execCommand("underline"));

//Funções de alinhamento
alinEsquerdo.addEventListener("click", () => document.execCommand("justifyLeft"));
alinCentro.addEventListener("click", () => document.execCommand("justifyCenter"));
alinDireito.addEventListener("click", () => document.execCommand("justifyRight"));
alinJustificado.addEventListener("click", () => document.execCommand("justifyFull"));

//Alterar fonte
fontFamily.addEventListener("change", (event) => {
    document.execCommand("fontName", false, event.target.value);
});

//Alterar o tamanho da fonte
fontSize.addEventListener("change", (event) => {
    document.execCommand("fontSize", false, event.target.value);
});

//Alterar cor do texto
colorPicker.addEventListener("input", (event) => {
    document.execCommand("foreColor", false, event.target.value);
});
