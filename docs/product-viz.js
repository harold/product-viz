let canvasElt = document.getElementById("drawing")
let ctx = canvasElt.getContext("2d")
ctx.fillStyle = "#f8f8f8"

let animationMilliseconds = 5000

function richardsCurve(lowerLimit, upperLimit, growthRate, t) {
  return lowerLimit + (upperLimit-lowerLimit)/(1+Math.exp(-1*growthRate*t))
}

function frame(timestamp) {
  ctx.clearRect(0, 0, canvasElt.width, canvasElt.height)

  let p = (timestamp % animationMilliseconds)/animationMilliseconds
  let x = 10 + 480*p
  let y = richardsCurve(10, 490, 5, 2*(p-0.5))
  ctx.fillRect(x-5, y-5, 10, 10)
  requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
