function updateElementWithData(data, element, elementType = 'option') {
    // Очищаем элемент перед добавлением новых данных
    element.innerHTML = '';
    
    // Сортируем данные
    data.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

    // Добавляем элементы в нужный элемент в зависимости от типа
    data.forEach(item => {
        let newElement;
        if (elementType === 'option') {
            newElement = document.createElement('option');
            newElement.textContent = item.title;
        } else if (elementType === 'button') {
            newElement = document.createElement('button');
            newElement.textContent = item.title;
            newElement.addEventListener('click', () => handleButtonClick(newElement));
        } else if (elementType === 'list') {
            newElement = document.createElement('li');
            newElement.textContent = item.title;
        } else if (elementType === 'list_routes') {
            newElement = document.createElement('li');
            newElement.innerHTML = '<strong>' + item.title + '</strong> ' + item.route_long_name + ' ' + item.adjusted_date + ' ' + item.adjusted_time;
        }
        element.appendChild(newElement);
    });
}