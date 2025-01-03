<?php
define('AUTH_REQUIRED', true);

require_once (dirname(__DIR__,2) . '/local/header.php');

global $request;

$result = [];


$result['request']= $request;

if(!$request['id']){
    http_response_code(400);
    $result['ok'] = false;
    $result['message'] = 'id is required';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}


if ( \Bitrix\Main\Loader::IncludeModule('crm') ){
    $companyId = $request['id'];
    $arCompany = \CCrmCompany::GetListEx([], ['ID' => $companyId],['*', 'UF_*'])->fetch();
    $result['ok'] = true;

    if($arCompany){
        $result['result'] = $arCompany;
    } else{
        $result['ok'] = false;
        $result['message'] = 'not found';
    }
}else{
    $result['ok'] = false;
    $result['message'] = 'not supported';
}



require_once (dirname(__DIR__,2) . '/local/footer.php');
