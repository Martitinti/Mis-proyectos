const map = L.map("map").setView([-33.45, -70.65], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Datos
let poblacionData = {};
let tasaData = {};
let centrosData = [];
let centrosLayer = L.layerGroup().addTo(map);

function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
}

function cargarCSV(url) {
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data)
    });
  });
}

async function iniciar() {
  const poblacion = await cargarCSV("datos/poblacion_rm.csv");
  const tasas = await cargarCSV("datos/tasa_centros_limpio.csv");
  centrosData = await cargarCSV("datos/ubicaciones_centros_rm_limpio.csv");

  poblacion.forEach(row => {
    poblacionData[normalizar(row.Comuna)] = row.Poblacion;
  });

  tasas.forEach(row => {
    tasaData[normalizar(row.Comuna)] = row.tasa;
  });

  fetch("datos/13_normalizado.geojson")
    .then(res => res.json())
    .then(geojson => {
      L.geoJSON(geojson, {
        style: {
          color: "black",
          weight: 1.5,
          fillOpacity: 0
        },
        onEachFeature: (feature, layer) => {
          const comunaNorm = feature.properties.COMUNA_NORM;
          const comunaNombre = feature.properties.Comuna;
          const poblacion = poblacionData[comunaNorm] || "No disponible";
          let tasa = tasaData[comunaNorm];
          tasa = tasa ? Math.round(parseFloat(tasa)) : "No disponible";

          layer.on("click", () => {
            layer.bindPopup(`
              <strong>${comunaNombre}</strong><br>
              Población: ${poblacion}<br>
              Establecimientos por 100.000 hab: ${tasa}
            `).openPopup();
          });
        }
      }).addTo(map);

      renderizarCentros("Todos");
    });

  document.getElementById("filtro").addEventListener("change", () => {
    const valor = document.getElementById("filtro").value;
    renderizarCentros(valor);
  });
}

function nivelAtencion(tipo) {
  const t = tipo.toLowerCase();
  if (t.includes("cesfam") || t.includes("sapu") || t.includes("psr") || t.includes("cecosf") || t.includes("consultorio") || t.includes("cgr")) {
    return "Primaria";
  } else if (t.includes("hospital") || t.includes("clínica") || t.includes("centro de salud")) {
    return "Secundaria";
  } else {
    return "Otro";
  }
}

function colorPorNivel(nivel) {
  switch (nivel) {
    case "Primaria": return "red";
    case "Secundaria": return "yellow";
    default: return "gray";
  }
}

function renderizarCentros(filtro) {
  centrosLayer.clearLayers();

  centrosData.forEach(d => {
    const lat = parseFloat(d.Latitud);
    const lon = parseFloat(d.Longitud);
    const nombre = d.Nombre || "Centro";
    const comuna = d.Comuna || "Comuna";
    const tipo = d.Tipo || "Tipo no definido";
    const nivel = nivelAtencion(tipo);
    const color = colorPorNivel(nivel);

    if ((filtro === "Todos" || filtro === nivel) && !isNaN(lat) && !isNaN(lon)) {
      const marker = L.circleMarker([lat, lon], {
        radius: 5,
        color: color,
        fillColor: color,
        fillOpacity: 0.8
      }).bindPopup(`<strong>${nombre}</strong><br>${comuna}<br>Tipo: ${tipo}<br>Nivel: ${nivel}`);
      centrosLayer.addLayer(marker);
    }
  });
}

// Leyenda
const legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
  const div = L.DomUtil.create("div", "info legend");
  const niveles = ["Primaria", "Secundaria", "Otro"];
  const colores = ["red", "yellow", "gray"];

  div.innerHTML = "<strong>Nivel Atención</strong><br>";
  for (let i = 0; i < niveles.length; i++) {
    div.innerHTML += `<i style="background:${colores[i]}; border-radius: 50%; width: 10px; height: 10px; display:inline-block; margin-right: 5px;"></i> ${niveles[i]}<br>`;
  }
  return div;
};
legend.addTo(map);

iniciar();
