<?php

function buildGridList($resTaskList, $list = [], $taskTypesList)
{
    global $USER;
    $userId = $USER->GetID();


    $pathTemplateTaskEntryView = COption::GetOptionString("tasks", "paths_task_user_entry");

    $pathTaskEntryEdit = COption::GetOptionString("tasks", "paths_task_user_edit");


    while ($arTask = $resTaskList->GetNext()) {

        /*echo '<pre>';
        print_r($arTask);
        echo '</pre>';*/
        $taskPath = CComponentEngine::MakePathFromTemplate(
            $pathTemplateTaskEntryView,
            [
                'user_id' => $userId,
                'task_id' => $arTask['ID']
            ]
        );
        $taskEditPath = CComponentEngine::MakePathFromTemplate(
            $pathTaskEntryEdit,
            [
                'user_id' => $userId,
                'task_id' => $arTask['ID']
            ]
        );

        $taskCompleted = ($arTask['REAL_STATUS'] == CTasks::STATE_COMPLETED);

        //$deadline = preg_replace('~(.+)\s? .*~', '$1', $arTask['DEADLINE']);

        $deadlineDateTime = new \DateTime($arTask['DEADLINE']);
        $currentDateTime = new \DateTime();
        $taskDateTimeCaption = "<br />";

        if ($taskCompleted) {
            /**
             * Если задача завершена - дата задачи ставим по дате закрытия задачи
             */
            $closedDateTime = new \DateTime($arTask['CLOSED_DATE']);

            $taskDateTime = clone $closedDateTime;
            $taskDateTimeCaption .= "<span>Завершена</span>";

            if ($closedDateTime > $taskDateTime) {
                // Завершенная задача тоже может быть просрочена
                $taskDateTimeCaption .= "<span class='overdue'>Просрочена</span>";
            }

        } else {

            $taskDateTime = $deadlineDateTime;

            if ($deadlineDateTime < $currentDateTime) {
                $taskDateTimeCaption .= "<span class='overdue'>Просрочена</span>";
            }
        }


        $arCompanyId = explode("_", $arTask['UF_CRM_TASK'][0]);
        if ($arCompanyId[0] != "CO") {

            $companyId = false;
            $companyText = "Прочие дела!";
        } else {
            $companyId = $arCompanyId[1];
        }

        $priority = $arTask['UF_AUTO_851551329931'];
        $priorityIcon = "";
        switch ($priority) {
            case 'срочная, важная';
                $priorityIcon = '<img src="/local/images/important_urgent.svg" />';
                break;
            case 'важная, не срочная';
                $priorityIcon = '<img src="/local/images/important.svg" />';
                break;
            case 'срочная, не важная';
                $priorityIcon = '<img src="/local/images/urgent.svg" />';
                break;
        }

        $actionId = $arTask['UF_AUTO_274474131393'];
        $actionText = $actionId ? '<a href="' . $taskPath . '" class="eventType">' . $priorityIcon . ' ' . $taskTypesList[$actionId]['UF_CODE'] . ' ' . $taskTypesList[$actionId]['UF_NAME'] . '</a>' : '<span class="eventType">Прочие дела</span>';

        $companyId = $arCompanyId[1];
        $companyText = "";
        if ($companyId) {

            $entityTypeId = \CCrmOwnerType::Company;
            $entityUrl = \CCrmOwnerType::GetEntityShowPath($entityTypeId, $companyId);

            $arCompany = CCrmCompany::GetList([], ["ID" => $companyId], ['TITLE', 'COMPANY_TYPE', 'UF_*'])->Fetch();
            $companyText = '<a href="' . $entityUrl . '"><b>' . $arCompany['TITLE'] . '</b></a>';

            $companyTags = [];
            if ($arCompany['UF_CRM_1712158211014']) {
                $companyTags[] = $arCompany['UF_CRM_1712158211014'];
            }
            if ($arCompany['COMPANY_TYPE']) {
                $companyTags[] = $listCompanyTypes[$arCompany['COMPANY_TYPE']];
            }

            $companyText .= '<div class="grtxt">' . implode(" / ", $companyTags) . '</div>'; // city field

            //$companyText .= '<pre>'.print_r($arCompany,true).'</pre>';

            /* props
            $companyCategories = $arCompany['UF_COMPANY_CATEGORIES'];
            $companyProperties = $arCompany['UF_PROPERTY_VALUES'];



            $companyProps = [];
            $resPropValues =$propValuesClass::getList(['filter' => ['UF_COMPANY'=> $companyId]]);
            while ($arPropValue = $resPropValues->Fetch()) {
                $companyProps[] = $arPropValue["UF_TITLE"];
            }

            $companyText .= '<div class="companyprops">'.implode("/",$companyProps).'</div>';
            */

        }
        // STAGE_ID = стадия // STATUS_COMPLETE // REAL_STATUS
        // UF_CRM_TASK_CONTACT
        // UF_NEXT_TASK
        // UF_TASK_REPORT


        // UF_AUTO_280393729397 - result
        $objDateTime = new \Bitrix\Main\Type\DateTime($arTask['CLOSED_DATE'], "d.m.Y H:i:s");
        if ($arTask['UF_AUTO_280393729397']) {
            //$taskResult = '<div class="reportsuccess"><a href="'.$taskPath.'" class="datetime">' . $objDateTime->format("d.m H:i") . "</a> " . TxtToHTML($arTask['UF_AUTO_280393729397']) . '</div>';
            $taskResult = '<div class="action-task-report" data-id="' . $arTask['ID'] . '"><span class="datetime">' . $objDateTime->format("d.m H:i") . "</span> " . TxtToHTML($arTask['UF_AUTO_280393729397']) . '</div>';
        } else {
            // $taskPath

            //$taskResult = '<a class="report" href="'.$taskPath.'" >Написать отчет #</a>';
            $taskResult = '<div class="action-task-report" data-id="' . $arTask['ID'] . '" >Написать отчет #</div>';
        }
        /*$taskPriority = "";
        if($arTask['UF_AUTO_851551329931']) {
            $arTaskPriority = explode(",",$arTask['UF_AUTO_851551329931']);
            foreach ($arTaskPriority as $priority) {
                $taskPriority .= "<div class='priority'>".$priority."</div>";
            }
        } */


        //$taskPriority = "<div class='priority-list'>".$taskPriority."</div>";;

        $taskDescription = ($arTask['DESCRIPTION'] != "" ? $arTask['DESCRIPTION'] : $arTask['TITLE']);
        $taskDescription = "<a class='text' href='" . $taskPath . "'>" . TxtToHTML($taskDescription) . "</a>";
        if ($arTask['CREATED_BY'] != $arTask['RESPONSIBLE_ID']) {
            $arCreator = \Bitrix\Main\UserTable::getById($arTask['CREATED_BY'])->fetch();

            $taskDescription = "<b>Поручение от сотрудника " . $arCreator['NAME'] . " " . $arCreator['LAST_NAME'] . ":&nbsp;</b>" . $taskDescription;
        }
        $list[] = [
            'id' => 'task_' . $arTask['ID'],
            'data' => [
                'ID' => "<a href='" . $taskPath . "'>" . $arTask['ID'] . "</a>",
                'DATE' => "<a class='text' href='" . $taskPath . "'>" . $taskDateTime->format("d.m.Y") . $taskDateTimeCaption . "</a>",
                '~DATE' => $taskDateTime,
                'ACTION' => $actionText,
                '~ACTION' => $actionId,
                'DESCRIPTION' => $taskDescription,
                '~DESCRIPTION' => $arTask['DESCRIPTION'],
                'COMPANY' => $companyText,
                'RESULT' => $taskResult
            ],
            'actions' => [
                [
                    'text' => 'Редактировать',
                    'onclick' => 'document.location.href="' . $taskEditPath . '"'
                ],
                [
                    'text' => 'Удалить',
                    'onclick' => 'document.location.href="/accountant/reports/1/delete/"'
                ]
            ],
        ];
    }

    return $list;
}


define('AUTH_REQUIRED', true);

require_once(dirname(__DIR__, 2) . '/local.header.php');


if(!isset($request['userId']) || !isset($request['data'])){
    http_response_code(400);
    $result = [
        'ok' => false,
        'message' => 'userId and data required'
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
if ($filterDateTime > $currentDateTime) {
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
$list = buildGridList($resTaskList, [], $taskTypesList);

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
    $list = buildGridList($resTaskList, $list, $taskTypesList);

}


//echo $periodType;


if ($periodType == 2) {
    $arListFilter = [
        [
            "LOGIC" => "AND",
            "<DEADLINE" => \Bitrix\Main\Type\DateTime::createFromPhp($currentDateTime),

        ],
        "!REAL_STATUS" => CTasks::STATE_COMPLETED,
        "RESPONSIBLE_ID" => $userId,
        "!UF_CRM_TASK" => false
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
    $list = buildGridList($resTaskList, $list, $taskTypesList);
}

$result = [
    'ok' => true,
    'result' => $list
];


require_once (dirname(__DIR__, 2) . '/local/footer.php');