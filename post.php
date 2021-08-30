<?  

      $host="localhost";
	  $port=3306;
	  $socket="";
	  $user="root";
	  $password="";
	  $dbname="registro";
	  
	  $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
		  or die ('Could not connect to the database server' . mysqli_connect_error());
	  
		
	if( isset($_POST["nombre"])&& isset($_POST["email"]) && isset($_POST["pwd"]))
	{	

		$result = mysqli_query($con, "SELECT * FROM tbl_registros  where nombre='$nombre' and correo= '$email'"); 

		if(mysqli_num_rows($result)>0)
        {
			$Estadoregistro="No se puedo realizar la operacion porque ya existe un registro con estos datos";
			$html= '<html lang="en">
				<head><meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
					<title>Cliente servidor</title>
				</head>
				<body>
					<h2 style="text-align: center">Resultado</h2>
					<br><br>
					<div class="container">
					<div class="row">
						<div class="col">
						</div>
						<div class="col">
							<div class="form-group">
								<p>'.$Estadoregistro.' <b></b></p>
								<p>Para volver da click <a href="../welcome/index1.html">aqui</a></p>
							</div>
						</div>
						<div class="col">
						</div>
					</div>
					</div>
				</body>
				</html>';
		echo $html;

        }else{
			//insertar en la base de datos
			
			
			$nombre=$_POST["nombre"];
			$pass=$_POST["pwd"];
			$email=$_POST["email"];

			$sql = "INSERT INTO tbl_registros (nombre, contrasena, correo) VALUES ('".$nombre."', '".$pass."', '".$email."')";

			if (mysqli_query($con, $sql)) {
				$Estadoregistro="Nuevo registro creado satisfactoriamente";
				$html= '<html lang="en">
						<head><meta charset="utf-8">
							<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
							<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
							<title>Cliente servidor</title>
						</head>
						<body>
							<h2 style="text-align: center">Resultado</h2>
							<br><br>
							<div class="container">
							<div class="row">
								<div class="col">
								</div>
								<div class="col">
									<div class="form-group">
										<p>'.$Estadoregistro.' <b></b></p>
										<p>Para volver da click <a href="../welcome/index1.html">aqui</a></p>
									</div>
								</div>
								<div class="col">
								</div>
							</div>
							</div>
						</body>
						</html>';
				echo $html;
			} else {
				$Estadoregistro="Hubo un error";
					$html= '<html lang="en">
						<head><meta charset="utf-8">
							<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
							<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
							<title>Cliente servidor</title>
						</head>
						<body>
							<h2 style="text-align: center">Resultado</h2>
							<br><br>
							<div class="container">
							<div class="row">
								<div class="col">
								</div>
								<div class="col">
									<div class="form-group">
										<p>'.$Estadoregistro.' <b></b></p>
										<p>Para volver da click <a href="../welcome/index1.html">aqui</a></p>
									</div>
								</div>
								<div class="col">
								</div>
							</div>
							</div>
						</body>
						</html>';
				echo $html;
			}

		}
		
		
	}

	$con->close();
?>
	


