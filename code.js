var caller = $("#ringImg");

function catchme() {
    var randX = Math.floor(Math.random() * (window.innerWidth - 200));
    var randY = Math.floor(Math.random() * (window.innerHeight - 250));
    console.log([randX, randY]);
    caller.stop().animate({ left: randX + "px", top: randY + "px" });
}

function givememoney() {
    var exists = document.getElementById("givememoney");
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

    var element = document.querySelector("body");
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        focused = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log(window.innerWidth + " x " + window.innerHeight);
    canvas.id = "givememoney";

    var coin = new Image();
    coin.src = "img/coin.png";
    // 440 wide, 40 high, 10 states
    coin.onload = function () {
        element.appendChild(canvas);
        focused = true;
        drawloop();
    };
    var coins = [];

    function drawloop() {
        if (focused) {
            requestAnimationFrame(drawloop);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.3) {
            coins.push({
                x: (Math.random() * canvas.width) | 0,
                y: -50,
                dy: 3,
                s: 0.5 + Math.random(),
                state: (Math.random() * 10) | 0,
            });
        }
        var i = coins.length;
        while (i--) {
            var x = coins[i].x;
            var y = coins[i].y;
            var s = coins[i].s;
            var state = coins[i].state;
            coins[i].state = state > 9 ? 0 : state + 0.1;
            coins[i].dy += 0.3;
            coins[i].y += coins[i].dy;

            ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s);

            if (y > canvas.height) {
                coins.splice(i, 1);
            }
        }
    }
}

$(document).ready(function () {
    caller.on("mouseenter", catchme);

    caller.on("click", givememoney);
});