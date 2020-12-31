let ronda = 0;
let $primerCuadrado = null;
const $tablero = document.querySelector("#tablero");
const $cuadros = $tablero.querySelectorAll(".cuadrado");
const $volverJugar = document.querySelector("#newGame");
const $divFinJuego = document.querySelector("#Fin-juego");
const $divPadre = document.querySelectorAll(".columna");
//las clases css tienen los nombres de los colores
const colores = [
  "aqua",
  "black",
  "blue",
  "blueviolet",
  "brown",
  "coral",
  "darkkhaki",
  "fuchsia",
];
//Al array original le agrego los mismos elementos de nuevo
// const coloresRepetidos = colores.concat(colores);
//Permite setear los colores de cada uno de los cuadrados
const coloresRepetidos = colores.concat(colores);

function inicioJuego() {
  colorCuadros($cuadros, coloresRepetidos);
}

function colorCuadros($cuadros, coloresRepetidos) {
  //la funcion sort toma dos parametros (item anterior y actual)
  //y los compara (sacado de internet esta forma de obtener randoms en array)
  //sort modifica el array original
  const coloresRandom = coloresRepetidos.sort(function () {
    return 0.5 - Math.random();
  });
  //agrego los distintos colores aleatorios a los cuadrados a traves de las
  //clases colores
  coloresRandom.forEach(function (color, i) {
    $cuadros[i].classList.add(color);
    //console.log(color,i)
  });
}

function inputUsuario() {
  $cuadros.forEach(function ($cuadrado) {
    $cuadrado.onclick = function () {
      compararCuadrado($cuadrado);
    };
  });
}

$volverJugar.onclick = function () {
  ocultarFinJuego($divFinJuego);
  mostrarTablero($tablero);
  agregarCuadros();
  restablecerFondo($divPadre);
};

function compararCuadrado($cuadrado) {
  const $cuadradoActual = $cuadrado;
  //Puede darse el caso que toque justo la columna o borde
  if ($cuadradoActual.classList.contains("cuadrado")) {
    mostrarCuadro($cuadradoActual);
    //entra la primera vez del juego
    if ($primerCuadrado === null) {
      $primerCuadrado = $cuadradoActual;
    } else {
      //presiona dos veces el mismo cuadro
      if ($cuadradoActual === $primerCuadrado) {
        return;
      }

      if (cuadrosSonIguales($cuadradoActual, $primerCuadrado)) {
        console.log("son iguales");
        cambiarColorFondo($primerCuadrado, $cuadradoActual);
        eliminarCuadro($primerCuadrado);
        eliminarCuadro($cuadradoActual);
      } else {
        ocultarCuadro($primerCuadrado);
        ocultarCuadro($cuadradoActual);
      }
      ronda++;
      $primerCuadrado = null;
      validarFinJuego();
    }
  }
}
function mostrarCuadro($cuadradoActual) {
  $cuadradoActual.style.opacity = "1";
}
function ocultarCuadro($cuadrado) {
  setTimeout(function () {
    $cuadrado.style.opacity = "0";
  }, 500);
}

function cuadrosSonIguales($cuadradoActual, $primerCuadrado) {
  return $cuadradoActual.className === $primerCuadrado.className;
}

function eliminarCuadro($cuadrado) {
  $cuadros.forEach(function (element) {
    if (element.className === $cuadrado.className) {
      if ($cuadrado.parentNode) {
        $cuadrado.parentNode.removeChild($cuadrado);
      }
    }
  });
}

function agregarCuadros() {
  cuadradosV = [];
  const $divPadre = document.querySelectorAll(".columna");
  for (let i = 0; i < $divPadre.length; i++) {
    $nodoHijo = document.createElement("div");
    $nodoHijo.classList.add("cuadrado");
    $nodoHijo.classList.add("h-100");
    $divPadre[i].appendChild($nodoHijo);
    cuadradosV.push($nodoHijo);
  }
  colorCuadros(cuadradosV, coloresRepetidos);
  cuadradosV.forEach(function ($cuadrado) {
    $cuadrado.onclick = function () {
      compararCuadrado($cuadrado);
    };
  });
}

function cambiarColorFondo($cuadro1, $cuadro2) {
  $cuadro1.parentNode.classList.add("completo");
  $cuadro2.parentNode.classList.add("completo");
}

function restablecerFondo($divPadre) {
  $divPadre.forEach(function (element) {
    element.classList.remove("completo");
  });
}

function validarFinJuego() {
  if (document.querySelectorAll(".cuadrado").length === 0) {
    $tablero.style.display = "none";
    const $divFinJuego = document.querySelector("#Fin-juego");
    $divFinJuego.style.display = "block";
    const $p = document.querySelector("strong");
    $p.textContent = ronda;
    ronda = 0;
  }
}

function ocultarFinJuego($divFinJuego) {
  $divFinJuego.style.display = "none";
}

function mostrarTablero($tablero) {
  $tablero.style.display = "block";
}
inicioJuego();
inputUsuario();
