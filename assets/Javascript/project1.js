console.log("project1");

var apis = [
"https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=GT5cpszXP53ldgKyQ96ehJf6zLhFmxXQ&offset=",
"https://www.omdbapi.com/?apikey=b7efccee&type=movie&s='the'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=movie&s='star'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=series&s='the'&page=",
"https://www.omdbapi.com/?apikey=b7efccee&type=series&s='star'&page=",
"https://bgg-json.azurewebsites.net/hot",
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

	case 5:
		type = "GAME";
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
		var result = response.Search[random_num(10)];
		data += result.Title;
		var image = $("<img>").attr("src", result.Poster);
		$("#image-result").append(image);
		break;

	case 5:
		var result = JSON.parse(response)[random_num(50)];
		data += result.name;
		var image = $("<img>").attr("src", result.thumbnail);
		$("#image-result").append(image);
		break;

	default:
	}

	$("#result").text(data);
}

function call_api(url) {
	switch (api_num) {
	case 0:
		url += random_num(5) * 20;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		url += random_num(15) + 1;
		break;

	default:
	}

	$.ajax({
		url: url,
		method: "GET",
	}).then(print_api);
}

function slots() {
	$("#result").text(get_type(random_num(apis.length)));
}

function wait() {
	clearInterval(animate);
	api_num = random_num(apis.length);
	$("#result").text(get_type(api_num) + ": LOADING");
	setTimeout(get_api, 1000);
}

function start_slots() {
	$("#image-result").empty();
	animate = setInterval(slots, 50);
	setTimeout(wait, 2000);
}

function get_api() {
	call_api(apis[api_num]);
}

$("#RNG").click(start_slots);
