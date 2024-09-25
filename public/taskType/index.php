<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

$result = [];

// Проверка авторизации
if (!$USER->IsAuthorized()) {
    http_response_code(401);
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$entityBody = file_get_contents('php://input');
$request = json_decode($entityBody, true);

// Проверка параметров
$userId = $request['user_id'];
$taskId = $request['task_id'];


if (!$userId || !$taskId) {
    http_response_code(400);
    $result['ok'] = false;
    $result['message'] = 'bad request';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Получение задачи
$arTask = CTasks::GetList([], ['ID' => $taskId], ['*', 'UF_*'])->fetch();

// Получение CRM-сущности (если есть)
$crmEntityId = false;
if ($arTask["UF_CRM_TASK"][0]) {
    $crmEntityCode = $arTask["UF_CRM_TASK"][0];
    $arCrmEntityCode = explode("_", $crmEntityCode);
    $crmEntityType = $arCrmEntityCode[0];
    $crmEntityId = $arCrmEntityCode[1];
}

// Проверка статуса задачи
$isCompleted = ($arTask['STATUS'] == CTasks::STATE_COMPLETED);

// Если задача не завершена
if ($isCompleted != "Y") {
    // Получение списка типов задач
    $taskTypesList = [];
    $user = CUser::GetByID($userId)->Fetch();
    $companyTypeId = $user['UF_COMPANY_TYPE'];
    CModule::IncludeModule("highloadblock");
    $hlbl = 2; // ID HighLoadBlock
    $hlblock = Bitrix\Highloadblock\HighloadBlockTable::getById($hlbl)->fetch();
    $taskTypesClass = Bitrix\Highloadblock\HighloadBlockTable::compileEntity($hlblock)->getDataClass();

    $taskTypesRes = $taskTypesClass::getList([
        'order' => ['UF_CODE' => 'ASC', 'UF_NAME' => 'ASC'],
//         'filter' => ['UF_COMPANY_TYPE' => $companyTypeId]
    ]);
    while ($taskTypeData = $taskTypesRes->Fetch()) {
        $taskTypesList[$taskTypeData['ID']] = $taskTypeData;
    }

    // Формирование ответа
    $result['TASK_TYPES'] = $taskTypesList;
    $result['ok'] = true;
    $result['companyTypeId'] = $companyTypeId;
} else {
    // Формирование ответа для завершенной задачи
    $result['ok'] = true;
    $result['message'] = 'task is completed';
}

// Отправка ответа
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);



