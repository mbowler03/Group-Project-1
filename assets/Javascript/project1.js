console.log("project1");

var apis = [
"https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=GT5cpszXP53ldgKyQ96ehJf6zLhFmxXQ&offset=",
"https://www.omdbapi.com/?apikey=b7efccee&type=movie&s='the'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=movie&s='star'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=series&s='the'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=series&s='star'&page=",
];
var api_num = -1;
var random_num = function(num){}
var animate;

function load(results) {
	results.instance.exports.setup_rng(new Date().getTime());
	random_num = results.instance.exports.random_num;
}

WebAssembly.instantiateStreaming(fetch("assets/Javascript/random.wasm")).then(load);

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

function print_api(response) {
	var data = get_type(api_num) + ": ";
	switch (api_num) {
	case 0:
		data += response.results[random_num(20)].title;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		data += response.Search[random_num(10)].Title;
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
		url += random_num(10) * 20;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		url += random_num(10) + 1;
		break;

	default:
	}

	$.ajax({
		url: url,
		method: "GET"
	}).then(print_api);
}

function slots() {
	$("#result").text(get_type(random_num(5)));
}

function start_slots() {
	animate = setInterval(slots, 10);
	setTimeout(get_api, 2000);
}

function get_api() {
	clearInterval(animate);
	api_num = random_num(5);
	call_api(apis[api_num]);
}

$("#RNG").click(start_slots);
