<?php
header('Access-Control-Allow-Origin: localhost:4200');
header('Access-Control-Allow-Headers: Content-Type');


$code = $_GET['code'];
$scope = $_GET['scope'];

$client_id = "";
$scope = "https://www.googleapis.com/auth/generative-language.retriever";
$client_secret = "";
$redirect_uri = "http://localhost:8000/callback.php";
$url = "https://oauth2.googleapis.com/token";

$data = [
    'code' => $code,
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'redirect_uri' => $redirect_uri,
    'grant_type' => 'authorization_code'
];

$curl = curl_init($url);

curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_POSTFIELDS => http_build_query($data),

]);

$res = curl_exec($curl);
$error = curl_error($curl);

$response = json_decode($res, true);
?>

<script>
    const message = {
        type: 'google_token',
        token: '<?php echo($response['access_token']); ?>'
    };

    window.opener.postMessage(message, 'http://localhost:4200');

    window.close();
</script>
