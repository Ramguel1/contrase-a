<?php
require_once "si.php";
$response = ['success' => false, 'mensaje' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    
    if ($action === 'add') {
        $responce = ["success" => false, "mensaje" => ""];

        if ($_POST) {
            $usuario = $_POST['nombre'];
            $correo = $_POST['correo'];
            $contra =md5( $_POST['contra']); 

            if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                $responce['mensaje'] = "Correo electrónico no válido.";
                echo json_encode($responce);
                exit; 
            }

            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $imgName = $_FILES['imagen']['name'];
                $imgTmpName = $_FILES['imagen']['tmp_name'];
                $imgSize = $_FILES['imagen']['size'];

                $allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
                $imgExt = strtolower(pathinfo($imgName, PATHINFO_EXTENSION));

                if (in_array($imgExt, $allowedExt) && $imgSize <= 5000000) { 
                    $newImgName = uniqid("IMG-", true) . '.' . $imgExt;
                    $imgUploadPath = '../post/img/' . $newImgName;

                    if (move_uploaded_file($imgTmpName, $imgUploadPath)) {

                        $sql = "INSERT INTO usuario VALUES ('null','$correo', '$contra', '$usuario', '$newImgName')";
                        if ($cx->query($sql)) {
                            $responce['success'] = true;
                        } else {
                            $responce['success'] = false;
                            $responce['mensaje'] = "Error al insertar en la base de datos";
                        }
                    } else {
                        $responce['success'] = false;
                        $responce['mensaje'] = "Error al mover la imagen";
                    }
                } else {
                    $responce['success'] = false;
                    $responce['mensaje'] = "Formato de imagen no permitido o tamaño demasiado grande";
                }
            } else {
                $responce['success'] = false;
                $responce['mensaje'] = "Error al cargar la imagen";
            }
        }

        echo json_encode($responce);
    }
     if($action === 'login'){
        $correo = $_POST['$email'];
        $password = md5($_POST['password']);

        $check = "SELECT * FROM usuario WHERE correo='$email' AND password='$password'";
        $res = $cx->query($check);

        if ($res->num_rows > 0) {
            $responce['success'] = true;
            $responce['mensaje'] = "dentro";
        } else {
            $responce['mensaje'] = "correo o contraseña incorrecta";
        }
    }
}
?>