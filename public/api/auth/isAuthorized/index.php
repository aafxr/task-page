<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

global $USER;


$ok = $USER->IsAuthorized();
if(!$ok){
    $result['ok'] = $ok;
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$id = $USER->GetID();


$arParams["SELECT"] = Array("*", "UF_*");
$filter = Array(
    "ID"=> $id
);

$rsUsers = CUser::GetList(($by="id"), ($order="desc"), $filter,$arParams);
$cUser = $rsUsers->GetNext();

if(!$cUser || !isset($cUser['UF_TELEGRAM_ID'])){
    $result['ok'] = false;
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$result['ok'] = $ok;

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);