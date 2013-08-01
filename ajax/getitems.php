<?php

/**
  * Slightly modified version of the Getter example that came with the Fuego installation
  *
 */
 
require(__DIR__ . '../../init.php');
use OpenFuego\app\Getter as Getter;

$quantity = (isset($_REQUEST['fuegoQuantity']) ? $_REQUEST['fuegoQuantity'] : 20); 
$hours = (isset($_REQUEST['fuegoHours']) ? $_REQUEST['fuegoHours'] : 24);
$scoring = (isset($_REQUEST['fuegoScoring']) ? $_REQUEST['fuegoScoring'] : TRUE);
$metadata = (isset($_REQUEST['feugoMetadata']) ? $_REQUEST['feugoMetadata'] : TRUE);

$fuego = new Getter();
$items = $fuego->getItems($quantity, $hours, $scoring, $metadata); // quantity, hours, scoring, metadata

echo json_encode($items);

?>