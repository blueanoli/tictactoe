let fields = [
    null, 'circle', 'circle',
    'cross', null, 'cross',
    null, 'cross', null
];

function init(){
    render();
}

function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldIndex = i * 3 + j;
            let fieldValue = fields[fieldIndex];
            let cellValue = '';

            if (fieldValue === 'circle') {
                cellValue = generateCircleSVG();
            } else if (fieldValue === 'cross') {
                cellValue = generateCrossSVG();
            }

            tableHTML += `<td>${cellValue}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.getElementById('content').innerHTML = tableHTML;
}

function generateCircleSVG() {
    const radius = 35; // Radius des Kreises
    const strokeWidth = 8; // Die Dicke der Linie
    const viewBoxPadding = strokeWidth; // Zusätzlicher Platz in der viewBox für den Strich
    const viewBoxSize = radius * 2 + viewBoxPadding * 2; // Gesamtgröße der viewBox unter Berücksichtigung des Strichs
    const circlePosition = radius + viewBoxPadding; // Neue Position des Kreises innerhalb der viewBox
    const circumference = 2 * Math.PI * radius; // Umfang des Kreises berechnen

    const svgHTML = `
    <svg width="70" height="70" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${circlePosition}" cy="${circlePosition}" r="${radius}" stroke="#00B0EF" stroke-width="${strokeWidth}" fill="none" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}">
            <animate attributeName="stroke-dashoffset" from="${circumference}" to="0" dur="1s" fill="freeze" />
        </circle>
    </svg>
    `;

    return svgHTML;
}


function generateCrossSVG() {
    const svgHTML = `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M5,5 L65,65" stroke="#FFC000" stroke-width="8" fill="none">
            <animate attributeName="stroke-dasharray" from="0,90,0" to="45,0,45" dur="1s" fill="freeze" />
        </path>
        <path d="M65,5 L5,65" stroke="#FFC000" stroke-width="8" fill="none">
            <animate attributeName="stroke-dasharray" from="0,90,0" to="45,0,45" dur="1s" fill="freeze" />
        </path>
    </svg>
    `;

    return svgHTML;
}

