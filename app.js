var App = function(selector_id) {
	return {
		init: function() {
			this.el = document.getElementById(selector_id);
			this.width = this.el.parentElement.getBoundingClientRect().width;
			this.height = this.el.parentElement.getBoundingClientRect().height;
			this.start = this.start.bind(this)
			this.loop = this.loop.bind(this)
			this.start();
		},

		start: function() {
			this.canvas = this.el;
			this.context = this.canvas.getContext("2d");
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			var sprite = new Image(),
				ratio = 356.07 / 792,
				spriteWidth = 150;
			sprite.src = "./DVD_logo.svg";

			this.ball = {
				x: 100,
				y: 100,
				w: spriteWidth,
				h: spriteWidth * ratio,
				xSpeed: 1,
				ySpeed: 1,
				hue: 0,
				draw: function(ctx) {
					ctx.clearRect(this.x, this.y, this.w, this.h);
					ctx.globalCompositeOperation = "source-over";
					ctx.drawImage(sprite, this.x, this.y, this.w, this.h);

					ctx.globalCompositeOperation = "color";
					ctx.fillStyle = "hsl(" + this.hue + ", 100%, 50%)";
					ctx.fillRect(this.x, this.y, this.w, this.h);

					ctx.globalCompositeOperation = "destination-in";
					ctx.drawImage(sprite, this.x, this.y, this.w, this.h);

					ctx.globalCompositeOperation = "source-over";
				},
				move: function() {
					this.x += this.xSpeed;
					this.y += this.ySpeed;
				},
				color: function() {
					this.hue = Math.random() * (359 - 0) + 0;
				}
			}
			this.ball.color();
			setInterval(this.loop, 12);

		},
		loop: function() {
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.strokeRect(0, 0, this.width, this.height);
			this.ball.move();

			if (this.ball.x + this.ball.w >= this.width) {
				this.ball.x = this.width - this.ball.w;
				this.ball.xSpeed = -this.ball.xSpeed;
			}
			if (this.ball.x <= 0) {
				this.ball.x = 0;
				this.ball.xSpeed = -this.ball.xSpeed;
			}
			if (this.ball.y + this.ball.h >= this.height) {
				this.ball.y = this.height - this.ball.h;
				this.ball.ySpeed = -this.ball.ySpeed;
			}
			if (this.ball.y <= 0) {
				this.ball.y = 0;
				this.ball.ySpeed = -this.ball.ySpeed;
			}
			if (this.ball.y <= 0 || this.ball.y + this.ball.h >= this.height || this.ball.x <= 0 || this.ball.x + this.ball.w >= this.width) {
				this.ball.color();
			}

			if (
				(this.ball.x + this.ball.w >= this.width && this.ball.y + this.ball.h >= this.height) ||
				(this.ball.x + this.ball.w >= this.width && this.ball.y <= 0) ||
				(this.ball.x <= 0 && this.ball.y + this.ball.h >= this.height) ||
				(this.ball.x <= 0 && this.ball.y <= 0)
			) {
				alert("YOU WON A NEW IPHONE. CLICK HERE TO CLAIM YOUR PRIZE.");
			}

			this.ball.draw(this.context);

		},
	}
}

var dvd = new App("dvd");
(function() {
	dvd.init();
})();