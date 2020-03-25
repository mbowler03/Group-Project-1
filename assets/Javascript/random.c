#include <stdlib.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
void setup_rng(unsigned seed) {
	srand(seed);
}

EMSCRIPTEN_KEEPALIVE
int random_num(unsigned num) {
	return rand() % num;
}
