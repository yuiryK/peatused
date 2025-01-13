async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Сетевая ошибка');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
    }
}

async function fetchData(url, element, elementType = 'option') {
    try {
        const data = await fetchJsonData(url);
        updateElementWithData(data, element, elementType);
    } catch (error) {
        element.innerHTML = '<option>Ошибка '+ error.message + ' </option>';
    }
}		