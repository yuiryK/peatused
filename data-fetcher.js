async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error retrieving data: ' + error.message);
    }
}

async function fetchData(url, element, elementType = 'option') {
    try {
        const data = await fetchJsonData(url);
        updateElementWithData(data, element, elementType);
    } catch (error) {
        element.innerHTML = '<option>Error '+ error.message + ' </option>';
    }
}		