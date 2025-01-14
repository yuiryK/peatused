<?php

function get_results ($results) {
   $stopAreas = array_column($results, 'title');
   natsort($stopAreas);
   $jsonData = json_encode($results, JSON_UNESCAPED_UNICODE);
   // Check for any errors in encoding
   if (json_last_error() !== JSON_ERROR_NONE) {
       echo 'Error encoding JSON: ' . json_last_error_msg();
       exit;
}
   return $jsonData;
}