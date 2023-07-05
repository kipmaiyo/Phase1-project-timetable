// JavaScript for index.html
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

  timetable.forEach(entry => {
    const row = document.createElement('tr');
    Object.values(entry).forEach(value => {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = value;
      cell.appendChild(input);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
}

