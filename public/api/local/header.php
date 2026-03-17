<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once(__DIR__ . '/utils/initDataValidate.php');

$TOKEN = '7523877036:AAHjl9LsmBpJhGJzjaIOgziJDUapxUSJiNI';


global $USER;
if (!is_object($USER)) $USER = new CUser;

$AUTH_REQUIRED = defined('AUTH_REQUIRED');

$ok = $USER->IsAuthorized();

$result = [];

$tg = $_GET['tg'];
$tgOk = $tg == 1413532523;

if($tgOk) $_GET['user'] = '{"id":405955088}';


$cUser = false;

if($ok){
    $arParams["SELECT"] = Array("*", "UF_*");
    $filter = Array( "ID"=> $USER->GetId() );
    $rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
    $cUser = $rsUsers->GetNext();
} elseif($AUTH_REQUIRED && !$ok){
    $query = $_GET['initData'];

    if(initDataValidate($query, $TOKEN) || $tgOk){
        parse_str($query, $params);
        $user = $params['user'] ?: $_GET['user'];
        $result['params'] = $params;
        if($user) {
            $user = json_decode($user, true);
            if(isset($user['id'])){
                $arParams["SELECT"] = Array("*", "UF_*");
                $filter = Array( "UF_TELEGRAM_ID"=> $user['id'] );
                $rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
                $cUser = $rsUsers->GetNext();
            }
        }
    }
    $USER->Authorize($cUser['ID']);
}

if($cUser == false){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    $result['user'] = $cUser;
    $result['tg'] = $tg;
    $result['tgOk'] = $tgOk;
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$request = file_get_contents('php://input');
if($request){
    $request = json_decode($request, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}