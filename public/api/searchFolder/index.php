<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
global $USER;

$result = [];

$ok = $USER->IsAuthorized();
if(!$ok){
    $result['ok'] = false;
    $result['message'] = 'unauthorized';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$folderName = $_GET['folderName'];
if(!isset($_GET['folderName']))
{
    http_status_code(400);
    $result['ok'] = false;
    $result['message'] = 'query folderName is required';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}


if (\Bitrix\Main\Loader::includeModule('disk'))
{
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
        if($folderCrm)
        {
            $folder = $folderCrm->getChild(
                [
                    '=NAME' => $folderName,
                    'TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE_FOLDER
                ]
            );

            if($folder)
            {
                $result['ok'] = true;
                $result['folder'] = $folder;
                echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                exit;
            }
        }
    }
}


$result['ok'] = false;
$result['message'] = 'not found';
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);