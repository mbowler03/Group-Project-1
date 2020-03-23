console.log("project1");

var current_time = new Date().getTime();

var random_num;

function load(results) {
	random_num = results.instance.exports.random_num;
}

WebAssembly.instantiateStreaming(fetch("Javascript/random.wasm")).then(load);

function print_num() {
	$("#random-number").text(random_num(new Date().getTime(), 5));
}

$("#RNG").click(print_num);
