
document.addEventListener('keydown', (event) => {
    const target = event.target;
    if (target.matches('#regions, #stops') && ['Delete', 'Backspace', 'ArrowLeft'].includes(event.key)) {
        target.value = '';
        event.preventDefault();
    }
});

function resetAllFields() {
    ['regions', 'stops'].forEach(id => {
        document.getElementById(id).value = '';
    });

    ['buses', 'time', 'routes'].forEach(id => {
        document.getElementById(id).innerHTML = id === 'time' ? '<li>Timetable</li>' : '';
    });
}

function fetchDataForSelection(urlSuffix, element, type = 'option') {
    const region = document.getElementById('regions').value;
    const stop = document.getElementById('stops') ? document.getElementById('stops').value : null;
    const url = encodeURI(`https://peatus.metaler.com.ua/${urlSuffix}${region}${stop ? '/' + stop : ''}`);
	//alert(url);
    fetchData(url, element, type);
}

function handleButtonClick(btn) {
    const region = document.getElementById('regions').value;
    const stop = document.getElementById('stops').value;
    const bus = btn.textContent;
    const time = document.getElementById('time');
    const url = encodeURI(`https://peatus.metaler.com.ua/bustime/${region}/${stop}/${bus}`);
	//alert(url);
    fetchData(url, time, 'list');
}