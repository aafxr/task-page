<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

global $USER;
if (!is_object($USER)) $USER = new CUser;

$AUTH_REQUIRED = defined('AUTH_REQUIRED');

$ok = $USER->IsAuthorized();

$result = [];

if($AUTH_REQUIRED && !$ok){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$request = file_get_contents('php://input');
if($request){
    $request = json_decode($request, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}