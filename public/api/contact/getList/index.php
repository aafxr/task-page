<?php
define('AUTH_REQUIRED', true);

require_once (dirname(__DIR__,2) . '/local/header.php');

global $request;
global $USER;

if(!is_object($request)) $request = [];

$result = [];
$userId = $USER->GetId();


function transformMultiformFields($multifield){
    return [
        'ID' => $multifield['ID'],
        'TYPE_ID' => $multifield['TYPE_ID'],
        'VALUE' => $multifield['VALUE'],
        'VALUE_TYPE' => $multifield['VALUE_TYPE'],
    ];
}


if ( \Bitrix\Main\Loader::IncludeModule('crm') ){

    $contactResult = CCrmContact::GetListEx(
        [ 'SOURCE_ID' => 'DESC' ],
        [
            'ASSIGNED_BY_ID' => $userId,
        ],
        false,
        ["nPageSize" => 50],
        [ '*' ]
    );

    $navComponentObject = [];
    $pagination = $contactResult->GetPageNavStringEx($navComponentObject, 'title');
    $list = [];
    while( $contact = $contactResult->fetch() ) {
        $contact['PHONE'] = [];
        $contact['EMAIL'] = [];

        $resFieldMulti = \CCrmFieldMulti::GetListEx(
            [],
            [
                'ENTITY_ID' => \CCrmOwnerType::ContactName,
                'ELEMENT_ID' => $contact['ID'],
                'TYPE_ID' => \CCrmFieldMulti::PHONE
            ]
        );

        while( $multifield = $resFieldMulti->fetch() ){
            $contact['PHONE'][] = transformMultiformFields($multifield);
        }

        $resFieldMulti = \CCrmFieldMulti::GetListEx(
            [],
            [
                'ENTITY_ID' => \CCrmOwnerType::ContactName,
                'ELEMENT_ID' => $contact['ID'],
                'TYPE_ID' => \CCrmFieldMulti::EMAIL
            ]
        );

        while( $multifield = $resFieldMulti->fetch() ){
            $contact['EMAIL'][] = transformMultiformFields($multifield);
        }

        $list[] = $contact;
    }

    $result = [
        'ok' => true,
        'result' => $list,
        'page' => $navComponentObject->arResult['NavPageNomer'],
        'pageCount' => $navComponentObject->arResult['NavPageCount'],
        'id' => $request['id']
    ];

} else{
    http_response_code(501);
    $result = [
        'ok' => false,
        'message' => 'unsupported'
    ];
}

require_once (dirname(__DIR__,2) . '/local/footer.php');