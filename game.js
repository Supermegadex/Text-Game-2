var stories;

$.getJSON("stories.json", function(data){
    stories = data;
});

function fabToggle() {
    $("#fabNext").slideToggle();
}