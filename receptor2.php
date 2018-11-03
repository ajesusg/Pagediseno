<?php
$connect=mysqli_connect("jesusdiseno.ciutsojishbs.us-east-1.rds.amazonaws.com","jesusdiseno","jesus199729","jesusdiseno");

$Fecha=$_POST["Fecha"];
$Latitud=$_POST["Latitud"];
$Longitud= $_POST["Longitud"];

mysqli_query($connect,"INSERT INTO datosdiseno (Latitud,Longitud,Fecha) VALUES('$Latitud','$Longitud','$Fecha')");
?>