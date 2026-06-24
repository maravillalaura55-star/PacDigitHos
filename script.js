window.addEventListener("DOMContentLoaded", () => {

if (typeof pacientes === "undefined") {
console.error("❌ ERROR: pacientes.js no cargó");
return;
}

console.log("✅ Base de datos conectada:", pacientes);

// ===============================
// LISTA DE PACIENTES
// ===============================
const lista = document.getElementById("listaPacientes");

if (lista) {

pacientes.forEach((p, i) => {

let div = document.createElement("div");

div.className = p.riesgo;
div.innerHTML = `<b>${p.nombre}</b><br>${p.diag}`;

div.onclick = () => mostrarPaciente(i);

lista.appendChild(div);

});

}

});

// ===============================
// MOSTRAR PACIENTE
// ===============================
function mostrarPaciente(i){

let p = pacientes[i];

// EXPEDIENTE
document.getElementById("info").innerHTML = `
<div class="box">
<h2>${p.nombre}</h2>
<p><b>Edad:</b> ${p.edad}</p>
<p><b>Diagnóstico:</b> ${p.diag}</p>
<p><b>Médico:</b> ${p.medico}</p>
<p><b>Servicio:</b> ${p.servicio}</p>
<p><b>Próxima cita:</b> ${p.proximaCita}</p>
<p><b>Medicamentos:</b> ${p.medicamentos}</p>
<p><b>Dosis:</b> ${p.dosis}</p>
</div>
`;

// EDUCACIÓN
mostrarEducacion(p);

// ALERTAS
mostrarAlertas(p);
}

// ===============================
// ALERTAS (CON BOTÓN HECHO)
// ===============================
function mostrarAlertas(p){

let alertas = "";

if(p.diag.toLowerCase().includes("diabetes")){
alertas += `
<div class="cita" id="a1">
🩸 Medir glucosa
<button onclick="completar('a1')">Hecho</button>
</div>`;
}

if(p.diag.toLowerCase().includes("hipertensión")){
alertas += `
<div class="cita" id="a2">
💓 Tomar presión arterial
<button onclick="completar('a2')">Hecho</button>
</div>`;
}

alertas += `
<div class="cita" id="a3">
⏰ Tomar medicamentos
<button onclick="completar('a3')">Hecho</button>
</div>`;

const box = document.getElementById("alertas");

if(box){
box.innerHTML = alertas;
}
}

// ===============================
// COMPLETAR ALERTA
// ===============================
function completar(id){

let el = document.getElementById(id);

if(!el) return;

el.style.background = "#c8e6c9";
el.style.borderLeft = "6px solid #2e7d32";
el.innerHTML += " ✔ Realizado";
}

// ===============================
// EDUCACIÓN DEL PACIENTE
// ===============================
function mostrarEducacion(paciente){

let video = "";

if (paciente.diag.toLowerCase().includes("diabetes")){
video = "https://www.youtube.com/embed/wZAjVQWbMlE";
}
else if (paciente.diag.toLowerCase().includes("hipertensión")){
video = "https://www.youtube.com/embed/8JjLhYwR3MM";
}
else if (paciente.diag.toLowerCase().includes("infarto")){
video = "https://www.youtube.com/embed/2pQXc2nY2pQ";
}
else if (paciente.diag.toLowerCase().includes("neumonía")){
video = "https://www.youtube.com/embed/7wX0g0k9Z3A";
}
else{
video = "https://www.youtube.com/embed/8JjLhYwR3MM";
}

const box = document.getElementById("educacionBox");

if(!box){
console.error("❌ educacionBox no existe");
return;
}

box.innerHTML = `
<div class="edu-card">

<h3>📚 Educación del paciente</h3>

<iframe width="100%" height="220"
src="${video}"
frameborder="0"
allowfullscreen>
</iframe>

<p><b>Diagnóstico:</b> ${paciente.diag}</p>

</div>
`;
}

// ===============================
// MARCAR EDUCACIÓN
// ===============================
function marcarEducacion(){

let status = document.getElementById("eduStatus");

if(status){
status.innerText = "Estado: VISTO ✔";
status.style.color = "green";
}
}