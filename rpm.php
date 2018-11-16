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
        $sql = "SELECT  RPM FROM datosdiseno ORDER BY ID DESC LIMIT 1";
        $resultado1 = $conn->query($sql);
        $fila = mysqli_fetch_row($resultado1);
        $fila4 = $fila[0];
        $rpm = $fila4;
        $quit = array (" ");
        $colc = array ("");
        $rpm = str_replace($quit, $colc, $rpm);
        $rpm = substr($rpm, -4);
        $rpm = hexdec($rpm);
        $rpm = $rpm/4;
        $result1 = $rpm."\n";  
        echo $result1;
        $conn->close();      
?>