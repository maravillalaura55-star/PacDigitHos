document.addEventListener("DOMContentLoaded", () => {

  let pacienteActual = null;

  const select = document.getElementById("pacienteSelect");

  // cargar pacientes
  pacientes.forEach((p, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = p.nombre;
    select.appendChild(option);
  });

  // ======================
  // LOGIN
  // ======================
  window.login = function () {

    const index = select.value;
    pacienteActual = pacientes[index];

    document.getElementById("panel").classList.remove("hidden");

    document.getElementById("nombrePaciente").textContent =
      pacienteActual.nombre;

    document.getElementById("infoPaciente").textContent =
      `Edad: ${pacienteActual.edad} | Dx: ${pacienteActual.diagnostico} | Médico: ${pacienteActual.medico} | Cita: ${pacienteActual.cita}`;

    renderMedicamentos();
    renderHistorial();
  };

  // ======================
  // MEDICAMENTOS
  // ======================
  function renderMedicamentos() {

    const cont = document.getElementById("medicamentos");
    cont.innerHTML = "";

    pacienteActual.medicamentos.forEach((m, i) => {

      const div = document.createElement("div");

      // COLOR VERDE SI ESTÁ HECHO
      if (m.estado) {
        div.style.background = "#c8f7c5";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
      }

      div.innerHTML = `
        <p><b>${m.nombre}</b> - ${m.dosis} - ${m.indicacion}</p>
        <button id="btn-${i}">
          ${m.estado ? "Hecho ✅" : "Marcar como hecho"}
        </button>
      `;

      cont.appendChild(div);

      // evento real (NO onclick inline)
      document.getElementById(`btn-${i}`).onclick = () => {
        pacienteActual.medicamentos[i].estado = true;
        renderMedicamentos(); // 🔥 RE-RENDER para que se ponga verde
      };
    });
  }

  // ======================
  // HISTORIAL CLÍNICO
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

  // ======================
  // GUARDAR MEDICIÓN
  // ======================
  window.guardarMedicion = function () {

    const glucosa = document.getElementById("glucosa").value;
    const presion = document.getElementById("presion").value;

    const registro =
      `🩸 Glucosa: ${glucosa} | ❤️ Presión: ${presion} | ${new Date().toLocaleString()}`;

    if (!pacienteActual.historial) {
      pacienteActual.historial = [];
    }

    // 🔥 GUARDAR EN DATOS (NO SOLO EN HTML)
    pacienteActual.historial.push(registro);

    renderHistorial();

    // notificación
    if (Notification.permission === "granted") {
      new Notification("Registro guardado correctamente");
    } else {
      Notification.requestPermission();
    }
  };

});
