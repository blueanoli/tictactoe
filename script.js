let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];
let currentPlayer = 'circle';
let gameIsOver = false;
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
    [0, 4, 8], [2, 4, 6]            // Diagonalen
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
            tableHTML += `<td onclick="handleClick(${fieldIndex}, this)">${cellValue}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.getElementById('content').innerHTML = tableHTML;
}

function handleClick(index, tdElement) {
    if (fields[index] === null && !gameIsOver) {
        fields[index] = currentPlayer;
        tdElement.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();

        const winningCondition = checkForWin(currentPlayer); // Überprüfe auf Gewinn und erhalte die Gewinnbedingung
        if (winningCondition) {
            gameIsOver = true;
            drawWinLine(winningCondition); // Übergebe die Gewinnbedingung an drawWinLine
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}

function checkForWin(player) {
    const winningCondition = winConditions.find(condition => condition.every(index => fields[index] === player));
    return winningCondition; // Gibt die Gewinnbedingung zurück, wenn ein Spieler gewonnen hat, sonst undefined
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
            <animate attributeName="stroke-dasharray" from="0,90,0" to="45,0,45" dur="0.5s" fill="freeze" />
        </path>
        <path d="M65,5 L5,65" stroke="#FFC000" stroke-width="8" fill="none">
            <animate attributeName="stroke-dasharray" from="0,90,0" to="45,0,45" dur="0.5s" fill="freeze" />
        </path>
    </svg>
    `;

    return svgHTML;
}

function drawWinLine(winCondition) {
    const tableRect = document.querySelector('table').getBoundingClientRect();
    const cellWidth = tableRect.width / 3;
    const cellHeight = tableRect.height / 3;

    let x1, y1, x2, y2; // Start- und Endpunkte der Linie

    // Zeilen
    if (winCondition.every(index => index >= 0 && index <= 2)) { // Erste Zeile
        y1 = y2 = cellHeight / 2;
        x1 = 0;
        x2 = tableRect.width;
    } else if (winCondition.every(index => index >= 3 && index <= 5)) { // Zweite Zeile
        y1 = y2 = cellHeight * 1.5;
        x1 = 0;
        x2 = tableRect.width;
    } else if (winCondition.every(index => index >= 6 && index <= 8)) { // Dritte Zeile
        y1 = y2 = cellHeight * 2.5;
        x1 = 0;
        x2 = tableRect.width;
    }

    // Spalten
    if (winCondition.every(index => index % 3 === 0)) { // Erste Spalte
        x1 = x2 = cellWidth / 2;
        y1 = 0;
        y2 = tableRect.height;
    } else if (winCondition.every(index => index % 3 === 1)) { // Zweite Spalte
        x1 = x2 = cellWidth * 1.5;
        y1 = 0;
        y2 = tableRect.height;
    } else if (winCondition.every(index => index % 3 === 2)) { // Dritte Spalte
        x1 = x2 = cellWidth * 2.5;
        y1 = 0;
        y2 = tableRect.height;
    }

    // Diagonalen
    if (winCondition[0] === 0 && winCondition[2] === 8) { // Diagonale von oben links nach unten rechts
        x1 = 0;
        y1 = 0;
        x2 = tableRect.width;
        y2 = tableRect.height;
    } else if (winCondition[0] === 2 && winCondition[2] === 6) { // Diagonale von oben rechts nach unten links
        x1 = tableRect.width;
        y1 = 0;
        x2 = 0;
        y2 = tableRect.height;
    }

    // Zeichne die Linie
    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const svgLineHTML = `
    <svg class="win-line" width="${tableRect.width}px" height="${tableRect.height}px" style="position: absolute; top: ${tableRect.top}px; left: ${tableRect.left}px;">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="8" stroke-dasharray="${lineLength}" stroke-dashoffset="${lineLength}">
            <animate attributeName="stroke-dashoffset" from="${lineLength}" to="0" dur="0.5s" fill="freeze" />
        </line>
    </svg>
    `;
    document.getElementById('content').innerHTML += svgLineHTML;
}