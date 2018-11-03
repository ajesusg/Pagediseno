<?php
$conexion = mysqli_connect("localhost", "root", "jesus199729", "jesusdiseno");
function fechaNormal($fecha){
		$nfecha = date('d/m/Y H:i:s',strtotime($fecha));
		return $nfecha;
}
$desde = $_POST['desde'];
$hasta = $_POST['hasta'];

//COMPROBAMOS QUE LAS FECHAS EXISTAN
if(isset($desde)==false){
	$desde = $hasta;
    
}

if(isset($hasta)==false){
	$hasta = $desde;
}
$quit = array ("T");
$colc = array (" ");
$desde = str_replace($quit, $colc, $desde);
$hasta = str_replace($quit, $colc, $hasta);
//EJECUTAMOS LA CONSULTA DE BUSQUEDA
$registro = mysqli_query($conexion, "SELECT * FROM datosdiseno WHERE Fecha BETWEEN '$desde' AND '$hasta' ORDER BY ID ASC");

//CREAMOS NUESTRA VISTA Y LA DEVOLVEMOS AL AJAX

echo '<table class="table table-striped table-condensed table-hover">
        	<tr>
            	<th width="150">ID</th>
                <th width="200">Latitud</th>
                <th width="150">Longitud</th>
                <th width="300">Fecha</th>
            </tr>';
if(mysqli_num_rows($registro)>0){
	while($registro2 = mysqli_fetch_array($registro)){
		echo '<tr>
				<td>'.$registro2['ID'].'</td>
				<td>'.$registro2['Latitud'].'</td>
				<td>'.$registro2['Longitud'].'</td>
				<td>'.fechaNormal($registro2['Fecha']).'</td>
				</tr>';
	}
}else{
	echo '<tr>
				<td colspan="6">No se encontraron resultados</td>
			</tr>';
}
echo '</table>';
?>