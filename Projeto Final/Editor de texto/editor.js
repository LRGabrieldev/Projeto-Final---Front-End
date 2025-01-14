//Selecionar elementos
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
        editor.innerHTML = documento.conteudo;
    }
}

const mensagemSalvo = document.getElementById("mensagemSalvo");


function salvarDocumento() {
    const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    const documentoIndex = documentos.findIndex(doc => doc.id === documentoId);

    //Atualizar documento existente
    if(documentoIndex !== -1) {
        documentos[documentoIndex].conteudo = editor.innerHTML;
    } else {
        //Criar novo documento se não existir 
        documentos.push({
            id: documentoId || Date.now().toString(),
            conteudo: editor.innerHTML
        });
    }

    localStorage.setItem("documentos", JSON.stringify(documentos));
    
    // Mostrar a mensagem de sucesso
    mensagemSalvo.style.display = "block";

    // Ocultar a mensagem após 3 segundos (3000 milissegundos)
    setTimeout(() => {
        mensagemSalvo.style.display = "none";
    }, 3000);

    console.log("Documento salvo com sucesso");
}

btnSalvar.addEventListener("click", salvarDocumento);
btnVoltar.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/Menu/menu.html";
    //window.location.href = "http://127.0.0.1:5500/Projeto%20Final/Menu/menu.html";
});
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

carregarDocumento();