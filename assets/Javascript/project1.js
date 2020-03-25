console.log("project1");

var apis = [
"https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=GT5cpszXP53ldgKyQ96ehJf6zLhFmxXQ&offset=",
"http://www.omdbapi.com/?apikey=b7efccee&type=movie&s='the'&page=",
"http://www.omdbapi.com/?apikey=b7efccee&type=movie&s='star'&page=",
"http://www.omdbapi.com/?apikey=b7efccee&type=series&s='the'&page=",
"http://www.omdbapi.com/?apikey=b7efccee&type=series&s='star'&page=",
];
var api_num = -1;
var random_num = function(seed, num){}
var interval;

function load(results) {
	random_num = results.instance.exports.random_num;
}

WebAssembly.instantiateStreaming(fetch("assets/Javascript/random.wasm")).then(load);

function get_num(items) {
	return random_num(new Date().getTime(), items);
}

function print_api(response) {
	var data = get_type(api_num) + ": ";
	switch (api_num) {
	case 0:
		data += response.results[get_num(20)].title;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		data += response.Search[get_num(10)].Title;
		break;

	default:
		data = response;
	}

	$("#result").text(data);
}

function call_api(url) {
	$("#result").text(get_type(api_num) + ": PLEASE WAIT");

	switch (api_num) {
	case 0:
		url += get_num(10) * 20;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
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

function get_type(num) {
	var type = "";
	switch(num) {
	case 0:
		type = "BOOK";
		break;

	case 1:
	case 2:
		type = "FILM";
		break;

	case 3:
	case 4:
		type = "SHOW";
		break;

	default:
	}

	return type;
}

function slots() {
	$("#result").text(get_type(get_num(5)));
}

function start_slots() {
	interval = setInterval(slots, 10);
	setTimeout(get_api, 2000);
}

function get_api() {
	clearInterval(interval);
	api_num = get_num(5);
	call_api(apis[api_num]);
}

$("#RNG").click(start_slots);
