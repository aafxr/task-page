<?php

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

define("UF_FIELD_RESULT", "UF_AUTO_280393729397");
define("UF_FIELD_SUCCESS", "UF_AUTO_251545709641");

global $APPLICATION;
global $DB;
global $USER;
$userId = $USER->GetID();

if (!is_object($USER)) $USER = new CUser;


$ok = $USER->IsAuthorized();
if (!$ok) {
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$userId = $USER->GetID();


$result = [];


if (isset($_POST['request'])) {
    $request = json_decode($_POST['request'], true);
}

if (!isset($request) || !$request['task']) {
    http_response_code(400);
    $result = [
        'ok' => false,
        'message' => "fields taskId, taskNextTypeId are require \n taskClosePrevDate - optional"
    ];
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}


$task = $request['task'];
$nextTask = $request['nextTask'];
//$taskNextTypeId = (int)$request['taskNextTypeId'];

$taskId = (int)$task['ID'];

$arTask = CTasks::GetList([], ['ID' => $taskId], ['*', 'UF_*'])->fetch();

$updateTaskFields = [];
foreach ($task as $k => $v) {
    if (array_key_exists($k, $arTask) && $arTask[$k] != $task[$k]) $updateTaskFields[$k] = $v;
}


if ($nextTask) {
    $arNextTask = [];
    foreach ($nextTask as $k => $v) {
        $arNextTask[$k] = $v;
    }
    $arNextTask['TITLE'] = $arTask['TITLE'];
    $arNextTask['CREATE_DATE'] = date(DATE_ATOM);
}


$result['ok'] = true;
$result['errors'] = [];

$DB->StartTransaction();

$updateResult = true;
// -------------------- update task ----------------------------------
if(count($updateTaskFields) > 0){
    $obTask = new CTasks;
    $updateResult = $obTask->Update($taskId, $task);

    if (!$updateResult) {
        if ($e = $APPLICATION->GetException()) {
            $result['errors'][] = $e->GetString();
        }
    }

    $oTaskItem = new CTaskItem($taskId, $userId);
    $oTaskItem->complete();
}

$log = date("d.m.Y H:i:s") . PHP_EOL;
$log .= "Request:<pre>" . print_r($request, true) . "</pre>";
file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/local/log/close/taskClose_" . $taskId . ".log", $log, FILE_APPEND);

// -------------------- update task end ------------------------------


// -------------------- update next task ----------------------------------
if ($arNextTask) {
    $log = date("d.m.Y H:i:s") . PHP_EOL;
    $log .= "Request:<pre>" . print_r($nextTask, true) . "</pre>";
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/local/log/close/taskClose_" . $taskId . ".log", $log, FILE_APPEND);

    $rsAdd = CTaskItem::add($arNextTask, $userId);

    if ($ID = $rsAdd->getId()) {
        $nextTaskId = $ID;
        $obTask->Update($taskId, ['UF_NEXT_TASK' => $ID]);
        $arTask['UF_NEXT_TASK'] = $ID;
    } else {
        $result['errors'][] = "next task not created\n";
        $result['ok'] = false;
        $nextTaskId = false;
    }
}
// -------------------- update next task end ------------------------------

// close transaction
if (count($result['errors']) > 0) {
    $result['ok'] = false;
    $DB->Rollback();
} else {
    $DB->Commit();
}


if ($request['taskClosePrevDate']) {
    $taskEntity = new Bitrix\Tasks\Internals\TaskTable();
    $closedDate = new \DateTime(date("Y-m-d"));
    $closedDate->modify('-1 day');
    $bxDateTime = new \Bitrix\Main\Type\DateTime($closedDate->format("d.m.Y"));

    $rs = $taskEntity::update($taskId,
        [
            'STATUS' => CTasks::STATE_COMPLETED,
            'CLOSED_DATE' => $bxDateTime,
        ]
    );
    $result['calc']['closed_date'] = $bxDateTime;
}


if (isset($arTask['UF_CRM_TASK']) && is_array($arTask['UF_CRM_TASK']) && count($arTask['UF_CRM_TASK']) > 0){
    $companyId = preg_replace("/[^0-9]/", '', $arTask['UF_CRM_TASK'][0]);
    $arCompany = CCrmCompany::GetList([], ["ID" => $companyId])->fetch();
}

if(!$arCompany && !empty($_FILES)){
    $result['errors'][] = "files not saved, because company not found\n";
}


if (\Bitrix\Main\Loader::includeModule('disk') && !empty($_FILES) && $companyId) {
    $driver = \Bitrix\Disk\Driver::getInstance();
    $storage = $driver->getStorageByCommonId('shared_files_s1');
    if ($storage) {
        $folderCrm = $storage->getChild(
            array(
                '=NAME' => 'CRM',
                'TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE_FOLDER
            )
        );
        if ($folderCrm) {
            $folderEntityNameId = '*[C' . $companyId . ']';
            $folderEntity = $folderCrm->getChild(
                [
                    'NAME' => "%" . $folderEntityNameId,
                    'TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE_FOLDER
                ]
            );

            if (!$folderEntity) {
                $folderEntity = $folderCrm->addSubFolder([
                    'NAME' => $arCompany['TITLE'] . ' ' . '[C' . $companyId . ']',
                    'CREATED_BY' => 1
                ]);
            }

            if ($folderEntity) {
                $result['created_files'] = [];
                foreach ($_FILES as $fileKey => $file) {
                    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                    $fileName = $file['name'] . '.' . $ext;
                    $file = $folderEntity->uploadFile($file, array(
                        'NAME' => $fileName,
                        'CREATED_BY' => 1
                    ));
                    if($file) $result['created_files'][] = $fileName;
                }
            }
        }
    }
}

$result['result'] = [
    'task' =>  $arTask,
    'nextTask' =>  $arNextTask
];


echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
