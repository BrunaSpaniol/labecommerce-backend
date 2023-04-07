import { game } from "./pedra-papel-tesoura.js";

const InitGame = `O jogador é você, dev!\nsua escolha deve ser enviada via argumento no comando do terminal (process.argv)\no adversário é o computador (que faz uma escolha aleatória)
`;
console.log(InitGame);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let indiceAleatorio = getRndInteger(1, game.length - 1);
let escolhaJogador = process.argv[2].toLowerCase();

if (escolhaJogador === game[indiceAleatorio]) {
  console.log(
    `Você escolheu ${escolhaJogador} e o computador escolheu ${game[indiceAleatorio]}.Empate!`
  );
} else if (
  (escolhaJogador === "pedra" && game[indiceAleatorio] === "tesoura") ||
  (escolhaJogador === "tesoura" && game[indiceAleatorio] === "papel") ||
  (escolhaJogador === "papel" && game[indiceAleatorio] === "pedra")
) {
  console.log(
    `Você escolheu ${escolhaJogador} e o computador escolheu ${game[indiceAleatorio]}.Você ganhou!`
  );
} else {
  console.log(
    `Você escolheu ${escolhaJogador} e o computador escolheu ${game[indiceAleatorio]}.Você perdeu!`
  );
}
