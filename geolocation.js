function getGeolocation() {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const result = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            message: "Successful."
                        };
                        resolve(result);
                    }, function(error) {
                        let errorMessage;
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = "The user denied the request for geolocation.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = "Failed to retrieve location.";
                                break;
                            case error.TIMEOUT:
                                errorMessage = "The geolocation request timed out.";
                                break;
                            case error.UNKNOWN_ERROR:
                                errorMessage = "An unknown error occurred";
                                break;
                        }
                        reject({ latitude: null, longitude: null, message: errorMessage });
                    });
                } else {
                    reject({ latitude: null, longitude: null, message: "Geolocation is not supported by this browser" });
                }
            });
        }
         function fetchGeolocation() {
    return new Promise((resolve, reject) => {
        getGeolocation().then((result) => {
            if (result.latitude !== null && result.longitude !== null) {
                //alert(`Широта: ${result.latitude}, Долгота: ${result.longitude}`);
                resolve(result); // Resolve the promise with the result
            } else {
                //alert(result.message);
                reject(result.message); // Reject the promise with the error message
            }
        }).catch((error) => {
            alert(error.message);
            reject(error.message); // Reject the promise with the error message
        });
    });
}

