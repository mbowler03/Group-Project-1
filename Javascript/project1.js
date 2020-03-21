console.log("project1");

var current_time = new Date().getTime();

function load(results) {
	var random_num = results.instance.exports.random_num;
	console.log(random_num(current_time, 4));
}

WebAssembly.instantiateStreaming(fetch("Javascript/random.wasm")).then(load);
