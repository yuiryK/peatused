function getGeolocation() {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const result = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            message: "Геолокация успешно получена."
                        };
                        resolve(result);
                    }, function(error) {
                        let errorMessage;
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = "Пользователь отклонил запрос на геолокацию.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = "Не удалось получить местоположение.";
                                break;
                            case error.TIMEOUT:
                                errorMessage = "Истекло время ожидания запроса геолокации.";
                                break;
                            case error.UNKNOWN_ERROR:
                                errorMessage = "Неизвестная ошибка.";
                                break;
                        }
                        reject({ latitude: null, longitude: null, message: errorMessage });
                    });
                } else {
                    reject({ latitude: null, longitude: null, message: "Геолокация не поддерживается этим браузером." });
                }
            });
        }
         function fetchGeolocation() {
    return new Promise((resolve, reject) => {
        getGeolocation().then((result) => {
            if (result.latitude !== null && result.longitude !== null) {
                alert(`Широта: ${result.latitude}, Долгота: ${result.longitude}`);
                resolve(result); // Resolve the promise with the result
            } else {
                alert(result.message);
                reject(result.message); // Reject the promise with the error message
            }
        }).catch((error) => {
            alert(error.message);
            reject(error.message); // Reject the promise with the error message
        });
    });
}

