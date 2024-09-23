<?php

//  Параметры приложения
$appId = 'local.66e8157796ac20.51812249'; //  Идентификатор приложения
$secretKey = 'HQIV1Yd2UvfFtMxnt6zQRwqK8QJlBn0xd8sRLzXg6hS0wvqfbn'; //  Секретный ключ
$redirectUri = 'https://crm.refloor-nsk.ru/pub/test/'; //  URL перенаправления
$state = "PZ54PEoLSihVjGxzRBKOZsjBbR99"

$code = isset($_GET['code']) ? $_GET['code'] : null;

if(!$code){
    // first step of auth ------------------------------------------------------------------------------------
    $authUrl = 'https://portal.bitrix24.com/oauth/authorize/?client_id= ' . $client_id . '&state=' . $state

    $curl = curl_init($authUrl)

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
    ])

     $response = curl_exec($curl);
     curl_close($curl);

     $code = ''
     $response = json_decode($response, true);

    // first step of auth ------------------------------------------------------------------------------------
}




if ($code) {
  //  Обмен кода авторизации на токен доступа
  $tokenUrl = 'https://oauth.bitrix24.com/oauth/token';
  $tokenData = [
    'grant_type' => 'authorization_code',
    'client_id' => $appId,
    'client_secret' => $secretKey,
    'code' => $code,
    'redirect_uri' => $redirectUri,
  ];

  $curl = curl_init($tokenUrl);
  curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $tokenData,
  ]);
  $response = curl_exec($curl);
  curl_close($curl);

  $token = json_decode($response, true);

  //  Сохранение токена доступа
  //  ...

  //  Использование токена доступа для выполнения запросов к Bitrix24 API
  //  ...
} else {
  //  Перенаправление на страницу авторизации Bitrix24
  $authUrl = 'https://oauth.bitrix24.com/oauth/authorize?' . http_build_query([
    'client_id' => $appId,
    'response_type' => 'code',
    'redirect_uri' => $redirectUri,
  ]);

  header('Location: ' . $authUrl);
}

?>