#!/bin/bash

while read LINE
do
    OLD=$(echo "$LINE" | cut -d ";" -f 1)
    NEW=$(echo "$LINE" | cut -d ";" -f 2)
    GREP=$(git grep -l -- "$OLD")
    if [[ -n "$GREP" ]]; then
        sed -i "" -e "s#$OLD#$NEW#g" $GREP
    fi
done < input.txt
