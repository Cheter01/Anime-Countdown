var AnimeTOT = [];
var anime_selezionato = 0;


$(window).load(function(){
	//makeAnimeData();
	/*setTimeout(function(){
     $('.preloader').fadeOut('slow')
     },1000);*/
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


function makeAnimeData(){

var anime = [];
var i = 0;

	
	db.collection("anime")
	.get()
	.then(snapshot => {
		snapshot.forEach(function (doc) {
			anime.push({nome: doc.data().nome, date: new Date(doc.data().date.seconds * 1000), episodi: doc.data().episodi ,bkgImage: doc.data().bkgImage});
        	i++;
    	});
    	return Promise.all(anime);
  	})
  	.then(function start(values) {
  		anime = riordina_array(elimina_vecchi_elementi(add_days(values)));
  		AnimeTOT = anime;
  		//possibili_errori();
  		//anime_check();
  		costruzione_navigator(anime);
  		write_data(anime);
  		setCountdown(anime);
 	})
	.catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function elimina_vecchi_elementi(anime){
	var now = new Date();
	var data_anime = new Date();
	for (var i = 0; i < anime.length; i++) {
		data_anime.setTime(Date.parse(anime[i].date));
		if(data_anime < now){
			anime.splice(i, 1);  //cancella l'elemento nella posizione i perchè ormai è finita la stagione
		}
	}
	return anime;
}

function add_days(anime){ //aggiunge 7 giorni ad ogni anime per farlo avvicinare a Now per un numero di volte uguale al numero degli episodi
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
	return anime;
}

function riordina_array(anime){
	anime.sort(function(a,b){
  		// Turn your strings into dates, and then subtract them
  		// to get a value that is either negative, positive, or zero.
 	 	return new Date(b.date) - new Date(a.date);
	});
	anime.reverse();
	return anime;
}

function write_data(anime){
	var title = document.getElementById("titolo_anime");
	var sub_title = document.getElementById("seguente");
	var background = document.getElementById("sfondo");
	title.innerHTML = anime[anime_selezionato].nome;
	if(anime_selezionato == anime.length - 1){
		sub_title.innerHTML = "A seguire: " + anime[0].nome;
	}else{
		sub_title.innerHTML = "A seguire: " + anime[anime_selezionato + 1].nome;
	}
	storage.ref().child(anime[anime_selezionato].bkgImage).getDownloadURL().then(function(url) {
		var bkg = "url('" + url + "')";
		//console.log(bkg);
  		background.style.backgroundImage  = bkg;
	});
	//background.style.backgroundImage  = anime[anime_selezionato].bkgImage;
}

function possibili_errori(){
	var anime1 = new Date();
	var anime2 = new Date();
	var errori = [];

	for (var i = 0; i < AnimeTOT.length; i++) {
		for (var j = 0; j < AnimeTOT.length; j++) {
			anime1.setTime(Date.parse(AnimeTOT[i].date));
			anime2.setTime(Date.parse(AnimeTOT[j].date));
			if(Math.abs(anime1.getTime() - anime2.getTime()) <= 1800000 && i != j){  //1800000 = 30 minuti
				 if(errori != AnimeTOT[i].nome){
				 	errori += AnimeTOT[i].nome
				 	console.log("!!Possibile errore!!\nAnime:", AnimeTOT[i].nome, "\nDate:", anime1.toString());
				}
			}
		}
	}
}

function anime_check(){
	/*for (var i = 0; i < AnimeTOT.length; i++) {
		console.log("Anime:", AnimeTOT[i].nome, "\nDate:", AnimeTOT[i].date);
	}*/
	return AnimeTOT;
}

function costruzione_navigator(anime){
	for (var i = 0; i < anime.length; i++) {
		var a = document.createElement("A");
		var text = document.createTextNode(anime[i].nome);
		a.appendChild(text);
		a.setAttribute("class", "mdl-navigation__link");
		a.setAttribute("id", i);
		a.addEventListener("click", function(){
			changeAnime(this.id);
		});
		document.getElementById("navigation").appendChild(a);
		if(i == 0){
			var succ = document.createElement("SPAN");
			var separator = document.createElement("HR");
			var succ_text = document.createTextNode("Successivi...");
			//separator.setAttribute("class", "mdl-layout__header-row");
			succ.setAttribute("class", "mdl-layout-title htitle");
			succ.appendChild(succ_text);

			document.getElementById("navigation").appendChild(separator);
			document.getElementById("navigation").appendChild(succ);
		}
	}
}

function writeAnimeData(nome, date, episodi, bkgImage) { //scrittura anime sul database di firebase
	db.collection("anime").doc(nome).set({
		nome: nome,
		date: firebase.firestore.Timestamp.fromDate(new Date(date)),
		episodi: episodi,
		bkgImage: bkgImage
	})
	.then(function() {
		console.log("Document successfully written!");
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
	});
}

var CountdownInterval;

function setCountdown(anime){

	var countDownDate = new Date(anime[anime_selezionato].date).getTime();
	var days_span = document.createElement("SPAN");
	var hours_span = document.createElement("SPAN");
	var minutes_span = document.createElement("SPAN");
	var seconds_span = document.createElement("SPAN");
	var days_text = document.createTextNode("days");
	var hours_text = document.createTextNode("hours");
	var minutes_text = document.createTextNode("minutes");
	var seconds_text = document.createTextNode("seconds");
	countdownForm = document.getElementById("countdown");
	days_span.appendChild(days_text);
	hours_span.appendChild(hours_text);
	minutes_span.appendChild(minutes_text);
	seconds_span.appendChild(seconds_text);

	CountdownInterval = setInterval(timer, 100);

	function timer() {
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
  		var hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  		var minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  		var seconds = String(Math.floor((distance % (1000 * 60)) / 1000));

  		if(distance <= 0){
  			location.reload(true);
  		}

  		var block = "<div>" + days.padStart(2,'0') + "<span> days</span></div>" + 
					"<div>" + hours.padStart(2,'0') + "<span> hrs</span></div>" + 
					"<div>" + minutes.padStart(2,'0') + "<span> min</span></div>" + 
					"<div>" + seconds.padStart(2,'0') + "<span> sec</span></div>";
  		
		countdownForm.innerHTML = block;
	};
}

function changeAnime(n){
	clearInterval(CountdownInterval);
	anime_selezionato = Number(n);
	write_data(AnimeTOT);
  	setCountdown(AnimeTOT);
}
