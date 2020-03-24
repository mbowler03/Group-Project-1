#include <stdlib.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int random_num(int seed, unsigned num) {
	srand(seed);
	return rand() % num;
}
