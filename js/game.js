
/* Game namespace */
var game = {
    dialog: {
        display: false,
        speaker: "",
        body_text: "",
        play_dialog: function(speaker, text, time, callback) {
            this.speaker = speaker;
            this.body_text = text;
            this.display = true;
            setTimeout(function() {
                game.dialog.display = false;
                callback();
            }, time);
        }
        
    },
    
    // an object where to store game information
    data : {
        // score
        score : 0
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto", scaleMethod : "fit"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        game.resources = game.resources.concat([
            { name: "oot_font", type: "binary", src: "data/fnt/out-of-time.fnt" },
            { name: "oot_font", type: "image", src: "data/fnt/out-of-time.png" }
        ]);
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        
        me.input.bindKey(me.input.KEY.W,  "up");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.A,  "left");
        me.input.bindKey(me.input.KEY.D, "right");
        
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
