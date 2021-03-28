let canvasElt = document.getElementById("drawing")
let ctx = canvasElt.getContext("2d")
ctx.fillStyle = "#f8f8f8"

let animationMilliseconds = 5000

function richardsCurve(lowerLimit, upperLimit, growthRate, t) {
  return lowerLimit + (upperLimit-lowerLimit)/(1+Math.exp(-1*growthRate*t))
}
function draw_rect(x,y, color){
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.fillRect(x, y, 10, 10)
  ctx.closePath();
  ctx.stroke();
}
function frame(timestamp) {
  ctx.clearRect(0, 0, canvasElt.width, canvasElt.height)
  let p = (timestamp % animationMilliseconds)/animationMilliseconds
  let x = 10 + 480*p
  let y = richardsCurve(10, 490, 5, 2*(p-0.5))
  draw_rect(x-5, y-5, 'red')
  draw_rect(x*2, y*2, 'orange')
  draw_rect(x-5, y**2, 'blue')
  draw_rect(x-100, y, 'pink')
  draw_rect(x+100, y+50, 'yellow')
  draw_rect(x+50, y+50*Math.log(x), 'green')
  //draw_rect(x+Math.log(x**5), y-5*y, 'pink')
  requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
