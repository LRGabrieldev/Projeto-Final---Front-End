const btnVoltar = document.getElementById("btnVoltar");
const btnSalvar = document.getElementById("btnSalvar");
const editor = document.getElementById("editorTexto");

const urlParams = new URLSearchParams(window.location.search);
const documentoId = urlParams.get("id");

function carregarDocumento() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documento = documentos.find(doc => doc.id === documentoId);

    if(documento) {
        editor.innerHTML = documento.conteudo;
    }
}

const mensagemSalvo = document.getElementById("mensagemSalvo");


function salvarDocumento() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documentoIndex = documentos.findIndex(doc => doc.id === documentoId);

    if(documentoIndex !== -1) {
        documentos[documentoIndex].conteudo = editor.innerHTML;
    } else {
 
        documentos.push({
            id: documentoId || Date.now().toString(),
            conteudo: editor.innerHTML
        });
    }

    localStorage.setItem("documentos", JSON.stringify(documentos));

    mensagemSalvo.style.display = "block";

    setTimeout(() => {
        mensagemSalvo.style.display = "none";
    }, 3000);

    console.log("Documento salvo com sucesso");
}

btnSalvar.addEventListener("click", salvarDocumento);
btnVoltar.addEventListener("click", () => {
    //window.location.href = "http://127.0.0.1:5500/Menu/menu.html";
    window.location.href = "http://127.0.0.1:5500/Projeto%20Final/Menu/menu.html";
});

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

btnNegrito.addEventListener("click", () => document.execCommand("bold"));
btnItalico.addEventListener("click", () => document.execCommand("italic"));
btnSublinhar.addEventListener("click", () => document.execCommand("underline"));

alinEsquerdo.addEventListener("click", () => document.execCommand("justifyLeft"));
alinCentro.addEventListener("click", () => document.execCommand("justifyCenter"));
alinDireito.addEventListener("click", () => document.execCommand("justifyRight"));
alinJustificado.addEventListener("click", () => document.execCommand("justifyFull"));

fontFamily.addEventListener("change", (event) => {
    document.execCommand("fontName", false, event.target.value);
});

fontSize.addEventListener("change", (event) => {
    document.execCommand("fontSize", false, event.target.value);
});

colorPicker.addEventListener("input", (event) => {
    document.execCommand("foreColor", false, event.target.value);
});

carregarDocumento();