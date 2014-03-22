
var jQuery, document;

jQuery(document).ready(function ($) {
    "use strict";
    
    /*
    param list: array to add ball
    */
    var addCircle = function(list, x, y, r, fixed){
        list.push(Physics.body('circle', {
            x: x,
            y: y,
            vx: 0.01,
            vy: 0,
            radius: r,
            mass: 0.1 * r,
            fixed: fixed
        }));
    };
    
    var addPolygon = function(list, x, y, vertices, angle, fixed) {
     list.push(Physics.body('convex-polygon', {
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            vertices: vertices,
            angle: angle,
            fixed: fixed
        }));
    };
    var ballSim = function(world, physics) {
        
        var shapes = [];
        
        addCircle(shapes, 300, 200, 30, false); 
        addCircle(shapes, 300, 100, 20, false);  
        addCircle(shapes, 300, 50, 25, false);    
        addCircle(shapes, 300, 250, 15, false);
        addCircle(shapes, 300, 150, 2, false);

        addPolygon(shapes, 300, 450, [
            {x: -80, y: 20},
            {x: 80, y: 20},
            {x: 80, y: 40},
            {x: -80, y: 40}
        ], 0.1 * Math.PI, true);
        
        addPolygon(shapes, 650, 450, [
            {x: -80, y: 20},
            {x: 80, y: 20},
            {x: 80, y: 40},
            {x: -80, y: 40}
        ], -0.1 * Math.PI, true);
        
        var $win = $(window)
            ,viewWidth = $win.width()
            ,viewHeight = $win.height()
            ,viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
            ,edgeBounce = Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds,
                restitution: 0.99,
                cof: 0.99
            })
            ;
        var renderer = Physics.renderer('canvas', {
            el: 'c',
            width: $(window).width(),
            height: $(window).height(),
            meta: false, // don't display meta data
            styles: {
                // set colors for the circle bodies
                'circle' : {
                    strokeStyle: 'hsla(60, 37%, 17%, 1)',
                    lineWidth: 1,
                    fillStyle: 'rgba(255,255,255,0.8)',
                    angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
                },
                'convex-polygon' : {
                    strokeStyle: 'hsla(60, 37%, 17%, 1)',
                    lineWidth: 1,
                    fillStyle: 'rgba(255,255,255,0.8)'
                }
            }
        });
        // add the renderer
        world.add( renderer );

        $(window).on('resize', function(){

            viewWidth = $win.width();
            viewHeight = $win.height();
            viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
            /*
            $("#c").css({
                width: viewWidth,
                height: viewHeight
            });
            */
            edgeBounce.setAABB( viewportBounds );
        }).trigger('resize');
        
        // add the circle to the world
        world.add( shapes );
        world.add( edgeBounce );
        world.add( Physics.behavior('body-impulse-response') );
        world.add( Physics.behavior('body-collision-detection') );
        //world.add( Physics.behavior('newtonian', { strength: .5 }) );
        world.add( Physics.behavior('sweep-prune') );
        
        var ACC = 0.0004;
        var gravity = Physics.behavior('constant-acceleration', {
            acc: { x : 0, y: ACC } // this is the default
        });
        world.add( gravity );
        $(document).keydown(function(e){
            if (e.keyCode == 37) { 
                // left
                gravity.setAcceleration({ x: -ACC, y: 0 });
                return false;
            }
            if (e.keyCode == 38) { 
               // up
                gravity.setAcceleration({ x: 0, y: -ACC });
               return false;
            }
            if (e.keyCode == 39) { 
               // right
                gravity.setAcceleration({ x: ACC, y: 0 });
               return false;
            }
            if (e.keyCode == 40) { 
               // down
                gravity.setAcceleration({ x: 0, y: ACC });
               return false;
            }
        });
        
        // subscribe to the ticker
        Physics.util.ticker.subscribe(function(time, dt) {
            //console.log(balls[0].state);
            //console.log(balls[0]);
            //Physics.util.ticker.stop();
            world.step( time );
            // Note: FPS ~= 1/dt
        });
        // start the ticker
        Physics.util.ticker.start();
/*
        $("#c").on("click", function() {
            direction = -direction;
            gravity.setAcceleration({ x: 0, y: direction*0.0004 }); 
        });
*/
    };
        
    var world = Physics({
        // set the timestep
        timestep: 1000.0 / 1600,
        // maximum number of iterations per step
        maxIPF: 16,
        // set the integrator (may also be set with world.add())
        integrator: 'verlet'
    }, ballSim);
    
    
    /*
    // add some gravity
    var gravity = Physics.behavior('constant-acceleration', {
        acc: { x : 0, y: 0.0004 } // this is the default
    });
    world.add( gravity );
    */
    
    

    world.subscribe('step', function(){
        // Note: equivalent to just calling world.render() after world.step()
        world.render();
    });
 
});
