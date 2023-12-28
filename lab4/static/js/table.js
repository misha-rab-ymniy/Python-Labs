function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

selectedCells = new Set();

function countSelectedCellsInColumn(colIndex) {
    let count = 0;
    for (const cell of selectedCells) {
        if (cell.cellIndex === colIndex) {
            count++;
        }
    }
    return count;
}

function countSelectedCellsInRow(rowIndex) {
    let count = 0;
    for (const cell of selectedCells) {
        if (cell.parentElement.rowIndex === rowIndex) {
            count++;
        }
    }
    return count;
}

function areNeighborsUnselected(table, cell, rowIndex, colIndex) {
    const neighbors = [-1, 0, 1];
    for (const neighbor of neighbors) {
        if (
            selectedCells.has(table.rows[rowIndex + neighbor]?.cells[colIndex]) ||
            selectedCells.has(table.rows[rowIndex]?.cells[colIndex + neighbor])
        ) {
            return false; // At least one neighbor is selected
        }
    }
    return true; // No neighbors are selected
}

function maxSelectedCells() {
    const maxSelectedItemsInput = document.getElementById('max-selected-items');
    return Number(maxSelectedItemsInput?.value || 1);
}

function handleCellClick(table, cell) {
    const rowIndex = cell.parentElement.rowIndex;
    const colIndex = cell.cellIndex;

    if (selectedCells.has(cell)) {
        // Deselect the cell
        selectedCells.delete(cell);
        cell.style.backgroundColor = '';
    } else {
        // Check if max selected cells in row/column is reached
        if (
            countSelectedCellsInRow(rowIndex) < maxSelectedCells() &&
            countSelectedCellsInColumn(colIndex) < maxSelectedCells() &&
            areNeighborsUnselected(table, cell, rowIndex, colIndex)
        ) {
            // Select the cell
            selectedCells.add(cell);
            cell.style.backgroundColor = Number(cell.textContent) % 2 === 0 ? 'yellow' : 'lightblue';
        }
    }
}

function addRow(table, content) {
    const row = table.insertRow();
    const columnsLength = table.rows[0]?.cells?.length ?? 0;

    for (let i = 0; i < columnsLength; i++) {
        const cell = row.insertCell();
        cell.textContent = content?.at(i) ?? getRandomInt(0, 9).toString();
        cell.addEventListener('click', handleCellClick.bind(this, table, cell));
    }
}

function addColumn(table, content) {
    for (let i = 0; i < table.rows?.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.textContent = content?.at(i) ?? getRandomInt(0, 9).toString();
        cell.addEventListener('click', handleCellClick.bind(this, table, cell));
    }
}

function addRowsAndColumns(table, rows, columns) {
    for (let i = 0; i < rows; i++) {
        this.addRow(table);
    }

    for (let i = 0; i < columns; i++) {
        this.addColumn(table);
    }
}

function render(table, targetElement) {
    if (targetElement instanceof HTMLElement) {
        targetElement.appendChild(table);
    } else {
        throw new Error('Invalid target element');
    }
}

function clearTable(table) {
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

function transpose(table) {
    const rows = table.rows?.length ?? 0;
    const columns = table.rows[0]?.cells?.length ?? 0;
    const newData = [];

    for (let j = 0; j < rows; j++) {
        const newColumns = [];
        for (let i = 0; i < columns; i++) {
            newColumns.push(table.rows[j].cells[i].textContent);
        }
        newData.push(newColumns);
    }

    clearTable(table);
    for (let i = 0; i < columns; i++) {
        addRow(table);
    }

    for (const columnData of newData) {
        addColumn(table, columnData);
    }
}

function init() {
    let table = document.createElement('table');

    const tableSizeForm = document.forms.namedItem('table-size-form');

    const addRowButton = document.getElementById('add-row-button');
    const addColumnButton = document.getElementById('add-column-button');
    const transposeButton = document.getElementById('transpose-button');

    addColumnButton.addEventListener('click', (e) => {
        e.preventDefault();
        addColumn(table);
    });
    addRowButton.addEventListener('click', (e) => {
        e.preventDefault();
        addRow(table);
    });
    transposeButton.addEventListener('click', (e) => {
        e.preventDefault();
        selectedCells.clear();
        transpose(table);
    });

    tableSizeForm.onsubmit = (e) => {
        e.preventDefault();

        const tableSizeInput = document.getElementById('table-size');

        const tableSize = Number(tableSizeInput.value);
        table = document.createElement('table');
        addRowsAndColumns(table, tableSize, tableSize);
        render(table, document.getElementById('table-container'));

        tableSizeForm.style.display = 'none';

        document.getElementById('table-buttons-container').hidden = false;
    };
}

init();

