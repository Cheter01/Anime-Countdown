var anime = [
{nome:"Black Clover", date:"2017-10-03 13:00:00", episodi:103, bkgImage:"url('images/anime_bk/Black-Clover.png')"},
{nome:"Sword Art Online: Alicization", date:"2018-10-06 21:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Sword-Art-Online-Alicization.png')"}, //TODO: numero episodi ignoto
{nome:"Tensei shitara Slime Datta Ken", date:"2018-10-01 18:00:00", episodi:25, bkgImage:"url('images/anime_bk/Tensei-shitara-Slime-Datta-Ken.jpg')"},
{nome:"The Rising of the Shield Hero", date:"2019-01-09 17:30:00", episodi:25, bkgImage:"url('images/anime_bk/The-Rising-of-the-Shield-Hero.jpg')"},
{nome:"Dororo", date:"2019-01-09 18:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Dororo.jpg')"}, //TODO: numero episodi ignoto
{nome:"The Promised Neverland", date:"2019-01-10 20:00:00", episodi:12, bkgImage:"url('images/anime_bk/The-Promised-Neverland.png')"},
{nome:"Kakegurui XX", date:"2019-01-08 18:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Kakegurui-XX.png')"}, //TODO: numero episodi ignoto
{nome:"Toaru Majutsu no Index III", date:"2018-10-05 17:00:00", episodi:26, bkgImage:"url('images/anime_bk/Toaru-Majutsu-no-Index-III.jpg')"},
{nome:"Date A Live 3", date:"2019-01-13 18:00:00", episodi:26, bkgImage:"url('images/anime_bk/Date-A-Live-3.jpg')"},
{nome:"JoJo no Kimyou na Bouken: Ougon no Kaze", date:"2018-10-05 21:00:00", episodi:39, bkgImage:"url('images/anime_bk/JoJo.jpg')"}
];

$(window).load(function(){
     $('.preloader').fadeOut('slow');
});


/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {

	"use strict";

	//OUTLINE DIMENSION AND CENTER
	(function() {
	    function centerInit(){

			var sphereContent = $('.sphere'),
				sphereHeight = sphereContent.height(),
				parentHeight = $(window).height(),
				topMargin = (parentHeight - sphereHeight) / 2;

			sphereContent.css({
				"margin-top" : topMargin+"px"
			});

			var heroContent = $('.hero'),
				heroHeight = heroContent.height(),
				heroTopMargin = (parentHeight - heroHeight) / 2;

			heroContent.css({
				"margin-top" : heroTopMargin+"px"
			});

	    }

	    $(document).ready(centerInit);
		$(window).resize(centerInit);
	})();

	// Init effect 
	$('#scene').parallax();

};
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function(){

	initializeSite();
	(function() {
		setTimeout(function(){window.scrollTo(0,0);},0);
	})();

});
/* END ------------------------------------------------------- */


$('#countdown').countdown({

	//date: "March 13, 2019 17:30:00",
	date : get_data(),
	render: function(data) {
		//console.log(data);
		if(data.days == 0 && data.hours == 0 && data.min == 0 && data.sec == 0){
			location.reload(true);
		}
	  var el = $(this.el);
	  el.empty()
	    //.append("<div>" + this.leadingZeros(data.years, 4) + "<span>years</span></div>")
	    .append("<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>")
	    .append("<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>")
	    .append("<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>")
	    .append("<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
	}
});

// calcolo giorni ed errori anime-------------------------------------------------

function get_data(){
	add_days();
	riordina_array();
	//controllo_array();
	possibili_errori();
	write_data();
	var ritorno_data = new Date(anime[0].date)
	return ritorno_data;
}

function add_days(){ //aggiunge 7 giorni ad ogni anime per farlo avvicinare a Now per un numero di volte uguale al numero degli episodi
	var now = new Date();
	var data_anime = new Date();
	for (var i = 0; i < anime.length; i++) {
		data_anime.setTime(Date.parse(anime[i].date));
		for (var j = 0; j < anime[i].episodi; j++) {
			if(data_anime < now){
				data_anime.setDate(data_anime.getDate() + 7);
				anime[i].date = data_anime.toString();
			}else{
				break;
			}
		}
	}
}

function riordina_array(){
	anime.sort(function(a,b){
  		// Turn your strings into dates, and then subtract them
  		// to get a value that is either negative, positive, or zero.
 	 	return new Date(b.date) - new Date(a.date);
	});
	anime.reverse();
}

function write_data(){
	var title = document.getElementById("titolo_anime");
	var sub_title = document.getElementById("seguente");
	var background = document.getElementById("sfondo");
	title.innerHTML = anime[0].nome;
	sub_title.innerHTML = "A seguire: " + anime[1].nome;
	background.style.backgroundImage  = anime[0].bkgImage;
}

function possibili_errori(){
	var anime1 = new Date();
	var anime2 = new Date();
	var errori = [];

	for (var i = 0; i < anime.length; i++) {
		for (var j = 0; j < anime.length; j++) {
			anime1.setTime(Date.parse(anime[i].date));
			anime2.setTime(Date.parse(anime[j].date));
			if(Math.abs(anime1.getTime() - anime2.getTime()) <= 43200000 && i != j){  //43200000 = 12 ore
				 if(errori != anime[i].nome){
				 	errori += anime[i].nome
				 	console.log("!!Possibile errore!!\nAnime:", anime[i].nome, "\nDate:", anime1.toString());
				}
			}
		}
	}
}

function controllo_array(){
	for (var i = 0; i < anime.length; i++) {
		console.log("Anime:", anime[i].nome, "\nDate:", anime[i].date);
	}
}

