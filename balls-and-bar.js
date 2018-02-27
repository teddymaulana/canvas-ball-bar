const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
barPos = {
	x: undefined,
	y: undefined
}
colors = ['#9ea39c', '#846eaa', '#fbb2c5', '#b3b2de', '#98cbd5']

function Circle(x, y, dx, dy, radius, color) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius
	this.color = color
	this.isVisible = true
	this.draw = function() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle= this.color
		c.fill()
	}
	this.update = function() {
		if (this.x + this.radius > innerWidth) {
			this.dx = -this.dx
		} else if (this.x - this.radius < 25) {
			if (this.y >= barPos.y && this.y <= barPos.y + 140) {
				this.dx = -this.dx
				}
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
		}
		this.x += this.dx
		this.y += this.dy

		this.draw();
	}
	this.addGravity = function() {
		if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius  < 0) {
			this.dx = -this.dx * 0.1
		}
		if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy * 0.9
		} else {
			this.dy += 1	
		}
		this.x += this.dx
		this.y += this.dy
		this.draw();
	}
}

function Brick(x, y, height, width) {
	this.x = x
	this.y = y
	this.height = height
	this.width = width
	this.isInvisible = false
	this.draw = function() {
		c.beginPath()
		c.rect(this.x, this.y, this.width, this.height)
		c.fillStyle = '#000'
		c.fill()
	}
}
function Bar(x, y) {
	this.x = x
	this.y = y
	this.draw = function() {
		c.beginPath()
		c.rect(this.x, this.y, 20, 140); 
		c.fillStyle = '#000'
		c.fill()
	}
	this.update = function() {
		this.y = barPos.y
		this.draw()
	}
}

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)
	bricks.forEach(brick => {
		brick.draw()
	})
	circles.forEach(circle => {
		circle.update()
	})
	bar.update()
}

function createSingleBall(radius) {
		var radius = radius
		var x = Math.random() * (innerWidth - radius * 2) + radius
		var y = Math.random() * (innerHeight - radius * 2) + radius
		var dx = (Math.random() - 0.5) * 9
		var dy = (Math.random() - 0.5) * 9
		var color = colors[Math.floor(Math.random() * colors.length)]
		circles.push(new Circle(x,y,dx,dy,radius,color))
}

function createBricks(lines, xPos, brickHeight, brickWidth) {
	var x,y
	var xPos = xPos
	var bHeight = brickHeight
	var bWidth = brickWidth
	var totalLines = lines
	var brickPerLine = Math.floor(canvas.height / bHeight)
	for (i = 0;i < brickPerLine;i++) {
		var igap = i*5
		y = (i % brickPerLine) * bHeight + igap
		for (j = 0;j < totalLines;j++) {
			var jgap = j*5
			x = j * bWidth + jgap + xPos
			console.log(y)
			bricks.push(new Brick(x, y, brickHeight, brickWidth))
		}
	}
}

let bricks = []
let circles = []
let bar = new Bar(5, 0)

createSingleBall(50)
createBricks(9,500,100,40)
animate();

addEventListener('mousemove', function(event) {
	barPos.x = event.x
	barPos.y = event.y
})


