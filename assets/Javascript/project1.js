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
var item = "";
var image = "";
var items = [];
var random_num = function(num){}
var animate;
var loading = true;

function load(results) {
	results.instance.exports.setup_rng(new Date().getTime());
	random_num = results.instance.exports.random_num;
	loading = false;
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
		item = response.results[random_num(20)].title;
		data += item;
		image = "#";
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		var result = response.Search[random_num(10)];
		item = result.Title;
		data += item;
		image = result.Poster;
		if (image !== "N/A") {
			img = $("<img>").attr("src", image);
			$("#image-result").append(img);
		}
		break;

	case 5:
		var result = JSON.parse(response)[random_num(50)];
		item = result.name;
		data += item;
		image = result.thumbnail;
		img = $("<img>").attr("src", image);
		$("#image-result").append(img);
		break;

	default:
	}

	$("#result").text(data);
	var save = $("<button>").attr("id", "save").text("SAVE");
	save.addClass("position-absolute rounded");
	$("#result").append(save);
	loading = false;
}

function call_api(url) {
	switch (api_num) {
	case 0:
		url += random_num(10) * 20;
		break;

	case 1:
	case 2:
	case 3:
	case 4:
		url += random_num(20) + 1;
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
	if (!loading) {
		loading = true;
		$("#image-result").empty();
		animate = setInterval(slots, 50);
		setTimeout(wait, 2000);
	}
}

function get_api() {
	call_api(apis[api_num]);
}

$("#RNG").click(start_slots);

function print_items() {
	if (items === null) {
		items = [];
	}
	$("#item-list").empty();

	for (var i = 0; i < items.length; i++) {
		var row = $("<tr>");
		row.append($("<td>").text(items[i].type));
		row.append($("<td>").text(items[i].item));
		var end = $("<td>");
		if (items[i].image !== "N/A" && items[i].image !== "#") {
			var img = $("<img>").attr("src", items[i].image);
			img.addClass("item-image");
			end.append(img);
		}
		var btn = $("<button>").text("X").attr("value", i);
		btn.addClass("delete rounded");
		row.append(end.append(btn));
		$("#item-list").append(row);
	}
	localStorage.setItem("items", JSON.stringify(items));
}

function save_item() {
	var item_obj = {
		type: get_type(api_num),
		item: item,
		image: image,
	};
	items.push(item_obj);
	localStorage.clear();
	localStorage.setItem("items", JSON.stringify(items));
	print_items();
}

function delete_item() {
	items.splice(parseInt($(this).attr("value")), 1);
	print_items();
}

$(document).on("click", "#save", save_item);
$(document).on("click", ".delete", delete_item);
items = JSON.parse(localStorage.getItem("items"));
print_items();
