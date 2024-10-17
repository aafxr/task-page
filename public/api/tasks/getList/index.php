<?php

/*
request payload
{
    userId: '',
    date: '' // iso format
}



response
{
    ok: boolean
    message?: 'if error',
    result?: 'tasks list if no errors'
}
*/

define('AUTH_REQUIRED', true);

require_once(dirname(__DIR__, 2) . '/local/header.php');


$hlid = 2; // Указываем ID нашего highloadblock блока к которому будет делать запросы.
$hlblock = Bitrix\Highloadblock\HighloadBlockTable::getById($hlid)->fetch();
$taskTypesClass = Bitrix\Highloadblock\HighloadBlockTable::compileEntity($hlblock)->getDataClass();


$taskTypesRes = $taskTypesClass::getList([]);
$taskTypesList = [];
while ($taskTypeData = $taskTypesRes->Fetch()) {
    $taskTypesList[$taskTypeData['ID']] = $taskTypeData;
}


if(!isset($request['userId']) || !isset($request['date'])){
    http_response_code(400);
    $result = [
        'ok' => false,
        'message' => 'userId and date required'
    ];
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}


$userId = $request['userId'];

$currentDateTime = new \DateTime(date("Y-m-d"));
$currentDateTimeNextDay = clone $currentDateTime;
$currentDateTimeNextDay->setTime(0, 0);
$currentDateTimeNextDay->modify("+1 day");


$filterDate = $request['date'];
$filterDateTime = new \DateTime($filterDate);

$filterDateTimeNextDay = clone $filterDateTime;
$filterDateTimeNextDay->modify("+1 day");

// Первый день месяца
$periodStart = clone $currentDateTime;
$periodStart->modify('-1 month');
$periodStart->modify('first day of this month');

// Последний день месяца
$periodEnd = clone $periodStart;
$periodEnd->modify('+2 month');
$periodEnd->modify('last day of this month');


$list = [];

/**
 *  условия
 *  1. дата отбора < текущей = показываем только закрытые задачи, за заданный период
 *  2. дата отбора = текущей = показываем задачи на сегодня, и все не закрытые задачи за прошлые даты
 *  3. дата отбора > текущей = показываем все задачи на заданный период
 */


$periodType = 2;
if ($filterDateTime < $currentDateTime) {
    $periodType = 1;
}
if ($filterDateTime > $currentDateTimeNextDay) {
    $periodType = 3;
}

/**
 * Собираем задачи
 * 1. собираем все завершенные, они будут по дате закрытия
 * 2. собираем все запланированые
 * 3. собираем все просрочки = отображаются на текущую дату
 * ---
 *
 */

$arListFilterCompleted = [
    [
        "LOGIC" => "AND",
        ">=CLOSED_DATE" => \Bitrix\Main\Type\DateTime::createFromPhp($filterDateTime),
        "<CLOSED_DATE" => \Bitrix\Main\Type\DateTime::createFromPhp($filterDateTimeNextDay),
    ],
    "REAL_STATUS" => CTasks::STATE_COMPLETED,
    "RESPONSIBLE_ID" => $userId,
    /* "!UF_CRM_TASK" => false */ // Убираем так как нам надо будет фиксировать и обычные задачи
];
$resTaskList = CTasks::GetList(
    [
        "DEADLINE" => "DESC",
        "ID" => "DESC"
    ],
    $arListFilterCompleted,
    [
        "*", "UF_*"
    ]
);
$row = 0;

if ($periodType > 1) {
    $arListFilterPlanned = [
        [
            "LOGIC" => "AND",
            ">=DEADLINE" => \Bitrix\Main\Type\DateTime::createFromPhp($filterDateTime),
            "<DEADLINE" => \Bitrix\Main\Type\DateTime::createFromPhp($filterDateTimeNextDay),
        ],
        "!REAL_STATUS" => CTasks::STATE_COMPLETED,
        "RESPONSIBLE_ID" => $userId,
        /* "!UF_CRM_TASK" => false */ // Убираем так как нам надо будет фиксировать и обычные задачи
    ];
    $resTaskList = CTasks::GetList(
        [
            "UF_AUTO_851551329931" => 'DESC',
            "DEADLINE" => "DESC",
            "ID" => "DESC"
        ],
        $arListFilterPlanned,
        [
            "*", "UF_*"
        ]
    );

}




