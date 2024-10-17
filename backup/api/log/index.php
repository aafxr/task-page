<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

global $USER;
if (!is_object($USER)) $USER = new CUser;
$userId = $USER->GetID() || 'app';

$request = file_get_contents('php://input');

$log =  date("d.m.Y H:i:s").PHP_EOL;
$log .= "Request:<pre>".print_r($request, true)."</pre>";
$fileName = dirname(__DIR__, 2) . "/_log/$userId" . ".log";

$result = [
    'ok' => true,
    'filename' => $fileName,
    'reques' => $request,
    'write' => file_put_contents($fileName, $log, FILE_APPEND)
];

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
