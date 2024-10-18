<?php

function initDataValidate($initData, $TOKEN){
    if(!$initData || !$TOKEN) return false;

    $hash = '';

    $strs = [];
    parse_str($initData, $params);
    foreach($params as $k => $v){
        if($k == 'hash') {
            $hash = $v;
            continue;
        }
        $strs[$k] = $k . '=' . $v;
    }

    sort($strs);


    $data_check_string = implode("\n", $strs);

    $secret_key = hash_hmac('sha256', $TOKEN, "WebAppData", true);

    $dataHash = hash_hmac('sha256', $data_check_string, $secret_key, true);

    $calcHash= bin2hex($dataHash);

    return $calcHash == $hash;
}