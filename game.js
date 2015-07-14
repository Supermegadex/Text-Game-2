/// <reference path="typings/jquery/jquery.d.ts"/>
window.setTimeout(function(){
document.querySelector("#hp>.progressbar").className += " mdl-color--blue";
document.querySelector("#xp>.progressbar").className += " mdl-color--teal";
}, 1000);

var stories;


var hp = document.querySelector("#hp");
var xp = document.querySelector("#xp");
var mana = document.querySelector("#mana");

$.getJSON("stories.json", function(data){
    stories = data;
});

function fabToggle() {
    $("#fabNext").slideToggle();
}