#!/usr/bin/bash
echo "All this does is list directories in root, then find anything named root within that sub-directory"
ls / | grep root # Essentially what the | does is run grep on the output of ls /