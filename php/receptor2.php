<?php
$connect=mysqli_connect("jesusdiseno.ciutsojishbs.us-east-1.rds.amazonaws.com","jesusdiseno","jesus199729","jesusdiseno");

$Fecha=$_POST["Fecha"];
$Latitud=$_POST["Latitud"];
$Longitud= $_POST["Longitud"];
$RPM = $_POST["RPM"];

mysqli_query($connect,"INSERT INTO datosdiseno (Latitud,Longitud,Fecha,RPM) VALUES('$Latitud','$Longitud','$Fecha','$RPM')");
?>