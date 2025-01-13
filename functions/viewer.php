<?php

function get_results ($results) {//print_r($results);
   // Преобразование данных в JSON
   //$jsonData = json_encode($results);

   // Выводим данные в JSON формате
   //echo $jsonData;

   // Преобразование в одномерный массив только с идентификаторами остановок
   $stopAreas = array_column($results, 'title');
   natsort($stopAreas);

   // Выводим массив идентификаторов
   
   $jsonData = json_encode($results, JSON_UNESCAPED_UNICODE);

   // Check for any errors in encoding
   if (json_last_error() !== JSON_ERROR_NONE) {
       echo 'Error encoding JSON: ' . json_last_error_msg();
       exit;
}
   return $jsonData;
}