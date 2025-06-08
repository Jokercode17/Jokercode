let rodada = 1;
let pontosJogador = 0;
let pontosCPU = 0;

function gerarCartaAleatoria() {
  return {
    velocidade: Math.floor(Math.random() * 300 + 100),
    potencia: Math.floor(Math.random() * 800 + 100),
    peso: Math.floor(Math.random() * 1000 + 500)
  };
}

function jogar(atributoEscolhido) {
  if (rodada > 5) return;

  const jogador = gerarCartaAleatoria();
  const cpu = gerarCartaAleatoria();

  const valJogador = jogador[atributoEscolhido];
  const valCpu = cpu[atributoEscolhido];

  document.getElementById("carta-jogador").innerHTML = `
    <p>Velocidade: ${jogador.velocidade}</p>
    <p>Potência: ${jogador.potencia}</p>
    <p>Peso: ${jogador.peso}</p>
  `;

  document.getElementById("carta-cpu").innerHTML = `
    <p>Velocidade: ${cpu.velocidade}</p>
    <p>Potência: ${cpu.potencia}</p>
    <p>Peso: ${cpu.peso}</p>
  `;

  let resultado = `Você escolheu: ${atributoEscolhido.toUpperCase()}\n`;

  if (valJogador > valCpu) {
    resultado += "Você venceu essa rodada!";
    pontosJogador++;
  } else if (valJogador < valCpu) {
    resultado += "Você perdeu essa rodada!";
    pontosCPU++;
  } else {
    resultado += "Empate!";
  }

  rodada++;
  document.getElementById("placar").textContent =
    `Você: ${pontosJogador} | CPU: ${pontosCPU} | Rodada: ${Math.min(rodada, 5)}/5`;

  const resultadoEl = document.getElementById("resultado");
  resultadoEl.style.opacity = 0;
  resultadoEl.textContent = resultado;

  setTimeout(() => {
    resultadoEl.style.animation = "fadeIn 0.6s forwards";
  }, 50);

  if (rodada > 5) {
    let final = "\n\nFim do jogo! ";
    if (pontosJogador > pontosCPU) final += "Você venceu!";
    else if (pontosJogador < pontosCPU) final += "Você perdeu!";
    else final += "Empate!";
    resultadoEl.textContent += final;

    const btnReiniciar = document.getElementById("reiniciar");
    btnReiniciar.classList.add("show");
    btnReiniciar.style.display = "inline-block";
  }
}

function reiniciarJogo() {
  const btnReiniciar = document.getElementById("reiniciar");
  btnReiniciar.classList.remove("show");
  setTimeout(() => {
    btnReiniciar.style.display = "none";
  }, 500);

  rodada = 1;
  pontosJogador = 0;
  pontosCPU = 0;

  document.getElementById("placar").textContent = `Você: 0 | CPU: 0 | Rodada: 1/5`;
  document.getElementById("carta-jogador").innerHTML = "";
  document.getElementById("carta-cpu").innerHTML = "?";
  document.getElementById("resultado").textContent = "";
}