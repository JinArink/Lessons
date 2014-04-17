function makeCircle(x, y, paper){
    var circle = paper.circle(x, y, 15);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");

    // Sets the stroke attribute of the circle to white
    circle.attr("stroke", "#fff");
    circle.attr("stroke-width", 7);
    
    circle.or = circle.attr("r");
    
    var start = function () {
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
        this.toFront();
        this.animate({
            r: this.or * 1.1,
            opacity: .5
        }, 200, ">");
    },
    move = function (dx, dy) {
        this.attr({cx: this.ox + dx, cy: this.oy + dy});
    },
    up = function () {
        this.animate({r: this.or, opacity: 1}, 200, ">");
    };
    paper.set(circle).drag(move, start, up);
    
    return circle;
}

function setRadius(r, circle){
    circle.attr("r", r);
    circle.or = r;
}
jQuery(document).ready(function ($) {
    
    // Creates canvas 320 × 200 at 10, 50
    var paper = Raphael(0, 0, "100%", "100%");
    
    $(paper.canvas).on("mousedown", function(e){
        if (e.target.nodeName == "svg" || e.target.nodeName == "DIV" ) {
            var circle = makeCircle(e.clientX, e.clientY, paper);
            var x = circle.attr("cx");
            var y = circle.attr("cy");
            $(paper.canvas).on("mousemove", function(e){
                var dx = e.clientX - x;
                var dy = e.clientY - y;
                var d = Math.sqrt(dx * dx + dy * dy);
                setRadius(d, circle);
            });
        }
    }).on("mouseup", function() {
        $(paper.canvas).off("mousemove");
    });
    
});