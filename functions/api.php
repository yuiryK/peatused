<?php

require 'handler.php';
require 'db.php';
require 'viewer.php';

header('Content-Type: application/json');

// Получаем параметры запроса
$query_type = $_GET['param1'];
$param1 = $_GET['param2'];
$param2 = $_GET['param3'];
$param3 = $_GET['param4'];


// Обработчик маршрута
switch ($query_type) {
    case 'regions':
    case 'stops':
    case 'buses':
    case 'geolocation':
    case 'bustime':
	case 'stoptime':
        // Для всех этих типов запросов выполняем одинаковую логику
        $query = get_query($query_type, $param1, $param2, $param3);
        $results = executeQuery($query);
        print_r(get_results($results));
        break;
    
    default:
        // Если маршрут не найден, выводим ошибку
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
        break;
}
