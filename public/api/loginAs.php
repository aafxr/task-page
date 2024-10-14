<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

global $USER;
if (!is_object($USER)) $USER = new CUser;

$result = ['ok' => false];

$userId = $_GET['id'];


if($userId && $USER->Authorize($userId)){
    $result['ok'] = true;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
