#!/bin/bash

echo "🔍 Verificando archivos de datos en la carpeta 'datos/'..."
echo

# Lista de archivos esperados
archivos=("tasa_centros_limpio.csv" "poblacion_rm.csv" "ubicaciones_centros_rm.csv")

# Verificar existencia
for archivo in "${archivos[@]}"; do
    if [[ -f "datos/$archivo" ]]; then
        echo "✅ Archivo encontrado: datos/$archivo"
    else
        echo "❌ FALTA el archivo: datos/$archivo"
    fi
done

echo
echo "📄 Mostrando primeras líneas de cada archivo:"
echo

for archivo in "${archivos[@]}"; do
    if [[ -f "datos/$archivo" ]]; then
        echo "--- $archivo ---"
        head -n 5 "datos/$archivo"
        echo
    fi
done

echo "📊 Número de líneas por archivo:"
for archivo in "${archivos[@]}"; do
    if [[ -f "datos/$archivo" ]]; then
        lineas=$(wc -l < "datos/$archivo")
        echo "$archivo: $lineas líneas"
    fi
done

echo
echo "🔎 Buscando campos vacíos (',,')..."
for archivo in "${archivos[@]}"; do
    if [[ -f "datos/$archivo" ]]; then
        vacios=$(grep -c ",," "datos/$archivo")
        echo "$archivo: $vacios posibles valores faltantes"
    fi
done

# Extra: vista tabular con csvlook si está instalado
if command -v csvlook &> /dev/null; then
    echo
    echo "🧪 Vista previa tabular con csvlook (si está disponible):"
    csvlook datos/tasa_centros_limpio.csv | head -n 10
else
    echo
    echo "ℹ️ No se encontró 'csvlook'. Puedes instalarlo con: pip install csvkit"
fi
