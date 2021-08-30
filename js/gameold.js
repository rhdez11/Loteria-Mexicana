//variable global de numero de tarjetas
var cardTotal = 20;

//variables de juego
var onGoing = false;
var hasWon = false;
var msg = "";

/// lo que va en base de datos
var bd = [
  { id: 1, nombre: "el gallo" },
  { id: 2, nombre: "el diablito" },
  { id: 3, nombre: "la dama" },
  { id: 4, nombre: "el catrin" },
  { id: 5, nombre: "el paraguas" },
  { id: 6, nombre: "la sirena" },
  { id: 7, nombre: "la escalera" },
  { id: 8, nombre: "la botella" },
  { id: 9, nombre: "el barril" },
  { id: 10, nombre: "el arbol" },
  { id: 11, nombre: "el melon" },
  { id: 12, nombre: "el valiente" },
  { id: 13, nombre: "el gorrito" },
  { id: 14, nombre: "la muerte" },
  { id: 15, nombre: "la pera" },
  { id: 16, nombre: "la bandera" },
  { id: 17, nombre: "el bandolon" },
  { id: 18, nombre: "el violoncello" },
  { id: 19, nombre: "la garza" },
  { id: 20, nombre: "el pajaro" },
];

// arreglo de tarjetas seleccionadas
var selected = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];

// arreglo de tarjetas que van saliendo para comprobar gane
var called = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];

//se inicializa la tabla
var board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function Reset() {
  // se inicializan nuevamente las selecciones y tableros
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      selected[i][j] = false;
      called[i][j] = false;
      board[i][j] = 0;
      let cardpos = document
        .getElementsByClassName("boardRow")
        [i].getElementsByTagName("td")[j];
      cardpos.style = "background-color: white;";
      cardpos.getElementsByTagName("img")[0].style = "opacity: 1;";
      cardpos.getElementsByTagName("img")[0].src = "img/cardback.jpg";
    }
  }
  //se inicializan las variables de juego
  hasWon = false;
  onGoing = false;
  document.getElementById("tarjetaActiva").src = "img/cardback.jpg";
  document.getElementById("reset").innerHTML = "Cambiar Cartilla";
  document.getElementById("message").innerHTML = "";
  document.getElementById("cardname").innerHTML = "";

  //se genera un nuevo tablero
  GenerateBoard();
}

function GenerateBoard() {
  //se contruye un arreglo con todos los ids de las tarjetas
  var cards = Array.from(Array(cardTotal).keys()).map((x) => ++x);

  //se generan las posiciones aleatorias de las tarjetas en la tabla
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      //console.log("antes de", cards.length);
      rand = Math.floor(Math.random() * cards.length);
      board[i][j] = cards[rand];
      cards.splice(rand, 1);
      //console.log("despues de", cards.length);
    }
  }

  //se obtiene la imagen a cambiar y se pregunta a la bd
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      //obteniendo imagen a cambiar
      let cardImg = document
        .getElementsByClassName("boardRow")
        [i].getElementsByTagName("td")
        [j].getElementsByTagName("img")[0];

      //se define el id con el que se hara query
      let id = board[i][j];

      // se le resta uno al id por arreglo
      let x = id - 1;

      //se pide a la bd el nombre con el id de la tarjeta
      let nombre = bd[x].nombre;

      //console.log(id, board[i][j], bd[x]);
      cardImg.src = `img/Cartas/${id} ${nombre}.jpg`;
    }
  }
}

function Check(i, j) {
  if (!selected[i][j]) {
    selected[i][j] = true;
    let cardpos = document
      .getElementsByClassName("boardRow")
      [i].getElementsByTagName("td")[j];
    cardpos.style = "background-color: blue;";
    cardpos.getElementsByTagName("img")[0].style = "opacity: 0.5;";
  } else {
    selected[i][j] = false;
    let cardpos = document
      .getElementsByClassName("boardRow")
      [i].getElementsByTagName("td")[j];
    cardpos.style = "background-color: white;";
    cardpos.getElementsByTagName("img")[0].style = "opacity: 1;";
  }
}

