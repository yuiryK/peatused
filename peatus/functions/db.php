<?php


// Конфигурация подключения
$host = 'yv542071.mysql.tools';
$dbname = 'yv542071_peatus';
$username = 'yv542071_peatus';
$password = '45_KAuj5i;';

// Подключение к базе данных через PDO
function getDbConnection() {
    global $host, $dbname, $username, $password;
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
        exit();
    }
}

function executeQuery ($query) {
    // Выполнение SELECT-запроса
    //$query = 'SELECT DISTINCT stop_area FROM stops ORDER BY stop_area;';
    try {
        $conn = getDbConnection();
        $stmt = $conn->prepare($query);  // Подготовка запроса
        $stmt->execute();  // Выполнение запроса

        // Получение результатов
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Вывод результатов
//echo "<pre>";
//print_r($results);
//echo "</pre>";
    } catch (PDOException $e) {
        echo 'Query failed: ' . $e->getMessage();
        return false;
    }
    return $results;
}
?>
