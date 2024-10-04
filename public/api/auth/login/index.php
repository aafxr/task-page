<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
global $USER;

if (!is_object($USER)) $USER = new CUser;

$TOKEN = '7523877036:AAHjl9LsmBpJhGJzjaIOgziJDUapxUSJiNI';


$result = [];

if( !isset($_GET['auth_date']) || !isset($_GET['query_id']) || !isset($_GET['user']) || !isset($_GET['hash']) ){
     http_response_code(401);
     $result['ok'] = false;
     $result['message'] = 'unauthorized';
     echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
     exit;
 }



$strs = [];
$strs['auth_date'] = 'auth_date=' . $_GET['auth_date'];
$strs['query_id'] = 'query_id=' . $_GET['query_id'];
$strs['user'] = 'user=' . $_GET['user'];

sort($strs);

$data_check_string = implode("\n", $strs);

$hash = $_GET['hash'];

$secret_key = hash_hmac('sha256', $TOKEN, "WebAppData", true);

$dataHash = hash_hmac('sha256', $data_check_string, $secret_key, true);

$calcHash= bin2hex($dataHash);

$isInitDataValid = $calcHash == $hash;


if(!$isInitDataValid){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$user = json_decode($_GET['user'], true);

if(!isset($user['id'])){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}


$arParams["SELECT"] = Array("*", "UF_*");
$filter = Array(
    "UF_TELEGRAM_ID"=> $user['id']
);

$rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
$cUser = $rsUsers->GetNext();

if($cUser != false){
//     $user->Authorize($cUser['ID']);
    $result = [
        'ok' => true,
        'user' => $cUser,
        'auth' => $USER->Authorize($cUser['ID'])
    ];
} else{
    $result = [
        'ok' => false,
        'message' => 'unauthorized'
    ];
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

