function jogo1() {
  const container = document.getElementById("conteudo");
  const numeroSecreto = Math.floor(Math.random() * 10) + 1;

  container.innerHTML = `
    <h2>🔢 Adivinhe o Número Secreto</h2>
    <p>Digite um número entre 1 e 10:</p>
    <div class="input-com-botao">
      <input type="number" id="chute" min="1" max="10" />
      <button onclick="verificarChute(${numeroSecreto})">Tentar</button>
    </div>
    <p id="mensagem"></p>
  `;

  verificarChute.tentativas = 0;
}

function verificarChute(numeroSecreto) {
  const chute = parseInt(document.getElementById("chute").value);
  const mensagem = document.getElementById("mensagem");

  if (isNaN(chute) || chute < 1 || chute > 10) {
    mensagem.textContent = "⚠ Por favor, digite um número válido entre 1 e 10.";
    mensagem.style.color = "#d63031";
    return;
  }

  verificarChute.tentativas++;

  if (chute === numeroSecreto) {
    mensagem.innerHTML = `🎉 Parabéns! Você acertou em ${verificarChute.tentativas} tentativa(s)!`;
    mensagem.style.color = "#2ecc71";
    document.getElementById("chute").disabled = true;
  } else if (chute < numeroSecreto) {
    mensagem.textContent = "🔼 O número secreto é MAIOR.";
    mensagem.style.color = "#f39c12";
  } else {
    mensagem.textContent = "🔽 O número secreto é MENOR.";
    mensagem.style.color = "#f39c12";
  }
}


function jogo2() {
  const container = document.getElementById("conteudo");
  container.innerHTML = `
    <h2>🍌 Lista de Frutas</h2>
    <input type="text" id="frutaInput" placeholder="Digite uma fruta" />
    <button onclick="adicionarFruta()">Adicionar</button>
    <p id="listaFrutas">[]</p>

    <button onclick="metodo('push')">push()</button>
    <button onclick="metodo('pop')">pop()</button>
    <button onclick="metodo('shift')">shift()</button>
    <button onclick="metodo('unshift')">unshift()</button>
    <br><br>
    <button onclick="verificarBanana()">includes('banana')</button>
    <button onclick="mostrarIndex(prompt('Qual fruta quer buscar?'))">indexOf()</button>
    <button onclick="mostrarJoin()">join(', ')</button>
    <button onclick="mostrarSlice()">slice(1, 3)</button>
    <button onclick="fazerSplice()">splice(1, 1)</button>
    <button onclick="mapMaiusculas()">map (toUpperCase)</button>
    <button onclick="filtrarGrandes()">filter (length > 4)</button>
    <p id="saida"></p>
  `;
  atualizarLista();
}

let frutas = [];

function atualizarLista() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
  const input = document.getElementById('frutaInput');
  const valor = input.value.trim();

  if (valor) {
    frutas.push(valor);
    input.value = "";
    atualizarLista();
  }
}

function metodo(acao) {
  if (acao === 'push') {
    const fruta = prompt("Digite uma fruta para adicionar no final:");
    if (fruta) frutas.push(fruta);
  } else if (acao === 'pop') {
    frutas.pop();
  } else if (acao === 'shift') {
    frutas.shift();
  } else if (acao === 'unshift') {
    const fruta = prompt("Digite uma fruta para adicionar no início:");
    if (fruta) frutas.unshift(fruta);
  }
  atualizarLista();
}

function verificarBanana() {
  const resultado = frutas.includes('banana')
    ? "🍌 Banana está no array!"
    : "🚫 Banana NÃO está no array.";
  document.getElementById('saida').textContent = resultado;
}

function mostrarIndex(fruta) {
  const index = frutas.indexOf(fruta);
  const resultado = index !== -1
    ? `A fruta '${fruta}' está na posição ${index}.`
    : `'${fruta}' não foi encontrada.`;
  document.getElementById('saida').textContent = resultado;
}

function mostrarJoin() {
  const resultado = "join(', '): " + frutas.join(', ');
  document.getElementById('saida').textContent = resultado;
}

function mostrarSlice() {
  const fatiado = frutas.slice(1, 3);
  document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
}

function fazerSplice() {
  frutas.splice(1, 1);
  atualizarLista();
  document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
}

function mapMaiusculas() {
  const maiusculas = frutas.map(f => f.toUpperCase());
  document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

function filtrarGrandes() {
  const grandes = frutas.filter(f => f.length > 4);
  document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
}


function jogo3() {
  const container = document.getElementById("conteudo");
  container.innerHTML = `
    <h2>💾 Jogo do Salvar Texto</h2>
    <p>Digite seu texto abaixo e salve em um arquivo!</p>
    <textarea id="textoParaSalvar" placeholder="Digite seu texto aqui..." rows="6" cols="50" maxlength="1000"></textarea>
    <br><br>
    <input type="text" id="nomeArquivo" placeholder="Nome do arquivo (sem extensão)" />
    <br><br>
    <button onclick="salvarTexto()">💾 Salvar Arquivo</button>
    <p id="resultado"></p>
  `;
}

function salvarTexto() {
  const texto = document.getElementById("textoParaSalvar").value.trim();
  const nomeArquivo = document.getElementById("nomeArquivo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!texto) {
    resultado.textContent = "⚠ Digite algum texto para salvar!";
    resultado.style.color = "#d63031";
    return;
  }

  if (texto.length > 1000) {
    resultado.textContent = "⚠ O texto é muito grande! Limite a 1000 caracteres.";
    resultado.style.color = "#d63031";
    return;
  }

  const nomeLimpo = (nomeArquivo || "meu_texto").replace(/[^a-z0-9-_]/gi, "_");

  const blob = new Blob([texto], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeLimpo + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  resultado.textContent = `✅ Arquivo "${nomeLimpo}.txt" salvo com sucesso!`;
  resultado.style.color = "#00b894";
}
