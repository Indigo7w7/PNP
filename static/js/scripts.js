document.getElementById('add_acta').addEventListener('click', async () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Cargar plantillas disponibles
    const response = await fetch('/plantillas');
    const plantillas = await response.json();

    const selectPlantilla = document.getElementById('select_plantilla');
    selectPlantilla.innerHTML = plantillas.map(p => `<option value="${p}">${p}</option>`).join('');
});

document.getElementById('close_modal').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

document.getElementById('guardar_acta').addEventListener('click', async () => {
    const datos = {};
    document.querySelectorAll('#datos_acta input').forEach(input => {
        datos[input.name] = input.value;
    });

    const plantilla = document.getElementById('select_plantilla').value;
    const nombreDiligencia = document.getElementById('nombre_diligencia').value;

    const response = await fetch('/guardar_acta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantilla, nombreDiligencia, datos })
    });

    const result = await response.json();
    alert(result.message);
});
