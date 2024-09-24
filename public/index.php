<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

$user = new CAllUser;
if (!$user->IsAuthorized()) {
    $returnUrl = '/pub/test/';
    header("Location: /auth/?returnUrl=$returnUrl");
    exit; //  Прекратить выполнение скрипта
}

echo file_get_contents("index.html");