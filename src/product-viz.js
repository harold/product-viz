let sliderElt = document.getElementById("slider")

let canvasElt = document.getElementById("drawing")
let ctx = canvasElt.getContext("2d")

let [baseR, baseG, baseB] = [0.4, 0.4, 0.4]
let [endR, endG, endB] = [0.1, 0.98, 1.0]

let [canvasWidth, canvasHeight] = [canvasElt.width, canvasElt.height]

let travelTimeMilliseconds = 20000

function drawRect(x,y, color){
  let size = 5
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x-size/2, y-size/2, size, size)
  ctx.closePath()
  ctx.stroke()
}

function clamp(v, minimum, maximum) {
  return Math.max(Math.min(v, maximum), minimum)
}

function lerp(v1, v2, p) {
  return v1+(p*(v2-v1))
}

// An array to hold our JavaScript objects representing all the people
let objects = []

// Populate the array
let rowCount = 10
let colCount = 80
for(let y=0; y<rowCount; y++) {
  for(let x=0; x<colCount; x++) {
    objects.push({progress: 0})
  }
}

let spread = canvasWidth/colCount

function frame(timestamp) {
  ctx.clearRect(0, 0, canvasElt.width, canvasElt.height)
  // Go over the array of objects and draw them
  let offset = (timestamp % travelTimeMilliseconds)/travelTimeMilliseconds
  for(let y=0; y<rowCount; y++) {
    for(let x=0; x<colCount; x++) {
      let i = x+colCount*y
      let xPos = (spread*(x+1) + canvasWidth*offset) % canvasWidth
      let yPos = spread*(y+1) + 100*objects[i].progress
      let r = 255*lerp(baseR, endR, objects[i].progress)
      let g = 255*lerp(baseG, endG, objects[i].progress)
      let b = 255*lerp(baseB, endB, objects[i].progress)
      drawRect(xPos, yPos, "rgb(" + r + "," + g + "," + b + ")")
    }
  }

  // Every now and then, someone makes some progress
  if(Math.random() < slider.value) {
    let x = Math.floor(Math.random()*colCount)
    let y = Math.floor(Math.random()*rowCount)
    let i = x+colCount*y
    objects[i].progress = clamp(objects[i].progress+0.1, 0, 1)
  }

  // If the person to your right has made more progress than you, then you also progress
  for(let y=0; y<rowCount; y++) {
    for(let x=0; x<colCount; x++) {
      let i = x+colCount*y
      let neighborI = ((x+1)%colCount)+colCount*y
      if( objects[neighborI].progress > objects[i].progress ) {
        objects[i].progress = lerp(objects[i].progress, objects[neighborI].progress, 0.05)
      }
    }
  }

  requestAnimationFrame(frame)
}

// Kick off the animation
requestAnimationFrame(frame)
