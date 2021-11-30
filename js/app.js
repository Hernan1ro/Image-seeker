// Selectores

const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const paginacionDiv = document.querySelector("#paginacion");

//Variables para paginación
let registroPorPagina = 40;
let paginas;
let iterador;
let paginaActual = 1;
window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();
  const terminoBusqueda = document.querySelector("#termino").value;
  if (terminoBusqueda === "") {
    imprimirAlerta("Agrega un termino de busqueda");
    return;
  }

  //Consultar la API
  buscarImagen();
}

function imprimirAlerta(mensaje) {
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    const alerta = document.createElement("p");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${mensaje}</span>
  `;
    formulario.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagen() {
  const busqueda = document.querySelector("#termino").value;
  const key = "8502071-1f57c63cc805c2d86e5bf513a";
  const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${registroPorPagina}&page=${paginaActual}`;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      paginas = calcularPaginas(res.totalHits);
      mostrarImagenes(res.hits);
    });
}

// Generador que registrará la cantidad de elementos de acuerdo a las paginas
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registroPorPagina));
}

function mostrarImagenes(datos) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  // Itera sobre el arreglo de imagenes e imprime en el DOM
  datos.forEach((dato) => {
    const { likes, previewURL, views, largeImageURL } = dato;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white">
          <img class="w-full" src="${previewURL}">
          <div class="p-4">
            <p class="font-bold"> ${likes} <span class="font-light">Me gusta</span> </p>
            <p class="font-bold"> ${views} <span class="font-light">Views</span> </p>
            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" rel="noopener" noreferrer" target="_blank" href="${largeImageURL}">Ver imagen</a>
        </div>
      </div>
    `;
  });
}
//Limpiar los anteriores botonones
while (paginacionDiv.firstChild) {
  paginacionDiv.removeChild(paginacionDiv.firstChild);
}
//Imprimir los botones en el DOM
imprimirPaginador();

// iterador.next();
function imprimirPaginador() {
  iterador = crearPaginador(40);
  while (true) {
    const { value, done } = iterador.next();
    if (done) {
      return;
    }
    //Caso contrario, por cada elemento en el generador;
    const boton = document.createElement("a");
    boton.href = "#";
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add(
      "siguiente",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "font-bold",
      "mb-1",
      "uppercase",
      "rounded"
    );
    boton.onclick = () => {
      paginaActual = value;
      mostrarImagenes();
    };
    paginacionDiv.appendChild(boton);
  }
}
