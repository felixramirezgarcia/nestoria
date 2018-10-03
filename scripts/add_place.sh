if [[ $# -ne 2 ]]; then
    echo "Error. The sintax is: $0 <place_name>"
fi

PLACE=$1
ROOT_DIR="$(dirname "$dir")"
FILE=$ROOT_DIR/data/places.txt
EXIST=grep $PLACE $FILE

if [[ -z "$EXIST" ]]; then
    echo "$PLACE" >> $FILE;
    sort $FILE > $FILE
else
    echo "The place $PLACE already exist in that file"
fi

