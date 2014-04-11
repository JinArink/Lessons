// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(0, 0, "100%", "100%");

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(100, 80, 50);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#f00");

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff");
circle.attr("stroke-width", 7);
var start = function () {
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.animate({
        r: 70,
        opacity: .25
    }, 500, ">");
},
move = function (dx, dy) {
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
},
up = function () {
    this.animate({r: 50, opacity: 1}, 500, ">");
};
paper.set(circle).drag(move, start, up);
