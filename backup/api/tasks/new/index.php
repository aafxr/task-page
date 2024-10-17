<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

define("UF_FIELD_RESULT", "UF_AUTO_280393729397");
define("UF_FIELD_SUCCESS", "UF_AUTO_251545709641");

global $APPLICATION;
global $DB;
global $USER;
$userId = $USER->GetID();

if (!is_object($USER)) $USER = new CUser;



$ok = $USER->IsAuthorized();
if(!$ok){
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$entityBody = file_get_contents('php://input');
$request = json_decode($entityBody,true);

$result = [];

if (CModule::IncludeModule("tasks")) {
    $obTask = new CTasks;
    $ID = $obTask->Add($request);
    $success = ($ID>0);
    if($success)
    {
        $rsTask = CTasks::GetByID($ID);
        $arTask = $rsTask->GetNext();
        $result = [
            'ok' => true,
            'task' => $arTask,
            'request' => $request
        ];
    }
    else
    {
        $result = [
            'ok' => false,
            'request' => $request,
            'message' => 'something goes wrong'
        ];
        if($e = $APPLICATION->GetException())
            $result['message'] =  "Error: ".$e->GetString();
    }
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
