let players = [];
let items = [];
let angle = 0;

function addBetLine() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Nome">
    <input placeholder="Número">
    <input placeholder="Valor">
  `;
  betsList.appendChild(div);
}

function addPlayer() {
  const name = pname.value;
  const number = parseInt(pnumber.value);
  const bet = parseFloat(pbet.value);

  if (!name || isNaN(number) || isNaN(bet)) {
    alert("Preencha todos os campos do jogador!");
    return;
  }

  players.push({ name, number, bet, balance: 0 });
  pname.value = pnumber.value = pbet.value = "";
  render();
}

function addItem() {
  const n = iname.value;
  const num = parseInt(inumber.value);

  if (!n || isNaN(num)) return;

  items.push({ n, num });
  iname.value = inumber.value = "";
  render();
}

function render() {
  playersList.innerHTML = "";
  balanceList.innerHTML = "";
  itemsList.innerHTML = "";

  players.forEach(p => {
    playersList.innerHTML += `<div>${p.name} | 🎯 ${p.number} | 💰 ${p.bet}</div>`;
    balanceList.innerHTML += `<div>${p.name}: ${p.balance}</div>`;
  });

  items.forEach(i => {
    itemsList.innerHTML += `<div>${i.n} → ${i.num}</div>`;
  });
}

function spin() {
  if (players.length < 2) {
    alert("Adicione pelo menos 2 jogadores!");
    return;
  }

  const result = Math.floor(Math.random() * 10);
  angle += 360 * 5 + result * 36;
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    let winner = players.find(p => p.number === result);
    let total = 0;

    players.forEach(p => {
      if (p !== winner) total += p.bet;
    });

    if (winner) {
      winner.balance += total;
      alert(`🎉 ${winner.name} ganhou ${total}! Número: ${result}`);
    } else {
      alert(`😅 Ninguém acertou! Número: ${result}`);
    }

    render();
  }, 3000);
}
