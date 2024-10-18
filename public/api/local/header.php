<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once(__DIR__ . '/utils/initDataValidate.php');

$TOKEN = '7523877036:AAHjl9LsmBpJhGJzjaIOgziJDUapxUSJiNI';


global $USER;
if (!is_object($USER)) $USER = new CUser;

$AUTH_REQUIRED = defined('AUTH_REQUIRED');

$ok = $USER->IsAuthorized();

$result = [];


if($AUTH_REQUIRED && !$ok){
    $query = $_GET['initData'];
    $cUser = false;

    if(initDataValidate($query, $TOKEN)){
        parse_str($query, $params);
        $user = $params['user'];
        if($user) {
            $user = json_decode($user, true);
            $arParams["SELECT"] = Array("*", "UF_*");
            $filter = Array( "UF_TELEGRAM_ID"=> $_GET[$user['id']] );
            $rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
            $cUser = $rsUsers->GetNext();
        }
    }

    if($cUser == false){
        http_response_code(401);
        $result['ok'] = false;
        $result['message'] = 'unauthorized';
        echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    $USER->Authorize($cUser['ID']);
}

$request = file_get_contents('php://input');
if($request){
    $request = json_decode($request, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}