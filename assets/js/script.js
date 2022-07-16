// Ingreso de carga

const contadorTareasTotales = document.querySelector("#tareasTotales");
const contadorTareasRealizadas = document.querySelector("#tareasRealizadas");
const botonTarea = document.querySelector("#botonTarea");
const tabla = document.querySelector("#tabla");

let Tareas = [
  {
    id: 1,
    nombre: "Alimentar gato",
    realizada: false,
  },
  {
    id: 2,
    nombre: "Lavar la loza",
    realizada: false,
  },
  {
    id: 3,
    nombre: "Regar plantas",
    realizada: false,
  },
];

window.addEventListener("load", function () {
  refrescar();
});

// Agregar nueva tarea

botonTarea.addEventListener("click", function () {
  const valorInput = document.querySelector("#valorTarea");

  if (valorInput.value == "") {
    alert("Debe escribir una tarea nueva");
  } else {
    const tareaNueva = {
      id: Tareas.length + 1,
      nombre: valorInput.value,
      realizada: false,
    };

    Tareas.push(tareaNueva);
    refrescar();
  }
});

function cambiarEstadoTarea(check, idTarea) {
  const tarea = Tareas.find((tarea) => tarea.id === idTarea);

  if (check.checked == true) {
    tarea.realizada = true;
  } else {
    tarea.realizada = false;
  }

  refrescar();
}

const input = {
  parentNode: {
    style: { textDecoration: "default" },
  },
};

function eliminarTarea(idTarea) {
  Tareas = Tareas.filter((tarea) => tarea.id != idTarea);

  refrescar();
}

function refrescar() {
  tabla.innerHTML = "";

  // Carga Inicial

  const encabezado = document.createElement("tr");
  const encabezadoId = document.createElement("th");
  const encabezadoTarea = document.createElement("th");

  encabezadoId.innerHTML = "ID";
  encabezadoTarea.innerHTML = "Tarea";

  tabla.appendChild(encabezado);
  encabezado.appendChild(encabezadoId);
  encabezado.appendChild(encabezadoTarea);

  // Carga de Tareas

  for (const tarea of Tareas) {
    const fila = document.createElement("tr");
    const celdaId = document.createElement("td");
    const celdaTarea = document.createElement("td");

    const check = document.createElement("input");
    check.checked = tarea.realizada;
    check.setAttribute("type", "checkbox");
    check.setAttribute("onchange", `cambiarEstadoTarea(this,${tarea.id})`);

    const cruz = document.createElement("span");
    cruz.innerHTML = "&#10060;";
    cruz.setAttribute("onclick", `eliminarTarea(${tarea.id})`);

    celdaId.innerHTML = tarea.id;
    celdaTarea.innerHTML = tarea.nombre;

    if (tarea.realizada) {
      celdaTarea.style.textDecoration = "line-through";
      celdaTarea.style.color = "green";
    } else {
      celdaTarea.style.textDecoration = "";
      celdaTarea.style.color = "red";
    }

    // celdaTarea.style.color = tarea.realizada === true ? "green" : "red";

    tabla.appendChild(fila);
    fila.appendChild(celdaId);
    fila.appendChild(celdaTarea);
    fila.appendChild(check);
    fila.appendChild(cruz);
  }

  const tareasRealizadas = Tareas.filter((tarea) => tarea.realizada === true);
  contadorTareasTotales.innerHTML = "Total: " + Tareas.length;
  contadorTareasRealizadas.innerHTML = "Realizadas: " + tareasRealizadas.length;
}
