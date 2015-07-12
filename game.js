/// <reference path="typings/jquery/jquery.d.ts"/>
window.setTimeout(function(){
    document.querySelector("#hp>.progressbar").className += " mdl-color--blue";
    document.querySelector("#xp>.progressbar").className += " mdl-color--teal";
    update("start");
}, 1000);

var stories;

var hp = document.querySelector("#hp");
var xp = document.querySelector("#xp");
var mana = document.querySelector("#mana");
var str = $("#str");
var dex = $("#dex");
var cha = $("#cha");
var con = $("#con");
var int = $("#int");
var wis = $("#wis");


$.getJSON("stories.json", function(data){
    stories = data;
});

function fabToggle() {
    $("#fabNext").slideToggle();
}

var player = {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    hp: 100,
    maxHp: 100,
    xp: 0,
    nextLevel: 20,
    mana: 100,
    maxMana: 100,
    level: 0,
};

function update(why) {
    str.text(player.str);
    dex.text(player.dex);
    con.text(player.con);
    int.text(player.int);
    cha.text(player.cha);
    wis.text(player.wis);
    hp.MaterialProgress.setProgress((player.hp/player.maxHp) * 100);
    xp.MaterialProgress.setProgress((player.xp/player.nextLevel) * 100);
    mana.MaterialProgress.setProgress((player.mana/player.maxMana) * 100);
};

Object.observe(player, function (changes) {
    update("update");
});