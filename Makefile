BIN_DIR = ./node_modules/.bin

SRC = ./src
OUTPUT = ${SRC}/bundle.js
INPUT = ${SRC}/js/index.js

FLAGS = -t [ babelify [ es2015 react stage-1 ] ]
SERVER_FLAGS = ${SRC} -p 3001
BUILD_FLAGS = ${INPUT} -o ${OUTPUT} ${FLAGS}
WATCH_FLAGS = ${INPUT} -o ${OUTPUT} ${FLAGS} -v


build:
	${BIN_DIR}/browserify ${BUILD_FLAGS}

watch:
	${BIN_DIR}/watchify ${WATCH_FLAGS}

start:
	${MAKE} watch & ${MAKE} serve

serve:
	${BIN_DIR}/ecstatic ${SERVER_FLAGS}

