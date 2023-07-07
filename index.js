
document.addEventListener('DOMContentLoaded', fetchTimetable);

async function fetchTimetable() {
  try {
    const response = await fetch('http://localhost:3000/timetable');
    const timetable = await response.json();
    populateTimetable(timetable);
  } catch (error) {
    console.error('Error fetching timetable:', error);
  }
}

function populateTimetable(timetable) {
  const table = document.getElementById('timetable');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Create table headers
  const headerRow = document.createElement('tr');
  const timeHeader = document.createElement('th');
  timeHeader.textContent = 'Time';
  headerRow.appendChild(timeHeader);
  days.forEach(day => {
    const dayHeader = document.createElement('th');
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  });
  table.appendChild(headerRow);

  // Populate table with timetable data
  timetable.forEach(entry => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = entry.time;
    row.appendChild(timeCell);

    days.forEach(day => {
      const dayCell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = entry[day.toLowerCase()];
      dayCell.appendChild(input);
      row.appendChild(dayCell);
    });

    table.appendChild(row);
  });
}

function saveData() {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = '<h2>This is your schedule for the week</h2>';

  const timetable = document.getElementById('timetable');
  const rows = timetable.querySelectorAll('tr');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Create table for form data
  const formDataTable = document.createElement('table');
  formDataTable.className = 'form-data-table';

  // Create table headers for form data table
  const headerRow = document.createElement('tr');
  const timeHeader = document.createElement('th');
  timeHeader.textContent = 'Time';
  headerRow.appendChild(timeHeader);
  days.forEach(day => {
    const dayHeader = document.createElement('th');
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  });
  formDataTable.appendChild(headerRow);

  // Populate form data table with entered values
  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    const rowData = [];

    cells.forEach((cell, cellIndex) => {
      if (cellIndex === 0) {
        const time = cell.textContent;
        rowData.push(time);
      } else {
        const input = cell.querySelector('input');
        rowData.push(input.value);
      }
    });

    const formDataRow = document.createElement('tr');
    rowData.forEach(value => {
      const dataCell = document.createElement('td');
      dataCell.textContent = value;
      formDataRow.appendChild(dataCell);
    });

    formDataTable.appendChild(formDataRow);
  });

  formContainer.appendChild(formDataTable);
}

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  saveData();
});









