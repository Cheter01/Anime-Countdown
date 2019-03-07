var anime = [
{nome:"Black Clover", data_inizio:"2017-10-03 13:00:00", episodi:103, bkgImage:"url('images/anime_bk/Black-Clover.png')"},
{nome:"Sword Art Online: Alicization", data_inizio:"2018-10-06 21:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Sword-Art-Online-Alicization.png')"}, //TODO: numero episodi ignoto
{nome:"Tensei shitara Slime Datta Ken", data_inizio:"2018-10-02 18:00:00", episodi:25, bkgImage:"url('images/anime_bk/Tensei-shitara-Slime-Datta-Ken.jpg')"},
{nome:"The Rising of the Shield Hero", data_inizio:"2019-01-09 17:30:00", episodi:25, bkgImage:"url('images/anime_bk/The-Rising-of-the-Shield-Hero.jpg')"},
{nome:"Dororo", data_inizio:"2019-01-07 18:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Dororo.jpg')"}, //TODO: numero episodi ignoto
{nome:"The Promised Neverland", data_inizio:"2019-01-10 20:00:00", episodi:12, bkgImage:"url('images/anime_bk/The-Promised-Neverland.png')"},
{nome:"Kakegurui XX", data_inizio:"2019-01-08 18:00:00", episodi:999999, bkgImage:"url('images/anime_bk/Kakegurui-XX.png')"} //TODO: numero episodi ignoto
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
		// console.log(data);
	  var el = $(this.el);
	  el.empty()
	    //.append("<div>" + this.leadingZeros(data.years, 4) + "<span>years</span></div>")
	    .append("<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>")
	    .append("<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>")
	    .append("<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>")
	    .append("<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
	}
});

function get_data(){
	var bk = 0;
	var now = new Date();
	var data_target = new Date();
	data_target.setDate(data_target.getDate() + 7);
	var data_anime = new Date();

	for (var i = 0; i < anime.length; i++) {
		data_anime.setTime(Date.parse(anime[i].data_inizio));
		for (var j = 0; j < anime[i].episodi; j++) {
			if(data_anime < now){
				data_anime.setDate(data_anime.getDate() + 7);
			}else{
				break;
			}
		}
		if(data_anime <= data_target && data_anime > now){
			bk = i;
			data_target.setTime(Date.parse(data_anime));
			//console.log(data_target,", ", data_anime);
		}
	}
	
	write_data(bk);
	console.log(data_target);
	return data_target;
}

function write_data(n_anime){
	var title = document.getElementById("titolo_anime");
	var background = document.getElementById("sfondo");
	title.innerHTML = anime[n_anime].nome;
	background.style.backgroundImage  = anime[n_anime].bkgImage;
	console.log(anime[n_anime].bkgImage);
}

