<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

define('AUTH_REQUIRED', true);

require_once (dirname(__DIR__,1) . '/local/header.php');

$arParams["SELECT"] = Array("UF_*");
$filter = Array(
    'ACTIVE' => 'Y'
);

$rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);

$list = [];

while($cUser = $rsUsers->GetNext()){
    $list[] = $cUser;
}

$result = [
    'ok' => true,
    'result' => $list,
    'dir' => dirname(__DIR__,1) . '/local/footer',
    'exists' => file_exists(__DIR__ . '/../local/header.php')
];


require_once (dirname(__DIR__,1) . '/local/footer.php');