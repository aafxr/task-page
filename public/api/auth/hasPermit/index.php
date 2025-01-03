<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once(dirname(__DIR__, 2) . '/local/utils/initDataValidate.php');

global $USER;
if (!is_object($USER)) $USER = new CUser;

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
        $result['user'] = $cUser;
        echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}


$query = $_SERVER['QUERY_STRING'];
parse_str($query, $params);


$isInitDataValid = initDataValidate($query, $TOKEN);


if(!$isInitDataValid){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    $result['isInitDataValid'] = $isInitDataValid;
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
    $result = [
        'ok' => true,
        'user' => $cUser,
        'auth' => $USER->Authorize($cUser['ID'])
    ];
} else{
    http_response_code(401);
    $result = [
        'ok' => false,
        'message' => 'unauthorized'
    ];
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);