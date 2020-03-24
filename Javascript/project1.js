console.log("project1");

var apis = [
"https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=GT5cpszXP53ldgKyQ96ehJf6zLhFmxXQ&offset=",
"http://www.omdbapi.com/?apikey=b7efccee&type=movie&s='the'&page=",
"http://www.omdbapi.com/?apikey=b7efccee&type=movie&s='star'&page=",
];
var api_num;
var random_num;

function load(results) {
	random_num = results.instance.exports.random_num;
}

WebAssembly.instantiateStreaming(fetch("Javascript/random.wasm")).then(load);

function get_num(items) {
	return random_num(new Date().getTime(), items);
}

function print_api(response) {
	var data;
	switch (api_num) {
	case 0:
		data = response.results[get_num(20)];
		break;

	case 1:
	case 2:
		data = response.Search[get_num(10)];
		break;

	default:
		data = response;
	}

	console.log(data);
}

function call_api(url) {
	switch (api_num) {
	case 0:
		url += get_num(10) * 20;
		break;

	case 1:
	case 2:
		url += get_num(10) + 1;
		break;

	default:
	}

	var api = {
		url: url,
		method: "GET"
	};
	$.ajax(api).then(print_api);
}

function get_api() {
	api_num = get_num(3);
	call_api(apis[api_num]);
}

$("#RNG").click(get_api);
