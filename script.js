let pacientesGlobal = [];
let pacienteActual = null;
let select;

document.addEventListener("DOMContentLoaded", () => {

  select = document.getElementById("pacienteSelect");

  pacientesGlobal = pacientes;

  // llenar select
  pacientesGlobal.forEach((p, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = p.nombre;
    select.appendChild(option);
  });

  renderHistorialEmpty();
});

// ======================
// LOGIN (GLOBAL)
// ======================
function login() {

  const index = document.getElementById("pacienteSelect").value;
  pacienteActual = pacientesGlobal[index];

  document.getElementById("panel").classList.remove("hidden");

  document.getElementById("nombrePaciente").textContent =
    pacienteActual.nombre;

  document.getElementById("infoPaciente").textContent =
    `Edad: ${pacienteActual.edad} | Dx: ${pacienteActual.diagnostico} | Médico: ${pacienteActual.medico} | Cita: ${pacienteActual.cita}`;

  renderMedicamentos();
  renderHistorial();
}

// ======================
// MEDICAMENTOS
// ======================
function renderMedicamentos() {

  const cont = document.getElementById("medicamentos");
  cont.innerHTML = "";

  pacienteActual.medicamentos.forEach((m, i) => {

    const div = document.createElement("div");

    if (m.estado) {
      div.style.background = "#c8f7c5";
      div.style.padding = "10px";
      div.style.borderRadius = "8px";
    }

    div.innerHTML = `
      <p><b>${m.nombre}</b> - ${m.dosis} - ${m.indicacion}</p>
      <button onclick="marcarMedicamento(${i})">
        ${m.estado ? "Hecho ✅" : "Marcar como hecho"}
      </button>
    `;

    cont.appendChild(div);
  });
}

function marcarMedicamento(i) {
  pacienteActual.medicamentos[i].estado = true;
  renderMedicamentos();
}

// ======================
// HISTORIAL
// ======================
function renderHistorial() {

  const hist = document.getElementById("historial");
  hist.innerHTML = "";

  if (!pacienteActual.historial) {
    pacienteActual.historial = [];
  }

  pacienteActual.historial.forEach(h => {
    const div = document.createElement("div");
    div.textContent = h;
    hist.appendChild(div);
  });
}

function renderHistorialEmpty() {
  const hist = document.getElementById("historial");
  if (hist) hist.innerHTML = "";
}

// ======================
// GUARDAR MEDICIÓN
// ======================
function guardarMedicion() {

  const glucosa = document.getElementById("glucosa").value;
  const presion = document.getElementById("presion").value;

  const registro =
    `🩸 Glucosa: ${glucosa} | ❤️ Presión: ${presion} | ${new Date().toLocaleString()}`;

  if (!pacienteActual.historial) {
    pacienteActual.historial = [];
  }

  pacienteActual.historial.push(registro);

  renderHistorial();

  if (Notification.permission === "granted") {
    new Notification("Registro guardado correctamente");
  } else {
    Notification.requestPermission();
  }
}
