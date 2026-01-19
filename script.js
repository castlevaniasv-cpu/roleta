let jogadores = [];
let itens = [];
let angulo = 0;

function addJogador() {
  const nome = document.getElementById("nome").value;
  const numero = parseInt(document.getElementById("numero").value);

  if(!nome || isNaN(numero)) return alert("Preencha os dados!");

  jogadores.push({nome, numero, valor:10, saldo:0});
  atualizar();
}

function addItem() {
  const n = itemNome.value;
  const num = parseInt(itemNum.value);
  if(!n || isNaN(num)) return;
  itens.push({n, num});
  atualizar();
}

function atualizar() {
  lista.innerHTML="";
  saldo.innerHTML="";
  itensDiv = document.getElementById("itens");
  itensDiv.innerHTML="";

  jogadores.forEach(j=>{
    lista.innerHTML += `<div>${j.nome} | 🎯 ${j.numero}</div>`;
    saldo.innerHTML += `<div>${j.nome}: ${j.saldo}</div>`;
  });

  itens.forEach(i=>{
    itensDiv.innerHTML += `<div>${i.n} → ${i.num}</div>`;
  });
}

function girar() {
  const sorte = Math.floor(Math.random()*10);
  angulo += 360*5 + sorte*36;
  roleta.style.transform = `rotate(${angulo}deg)`;

  setTimeout(()=>{
    let ganhador = jogadores.find(j=>j.numero===sorte);
    let total = 0;
    jogadores.forEach(j=>{
      if(j!==ganhador) total += j.valor;
    });

    if(ganhador){
      ganhador.saldo += total;
      alert("🎉 " + ganhador.nome + " ganhou " + total);
    } else {
      alert("😅 Ninguém acertou");
    }
    atualizar();
  },3000);
}
