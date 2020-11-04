/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

game.DialogGUI = game.DialogGUI || {};

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";
    },
    
    draw: function(renderer) {
        
    }
});

game.DialogGUI.Container = me.Container.extend({
    init: function() {
        this.visible_state = 0;
        this.visible = true;
        this._super(me.Container, "init");
        this.isPersistent = true;
        this.floating = true;
        this.name = "dialog_gui";
        
        var text_const = {
            font: "oot_font",
            size: 2,
            text: ""
        };
        
        this.dialog_head = new me.BitmapText(4, 500+4, text_const);
        this.dialog_body = new me.BitmapText(4, 500+21, text_const);
        
        this.addChild(new game.HUD.Dialog_Background(480, 500));
        
        this.addChild(this.dialog_head);
        this.addChild(this.dialog_body);
    },
    
    draw: function(renderer) {
        this.dialog_head.alpha = game.dialog.display ? 1 : 0;
        this.dialog_body.alpha = game.dialog.display ? 1 : 0;
        
        this.dialog_head.setText(game.dialog.speaker);
        this.dialog_body.setText(game.dialog.body_text);
        
        this.dialog_head.draw(renderer, "", 0, 0);
        this.dialog_body.draw(renderer, "", 0, 0);
    }
});

game.HUD.Dialog_Background = me.GUI_Object.extend({
    init: function(x, y) {
        var settings = {};
        settings.image = "dialog_background";
        settings.framewidth = 720;
        settings.frameheight = 150;
        
        this._super(me.GUI_Object, "init", [x, y, settings]);
        
        this.name = "Dialog_Background";
        
        this.pos.z = 4;
    },
    
    update: function() {
        this.alpha = game.dialog.display ? 0 : 1;
    }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        // draw it baby !
    }

});
