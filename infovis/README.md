# 🗺️ Visualización paso a paso: Acceso a Centros de Salud en la Región Metropolitana

Este repositorio contiene un sitio web interactivo que muestra la desigualdad territorial en el acceso a centros de salud en la Región Metropolitana de Chile, ajustado por población comunal.

---

## ✅ ¿Qué hace esta visualización?

- Muestra un **mapa de calor** que representa el acceso a salud según cantidad de centros por 100.000 habitantes.
- Permite hacer **clic en cada comuna** para obtener estadísticas detalladas.
- Al hacer **zoom**, el mapa cambia y se muestran **íconos individuales** para cada centro médico.
- Incluye una **leyenda de colores** para entender fácilmente la escala.

---

## 📁 Estructura del proyecto

visualizacion-salud-rm/
├── index.html ← Página principal
├── css/
│ └── style.css ← Estilos visuales modernos
├── js/
│ └── main.js ← Lógica de Leaflet, interactividad y visualización
├── datos/
│ ├── comunas_rm_4326.geojson ← Límites comunales + tasa por población
│ └── ubicaciones_centros_rm_limpio.csv ← Coordenadas y atributos de cada centro


---

## 🛠️ PASO A PASO: Cómo ejecutar el proyecto localmente

### 1. Clonar o descargar el repositorio

Si usas Git:
```bash
git clone https://github.com/vickyotarola/visualizacion-salud-rm.git
cd visualizacion-salud-rm

## Abrir el sitio en tu navegador local
Tienes dos opciones:

✅ Opción A: Usar Live Server en VSCode

Abre la carpeta con Visual Studio Code
Instala la extensión Live Server
Haz clic derecho en index.html → “Open with Live Server”
✅ Opción B: Usar servidor local con Python

Abre tu terminal y ve a la carpeta del proyecto:
cd ruta/a/la/carpeta/visualizacion-salud-rm

ejecuta:
python3 -m http.server

Abre tu navegador en:
http://localhost:8000

👁️ ¿Qué verás al abrir el sitio?

Un mapa de calor que representa acceso relativo a salud
Al hacer clic en una comuna: verás población, número de centros y tasa por 100.000 hab.
Al hacer zoom (nivel 14 o más): el mapa de calor se oculta y se muestran íconos individuales
Una leyenda de colores (esquina inferior derecha) explica el gradiente usado

📊 Fuentes de los datos

Centros de salud: Datos extraídos de registros abiertos del Ministerio de Salud de Chile
Población comunal: Estimaciones oficiales del INE (2022)
GeoJSON comunal: Extraído de fcortes/Chile-GeoJSON y reproyectado a EPSG:4326

🎨 Justificación visual

Se utiliza un heatmap proporcional a población para evitar interpretaciones erróneas basadas en densidad bruta.
Al hacer zoom, se accede a detalle individual por centro médico.
El diseño fue pensado para ser limpio, claro, y reforzar el mensaje sobre desigualdad territorial en salud.

✨ Extras implementados

Mapa adaptado según zoom
Colores rojo–naranjo–amarillo para expresar criticidad
Íconos alternativos en niveles altos de zoom
Leyenda visual sincronizada con los colores del mapa

