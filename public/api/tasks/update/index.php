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


$result = [];

if($_POST['request']){
    $request = json_decode($_POST['request'],true);
}

if(!isset($request) || !$request['taskId'] || !$request['taskNextTypeId'] || !$request['fields']){
    http_response_code(400);
    $result = [
        'ok' => false,
        'message' => "fields taskId, taskNextTypeId, fields are require \n taskClosePrevDate - optional"
    ];
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}



$taskId = (int)$request['taskId'];
$taskNextTypeId = (int)$request['taskNextTypeId'];

$arTask = CTasks::GetList([], ['ID' => $taskId], ['*', 'UF_*'])->fetch();
$isCompleted = ($arTask['STATUS'] == CTasks::STATE_COMPLETED);

$companyId = preg_replace("/[^0-9]/", '', $arTask['UF_CRM_TASK'][0]);
$arCompany = CCrmCompany::GetList([], ["ID" => $companyId])->fetch();

$arUpdateFields = [];
$updateResult = false;
$errors = [];
$lastErrorText = false;

foreach ($request['fields'] as $key => $value) {
    $arUpdateFields[$key] = $value;
}

$log = date("d.m.Y H:i:s") . PHP_EOL;
$log .= "Request:<pre>" . print_r($request, true) . "</pre>";
file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/local/log/close/taskClose_" . $taskId . ".log", $log, FILE_APPEND);

$DB->StartTransaction();

if (count($arUpdateFields) > 0) {

    $updateResult = true;

    $obTask = new CTasks;
    $updateResult = $obTask->Update($taskId, $arUpdateFields);

    if (!$updateResult) {
        if ($e = $APPLICATION->GetException()) {
            $errors[] = $e->GetString();
        }
    }

    $oTaskItem = new CTaskItem($taskId, $userId);
    $oTaskItem->complete();
}

if ($taskNextTypeId > 1) {

    /**
     * Legacy code
     * */
    $nextTaskPriority = $request['nextTask']['UF_AUTO_851551329931'];


    $arNewTask = [
        "TITLE" => "CRM: " . $arCompany['TITLE'],
        "DESCRIPTION" => $request['nextTask']['description'],
        'UF_AUTO_274474131393' => $taskNextTypeId, // Тип следующей задачи
        "DEADLINE" => new \Bitrix\Main\Type\DateTime($request['nextTask']['deadLine'] . " 23:59", "Y-m-d H:i"),
        "ALLOW_CHANGE_DEADLINE" => 'N',
        "TASK_CONTROL" => false,
        "DEPENDS_ON" => $taskId,
        "UF_CRM_TASK" => $arTask['UF_CRM_TASK'],
        "RESPONSIBLE_ID" => (int)$request['nextTask']['user'], // Идентификатор исполнителя (ответственного).
        "UF_AUTO_851551329931" => $nextTaskPriority
    ];

    $log = date("d.m.Y H:i:s") . PHP_EOL;
    $log .= "Request:<pre>" . print_r($arNewTask, true) . "</pre>";
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/local/log/close/taskClose_" . $taskId . ".log", $log, FILE_APPEND);


    if ((int)$request['nextTask']['UF_CRM_TASK_CONTACT'] > 0) {
        $arNewTask['UF_CRM_TASK_CONTACT'] = (int)$request['nextTask']['UF_CRM_TASK_CONTACT'];
    }

    $rsAdd = CTaskItem::add($arNewTask, $userId);

    if ($ID = $rsAdd->getId()) {
        $nextTaskId = $ID;
        $obTask->Update($taskId, [
            'UF_NEXT_TASK' => $ID
        ]);
    } else {
        $nextTaskId = false;
    }


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

TaskActionSync($taskId);

if (count($errors) > 0) {
    $result['ok'] = false;
    $DB->Rollback();
} else {
    $DB->Commit();
}

if (\Bitrix\Main\Loader::includeModule('disk') && !empty($_FILES)) {
    $driver = \Bitrix\Disk\Driver::getInstance();
    $storage = $driver->getStorageByCommonId('shared_files_s1');
    if ($storage)
    {
        $folderCrm = $storage->getChild(
            array(
                '=NAME' => 'CRM',
                'TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE_FOLDER
            )
        );
        if($folderCrm) {
            $folderEntityNameId = '*[C'. $companyId .']';
            $folderEntity = $folderCrm->getChild(
                [
                    'NAME' => "%".$folderEntityNameId,
                    'TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE_FOLDER
                ]
            );

            if(!$folderEntity){
                $folderEntity = $folderCrm->addSubFolder([
                    'NAME' => $arCompany['TITLE'] . ' ' . '[C'. $companyId .']',
                    'CREATED_BY' => 1
                ]);
            }

            if($folderEntity){
                foreach ($_FILES as $fileKey => $file) {
                    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                    $file = $folderEntity->uploadFile($file, array(
                        'NAME' =>   $file['name'] . '.' . $ext,
                        'CREATED_BY' => 1
                    ));
//                  if($file){
//                      $fileId = $file->getFileId();
//                      $bxContactItem->set('PHOTO', $fileId);
//                  }

                }

            }
        }
    }
}

$result = [
    'ok' => $updateResult,
    'request' => $request,
    'taskId' => $taskId,
    'nextTaskId' => $nextTaskId,
    'companyId' => $companyId,
    'task' => $arTask,
    'updated' => $arUpdateFields,
    'updateResult' => $updateResult,
    'errors' => $errors,
    'error' => $lastErrorText
];

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
