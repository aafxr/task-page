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

if(!isset($request["TITLE"]) || !isset($request["DESCRIPTION"]) || !isset($request["RESPONSIBLE_ID"])) {
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'не указано одно из полей: заголовок, описание, ответственный';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$result = [];

if (CModule::IncludeModule("tasks")) {
    $obTask = new CTasks;
    $task = [
        "DESCRIPTION"=> $request["DESCRIPTION"],
        "RESPONSIBLE_ID"=> $request["RESPONSIBLE_ID"],
        "STATUS"=> $request["STATUS"],
        "TITLE"=> $request["TITLE"],
        "UF_AUTO_251545709641"=> $request["UF_AUTO_251545709641"],
        "UF_AUTO_851551329931"=> $request["UF_AUTO_851551329931"],
        "UF_TASK_TIME"=> $request["UF_TASK_TIME"],
    ];
    if($request["DEADLINE"])
        $task["DEADLINE"] = \Bitrix\Main\Type\DateTime::createFromPhp( new \DateTime($request["DEADLINE"]));

    $ID = $obTask->Add($task);
    $success = ($ID>0);
    if($success)
    {
        $rsTask = CTasks::GetByID($ID);
        $arTask = $rsTask->GetNext();

        if($arTask['CREATED_DATE']) $arTask['CREATED_DATE'] = (new \DateTime($arTask['CREATED_DATE']))->format('Y-m-d\TH:i:s.u\Z');
        if($arTask['CHANGED_DATE']) $arTask['CHANGED_DATE'] = (new \DateTime($arTask['CHANGED_DATE']))->format('Y-m-d\TH:i:s.u\Z');
        if($arTask['CLOSED_DATE']) $arTask['CLOSED_DATE'] = (new \DateTime($arTask['CLOSED_DATE']))->format('Y-m-d\TH:i:s.u\Z');
        if($arTask['DEADLINE']) $arTask['DEADLINE'] = (new \DateTime($arTask['DEADLINE']))->format('Y-m-d\TH:i:s.u\Z');



        $result = [
            'ok' => true,
            'result' => $arTask,
            'request' => $request
        ];
    }
    else
    {
        $result = [
            'ok' => false,
            'request' => $request,
            'message' => 'something goes wrong',
        ];
        if($e = $APPLICATION->GetException())
            $result['message'] =  "Error: ".$e->GetString();
    }
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
