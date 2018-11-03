<?php
	$servername = "localhost";
    $username = "root";
    $password = "jesus199729";
    $dbname = "jesusdiseno";
    // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
       	// Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "SELECT ID, Latitud, Longitud, Fecha FROM datosdiseno2 ORDER BY ID DESC LIMIT 1";
        $resultado = $conn->query($sql);
        $fila = mysqli_fetch_row($resultado);

        $result = $fila[0]."\n".$fila[1]."\n".$fila[2]."\n".$fila[3]."\n";  
        echo $result;
        $conn->close();      
?>

