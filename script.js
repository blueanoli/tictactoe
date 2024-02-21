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
                cellValue = 'O';
            } else if (fieldValue === 'cross') {
                cellValue = 'X';
            }

            tableHTML += `<td>${cellValue}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.getElementById('content').innerHTML = tableHTML;
}