<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
global $USER;

$TOKEN = '7523877036:AAHjl9LsmBpJhGJzjaIOgziJDUapxUSJiNI';


$ok = $USER->IsAuthorized();
if($ok){
    $id = $USER->GetID();


    $arParams["SELECT"] = Array("*", "UF_*");
    $filter = Array(
        "ID"=> $id
    );

    $rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
    $cUser = $rsUsers->GetNext();

    if($cUser && isset($cUser['UF_TELEGRAM_ID'])){
        $result['ok'] = true;
        echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}


$query = $_SERVER['QUERY_STRING'];
parse_str($query, $params);

$hash = '';

$strs = [];
foreach($params as $k => $v){
    if($k == 'hash') {
        continue;
    }
    $strs[$k] = $k . '=' . $v;
}

sort($strs);

$data_check_string = implode("\n", $strs);

$hash = $_GET['hash'];

$secret_key = hash_hmac('sha256', $TOKEN, "WebAppData", true);

$dataHash = hash_hmac('sha256', $data_check_string, $secret_key, true);

$calcHash= bin2hex($dataHash);

$isInitDataValid = $calcHash == $hash;


if(!$isInitDataValid){
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    $result['isInitDataValid'] = $isInitDataValid;
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$user = json_decode($_GET['user'], true);

if(!isset($user['id'])){
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