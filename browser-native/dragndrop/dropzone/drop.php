<?php

print_r($_FILES);

file_put_contents('log.txt',json_encode($_FILES)."\n",FILE_APPEND);
