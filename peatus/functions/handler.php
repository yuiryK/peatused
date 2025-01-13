<?php

function get_query($query_type, $p1, $p2, $p3) {
    // Декодируем параметры только один раз
    $parameter = urldecode($p1);
    $parameter2 = urldecode($p2);
	$parameter3 = urldecode($p3);

    // Массив для хранения запросов по типам
    $queries = [
        'regions' => 'SELECT DISTINCT stop_area AS title FROM stops ORDER BY stop_area;',
        'stops' => "SELECT DISTINCT stop_name AS title FROM stops WHERE stop_area = '$parameter' ORDER BY stop_name;",
        'buses' => "SELECT route_short_name AS title FROM routes WHERE route_id IN 
                    (SELECT DISTINCT route_id FROM trips WHERE trip_id IN 
                     (SELECT DISTINCT trip_id FROM stop_times WHERE stop_id IN 
                      (SELECT stop_id FROM stops WHERE stop_area = '$parameter' AND stop_name = '$parameter2'))) 
                    ORDER BY route_short_name;",
        'geolocation' => "SELECT stop_area, stop_name AS title, ST_Distance(location, ST_GeomFromText('POINT($parameter $parameter2)')) AS distance 
                          FROM stops ORDER BY distance LIMIT 1;",
        'bustime' => "SELECT arrival_time AS title FROM stop_times WHERE trip_id IN 
                      (SELECT trip_id FROM trips WHERE route_id IN 
                       (SELECT route_id FROM routes WHERE route_short_name = '$parameter3')) 
                      AND stop_id IN 
                      (SELECT stop_id FROM stops WHERE stop_area = '$parameter' AND stop_name = '$parameter2');",
	    'stoptime' => "SELECT  routes.route_short_name AS title, routes.route_long_name,
                       DATE_ADD(CURDATE(), INTERVAL FLOOR(HOUR(stop_times.arrival_time) / 24) DAY) AS adjusted_date,
                       CONCAT(LPAD(MOD(HOUR(stop_times.arrival_time), 24), 2, '0'), ':', LPAD(MINUTE(stop_times.arrival_time), 2, '0'), ':', LPAD(SECOND(stop_times.arrival_time), 2, '0')) AS adjusted_time
                       FROM stops
                       LEFT JOIN stop_times ON stops.stop_id = stop_times.stop_id
                       LEFT JOIN trips ON stop_times.trip_id = trips.trip_id
                       LEFT JOIN routes ON trips.route_id = routes.route_id
                       WHERE stops.stop_area = '$parameter' AND stops.stop_name = '$parameter2' AND TIME (stop_times.arrival_time) >= TIME (now())
                       ORDER BY adjusted_time
                       LIMIT 5;"
    ];

    // Возвращаем запрос, если он существует, или пустую строку по умолчанию
    return isset($queries[$query_type]) ? $queries[$query_type] : '';
}
?>
