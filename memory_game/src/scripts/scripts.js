const emojis = ['🍎','🍌','🍒','🍇','🍉','🥝','🍍','🥥'];
let deck = [...emojis, ...emojis];
let tabuleiro = document.getElementById('tabuleiro');
let resetBtn = document.getElementById('reset-btn');
let mensagem = document.getElementById('mensagem');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function embaralhar(array) {
  for (let i = array.length -1; i>0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  deck = [...emojis, ...emojis];
  embaralhar(deck);
  deck.forEach((emoji, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', virarCarta);
    tabuleiro.appendChild(card);
  });
  matches = 0;
  mensagem.classList.add('hidden');
}

function virarCarta() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('open');
  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checarPar();
}

function checarPar() {
  let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  isMatch ? lockMatched() : unflipCards();
}

function lockMatched() {
  firstCard.removeEventListener('click', virarCarta);
  secondCard.removeEventListener('click', virarCarta);
  resetTurn();
  matches++;
  if (matches === emojis.length) showWin();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('open');
    secondCard.classList.remove('open');
    resetTurn();
  }, 1000);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showWin() {
  mensagem.classList.remove('hidden');
}

resetBtn.addEventListener('click', criarTabuleiro);

criarTabuleiro();