function StartGame() {
  // document.getElementById("reset").disabled = true;
  document.getElementById("reset").style.display = "none";
  document.getElementById("iniciar").style.display = "none";
  document.getElementById("ganar").style.display = "block";

  onGoing = true;
  //se contruye un arreglo con todos los ids de las tarjetas
  var cards = Array.from(Array(cardTotal).keys()).map((x) => ++x);

  //se llama la funcion primero para no esperar el primer delay
  CambiarImagen();

  //se define el intervalo
  var interval = setInterval(CambiarImagen, 3000);

  function CambiarImagen() {
    if (cards.length === 0) {
      onGoing = false;
      clearInterval(interval);
      alert("Ya no hay mas tarjetas....");
      document.getElementById("message").innerHTML =
        "Perdiste...<br>Ya no hay mas tarjetas....";
      document.getElementById("reset").style.display = "block";
      document.getElementById("reset").innerHTML = "Reset";
      document.getElementById("iniciar").style.display = "block";
      document.getElementById("iniciar").style.display = "none";
    }
    if (hasWon) {
      onGoing = false;
      clearInterval(interval);
      // alert("Felicidades!!");
    }

    if (onGoing) {
      let rand = Math.floor(Math.random() * cards.length);
      //console.log(rand, cards[rand]);
      //console.log(cards);

      //se define id(numero de tarjeta) con el que se hara query
      let id = cards[rand];
      UpdateCalledBoard(id);

      // se le resta uno al id por arreglo
      let x = id - 1;

      //se pide el nombre a la bd
      let nombre = bd[x].nombre;

      document.getElementById(
        "cardname"
      ).innerHTML = `Leyendo: <br> ${id} - ${nombre}`;

      say(`${id}`);
      say(`${nombre}`);

      console.log(id, nombre, bd[x]);
      document.getElementById(
        "tarjetaActiva"
      ).src = `img/Cartas/${id} ${nombre}.jpg`;
      for (var i = cards.length - 1; i >= 0; i--) {
        if (rand === i) {
          cards.splice(i, 1);
        }
      }
    } else {
      // document.getElementById("reset").disabled = false;
      document.getElementById("reset").style.display = "block";
      document.getElementById("reset").innerHTML = "Reset";
      document.getElementById("iniciar").style.display = "block";
      document.getElementById("ganar").style.display = "none";
    }
  }
}

//funcion para llevar control automatico de las cartas que salen
function UpdateCalledBoard(id) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === id) {
        called[i][j] = true;
      }
    }
  }
}

//funcion que revisa gane en todos los patrones
function CheckWin() {
  XCheck();

  CornerCheck();

  CenterCheck();

  VerticalCheck();

  if (hasWon) {
    document.getElementById("message").innerHTML = "Felicidades!!!<br>" + msg;
    say(`Felicidades!!! ${msg}`);
  } else {
    document.getElementById("message").innerHTML =
      "Mentiroso jaja <br>No has ganado";
  }
}

//funcion para revisar gane en esquinas
function CornerCheck() {
  //comprobando las esquinas
  if (
    selected[0][0] &&
    called[0][0] &&
    selected[0][3] &&
    called[0][3] &&
    selected[3][0] &&
    called[3][0] &&
    selected[3][3] &&
    called[3][3]
  ) {
    hasWon = true;
    console.log("gano en las esquinas");
    msg = "Ganaste en las esquinas!";
    return true;
  }
}

//funcion para revisar gane en el centro
function CenterCheck() {
  //comprobando el centro
  if (
    selected[1][1] &&
    called[1][1] &&
    selected[1][2] &&
    called[1][2] &&
    selected[2][1] &&
    called[2][1] &&
    selected[2][2] &&
    called[2][2]
  ) {
    hasWon = true;
    console.log("gano en el centro");
    msg = "Ganaste en el centro!";
    return true;
  }
}

//funcion para revisar gane en X
function XCheck() {
  if (CenterCheck() && CornerCheck()) {
    hasWon = true;
    console.log("gano en con la X");
    msg = "Ganaste con la X!";
    return true;
  }
}

function VerticalCheck() {
  for (let col = 0; col < 4; col++) {
    let check = 0;
    for (let row = 0; row < 4; row++) {
      if (selected[row][col] && called[row][col]) {
        check++;
      }
    }
    if (check === 4) {
      hasWon = true;
      console.log("gano en con una linea vertical");
      msg = "Ganaste con una línea vertical!";
      return true;
    }
  }
}

var voices = window.speechSynthesis.getVoices()[0];
function say(m) {
  var msg = new SpeechSynthesisUtterance();
  msg.voice = voices;
  msg.voiceURI = "native";
  msg.volume = 0.8;
  msg.rate = 1;
  msg.pitch = 0.7;
  msg.lang = "es-CO";
  msg.text = m;
  window.speechSynthesis.speak(msg);
}
