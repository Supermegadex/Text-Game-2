window.setTimeout(function(){
    document.querySelector("#hp>.progressbar").className += " mdl-color--blue";
    document.querySelector("#hp>.bufferbar").style.opacity = ".3";
    document.querySelector("#hp>.bufferbar").style.background = "#2196f3";
    document.querySelector("#xp>.progressbar").className += " mdl-color--teal";
    update("start");
    $("#fabH").hide();
    $("#fabNext").hide();
    playerProto = player;
    document.querySelector("#mdl").src = "";
    document.querySelector("#mdl").src = "https://storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js";
}, 1000);

var next;

var stories;

var hp = document.querySelector("#hp");
var xp = document.querySelector("#xp");
var mana = document.querySelector("#mana");
var str = $(".str");
var dex = $(".dex");
var cha = $(".cha");
var con = $(".con");
var int = $(".int");
var wis = $(".wis");
var ip1 = document.querySelector("#input1");

function nextStory() {
    updateStory(game.next);
}

$.getJSON("stories.json", function(data){
    stories = data;
});

function fabToggle(FAB) {
    if (FAB.toLowerCase() == "home") {
        $("#fabH").slideToggle();
    }
    if (FAB.toLowerCase() == "next") {
        $("#fabNext").slideToggle();
    }
}

function update(why) {
    str.text(player.str);
    dex.text(player.dex);
    con.text(player.con);
    int.text(player.int);
    cha.text(player.cha);
    wis.text(player.wis);
    hp.MaterialProgress.setProgress((player.hp/player.maxHp) * 100);
    xp.MaterialProgress.setProgress((player.xp/player.nextLevel) * 100);
    mana.MaterialProgress.setProgress((player.mana / player.maxMana) * 100);
    $("#name").text(player.name);
    $.ajax({
        url: "username.php",
        method: "POST",
    }).success(function (re) {
        $("#name").append(re);
        });
    if (game.currentPlace.split('.')[1] == "create") {
        document.querySelector("#saveSelect").setAttribute("disabled", "true");
        document.querySelector("#saveSelect").setAttribute("onclick", "return(false)");
    }
    else {
        document.querySelector("#saveSelect").removeAttribute("disabled");
        document.querySelector("#saveSelect").setAttribute("onclick", "data.sSave()");
    }
};

Object.observe(player, function (changes) {
    update("update");
});

function updateStory(story) {
    next = eval(story);
    if (next.multiple) {
        var a = Math.floor(Math.random() * next.number);
        next = next.stories[a];
    }
    Function(next.action)();
    renderStory(next.story, next.title, next.input);
    game.currentPlace = story;
    update();
}

function renderStory(story, title, input) {
    $("#storyText").html(story);
    $("#storyTitle").html(title);
    $("#input1").html(input.text);
    if (input.fab) {
        $("#fabH").slideDown();
    }
    else {
        $("#fabH").slideUp();
    }
    if ("next" in input) {
        game.next = input.next;
        $("#fabNext").slideDown();
    }
    else {
        $("#fabNext").slideUp();
    }
    if ("story" in input) {
        $("#storyIp").html(input.story);
    }
    else {
        $("#storyIp").html("");
    }
}