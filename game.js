/// <reference path="typings/jquery/jquery.d.ts"/>
window.setTimeout(function(){
    document.querySelector("#hp>.progressbar").className += " mdl-color--blue";
    document.querySelector("#hp>.bufferbar").style.opacity = ".3";
    document.querySelector("#hp>.bufferbar").style.background = "#2196f3";
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
var next;


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
    places: {
        forest: false,
        cave: false
    },
    campSize:"small"
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

function updateStory(story) {
    next = eval(story);
    if (next.multiple) {
        var a = Math.floor(Math.random() * 11);
        for (var i in next.stories) {
            if (next.stories[i].chance[0] < a && next.stories[i].chance[1] >= a) {
                next = next.stories[i];
                break;
            }
        }
    }
    Function(next.action)();
    renderStory(next.story, next.title, next.input);
}

function renderStory(story, title, input) {
    var ip = {
        button: document.createElement("button"),
        fab: false
    };
    $("#storyText").html(story);
    $("#storyTitle").html(title);
    document.querySelector("#input1").innerHTML = "";
    for (var i in input) {
        if (input[i].type == "button") {
            ip.button.innerText = input[i].text;
            ip.button.onclick = function () { updateStory(String(input[i].action)); };
            ip.button.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
            document.querySelector("#input1").appendChild(ip.button);
            ip.button = document.createElement("button");
        }
        if (input[i].type == "fab") {
            $("#fabNext").click(function () {
                updateStory(String(input[i].action));
                $("#fabNext").off("click");
            });
            ip.fab = true;
        }
        if (input[i].type == "req") {
            if (eval(input[i].req)) {
                if (input[i].t == "button") {
                    ip.button.innerText = input[i].text;
                    ip.button.onclick = function () { updateStory(String(input[i].action)); };
                    ip.button.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
                    document.querySelector("#input1").appendChild(ip.button);
                    ip.button = document.createElement("button");
                }
            }
        }
    }
    if (ip.fab) {
        $("fabNext").slideDown(300);
    }
    else {
        $("fabNext").slideUp(300);
    }
}