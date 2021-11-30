// Selectores

const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

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
  buscarImagen(terminoBusqueda);
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

function buscarImagen(busqueda) {
  const key = "8502071-1f57c63cc805c2d86e5bf513a";
  const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}`;

  fetch(url)
    .then((res) => res.json())
    .then((res) => mostrarImagenes(res));
}

function mostrarImagenes(datos) {
  console.log(datos);
}