if ($periodType == 2) {
    $arListFilter = [
        "<DEADLINE" => \Bitrix\Main\Type\DateTime::createFromPhp($currentDateTimeNextDay),
        "<REAL_STATUS" => CTasks::STATE_COMPLETED,
        "RESPONSIBLE_ID" => $userId,
    ];

     $resTaskList = CTasks::GetList(
        [
            "DEADLINE" => "DESC",
            "ID" => "DESC"
        ],
        $arListFilter,
        [
            "*", "UF_*"
        ]
    );


    while($task = $resTaskList->GetNext()){
        if($task['CREATED_DATE']) $task['CREATED_DATE'] = (new \DateTime($task['CREATED_DATE']))->format('Y-m-d\TH:i:s');
        if($task['CHANGED_DATE']) $task['CHANGED_DATE'] = (new \DateTime($task['CHANGED_DATE']))->format('Y-m-d\TH:i:s');
        if($task['CLOSED_DATE']) $task['CLOSED_DATE'] = (new \DateTime($task['CLOSED_DATE']))->format('Y-m-d\TH:i:s');
        if($task['DEADLINE']) $task['DEADLINE'] = (new \DateTime($task['DEADLINE']))->format('Y-m-d\TH:i:s');
        $arUser = CUser::GetList(($by="id"), ($order="desc"),['id' => $task['RESPONSIBLE_ID']],[])->GetNext();
        if($arUser){
            $task['RESPONSIBLE'] = [
                'id' => $arUser['ID'],
                'name' => $arUser['LAST_NAME'] . ' ' . $arUser['NAME'],
                'link' => '',
                'icon' => ''
            ];
        }

        $arUser = CUser::GetList(($by="id"), ($order="desc"),['id' => $task['CREATED_BY']],[])->GetNext();
        if($arUser){
            $task['CREATOR'] = [
                'id' => $arUser['ID'],
                'name' => $arUser['LAST_NAME'] . ' ' . $arUser['NAME'],
                'link' => '',
                'icon' => ''
            ];
        }
        $list[] = $task;
    }


    $arListFilter = [
        ">=CLOSED_DATE" => \Bitrix\Main\Type\DateTime::createFromPhp($currentDateTime),
        "<CLOSED_DATE" => \Bitrix\Main\Type\DateTime::createFromPhp($currentDateTimeNextDay),
        "REAL_STATUS" => CTasks::STATE_COMPLETED,
        "RESPONSIBLE_ID" => $userId,
//         "!UF_CRM_TASK" => false
    ];

    $resTaskList = CTasks::GetList(
        [
            "DEADLINE" => "DESC",
            "ID" => "DESC"
        ],
        $arListFilter,
        [
            "*", "UF_*"
        ]
    );
}


while($task = $resTaskList->GetNext()){
    if($task['CREATED_DATE']) $task['CREATED_DATE'] = (new \DateTime($task['CREATED_DATE']))->format('Y-m-d\TH:i:s');
    if($task['CHANGED_DATE']) $task['CHANGED_DATE'] = (new \DateTime($task['CHANGED_DATE']))->format('Y-m-d\TH:i:s');
    if($task['CLOSED_DATE']) $task['CLOSED_DATE'] = (new \DateTime($task['CLOSED_DATE']))->format('Y-m-d\TH:i:s');
    if($task['DEADLINE']) $task['DEADLINE'] = (new \DateTime($task['DEADLINE']))->format('Y-m-d\TH:i:s');
    $arUser = CUser::GetList(($by="id"), ($order="desc"),['id' => $task['RESPONSIBLE_ID']],[])->GetNext();
    if($arUser){
        $task['RESPONSIBLE'] = [
            'id' => $arUser['ID'],
            'name' => $arUser['LAST_NAME'] . ' ' . $arUser['NAME'],
            'link' => '',
            'icon' => ''
        ];
    }

    $arUser = CUser::GetList(($by="id"), ($order="desc"),['id' => $task['CREATED_BY']],[])->GetNext();
    if($arUser){
        $task['CREATOR'] = [
            'id' => $arUser['ID'],
            'name' => $arUser['LAST_NAME'] . ' ' . $arUser['NAME'],
            'link' => '',
            'icon' => ''
        ];
    }
    $list[] = $task;
}



$result = [
    'ok' => true,
    'result' => $list
];

//echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);



require_once (dirname(__DIR__, 2) . '/local/footer.php');