<?php
$conexion = mysqli_connect("localhost", "root", "jesus199729", "jesusdiseno");
$desde = $_POST['desde'];
$hasta = $_POST['hasta'];

//COMPROBAMOS QUE LAS FECHAS EXISTAN
if(isset($desde)==false){
	$desde = $hasta;
}

if(isset($hasta)==false){
	$hasta = $desde;
}

//EJECUTAMOS LA CONSULTA DE BUSQUEDA
$registro = mysqli_query($conexion, "SELECT * FROM datosdiseno WHERE Fecha BETWEEN '$desde' AND '$hasta' ORDER BY ID ASC");
if(mysqli_num_rows($registro)>0){
	while($registro2 = mysqli_fetch_array($registro)){
        $RPm = $registro2['RPM'];
        $fecha = $registro2['Fecha'];
        $quit = array (" ");
        $colc = array ("");
        $RPm = str_replace($quit, $colc, $RPm);
        $RPm = substr($RPm, -4);
        $RPm = hexdec($RPm);
        $RPm = $RPm/4;
		echo $RPm, " ",$fecha;
        echo "\n";
	}
        }else{
	echo 'No se encontraron resultados';
}
?>