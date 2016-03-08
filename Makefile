BIN_DIR = ./node_modules/.bin

SRC = ./src
DIST = ./dist
OUTPUT = bundle.js
INPUT = js/index.js

FLAGS = -t [ babelify [ es2015 react stage-1 ] ]
SERVER_FLAGS = ${SRC} -p 3001
BUILD_FLAGS = ${SRC}/${INPUT} -o ${DIST}/${OUTPUT} ${FLAGS}
WATCH_FLAGS = ${SRC}/${INPUT} -o ${SRC}/${OUTPUT} ${FLAGS} -v

PRODUCTION_FILES=${SRC}/index.html\
				 ${SRC}/css\
				 ${SRC}/data\


build:
	mkdir -p ${DIST}
	${BIN_DIR}/browserify ${BUILD_FLAGS}

watch:
	${BIN_DIR}/watchify ${WATCH_FLAGS}

start:
	${MAKE} watch & ${MAKE} serve

serve:
	${BIN_DIR}/ecstatic ${SERVER_FLAGS}

copy: build
	mkdir -p ${DIST}
	cp -R ${PRODUCTION_FILES} ${DIST}

clean:
	rm -rf ${DIST}
