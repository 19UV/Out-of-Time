/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        
        this.body.setVelocity(2, 2);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        this.body.gravity = new me.Vector2d(0, 0);
        
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("stand",      [0, 1]);
        this.renderable.addAnimation("walk_up",    [2, 3]);
        this.renderable.addAnimation("walk_down",  [4, 5]);
        this.renderable.addAnimation("walk_left",  [6, 7]);
        this.renderable.addAnimation("walk_right", [8, 9]);
        
        this.renderable.setCurrentAnimation("stand");
        
        this.previous_direction = -1;
    },

    /**
     * update the entity
     */
    update : function (dt) {
        this.body.vel.x = 0;
		this.body.vel.y = 0;
        
        const movement_input = [
            me.input.isKeyPressed("up"),
            me.input.isKeyPressed("down"),
            me.input.isKeyPressed("left"),
            me.input.isKeyPressed("right")
        ];
        var current_direction = -1;
        if (movement_input[0]) { // Move Up
            if (!movement_input[1]) {
                if (this.previous_direction != 0) this.renderable.setCurrentAnimation("walk_up");
                current_direction = 0;
            }
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        if (movement_input[1]) { // Move Down
            if (!movement_input[0]) {
                if (this.previous_direction != 1) this.renderable.setCurrentAnimation("walk_down");
                current_direction = 1;
            }
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        }
        
        if (movement_input[2]) { // Move Left
            if (!movement_input[3]) {
                if (this.previous_direction != 2) this.renderable.setCurrentAnimation("walk_left");
                current_direction = 2;
            }
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        if (movement_input[3]) { // Move Right
            if (!movement_input[0]) {
                if (this.previous_direction != 3) this.renderable.setCurrentAnimation("walk_right");
                current_direction = 3;
            }
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        if (current_direction == -1 && (this.previous_direction != -1)) {
            this.renderable.setCurrentAnimation("stand");
        }
        this.previous_direction = current_direction;
        
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});


game.doorChecker = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Enity, "init", [x,y,settings]);
        this.body.collisionType = me.collision.ACTION_OBJECT;
        this.checkpoint_type = settings.id;
    },
    
    onCollision: function(response, other) {
        return false;
    }
})