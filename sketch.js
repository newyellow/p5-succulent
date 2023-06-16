
let lineDensity = 1.0;
let dotDensity = 1.0;

let mainHue = 0;

let curveTypes = []

// leaf settings
let leafCurveValue = 3;
let leafNoiseScale = 0.01;

let bowlHue = 0;
let bowlSat = 0;
let bowlBri = 0;

let plantHue = 0;
let plantSat = 0;
let plantBri = 0;

let leafHue = 0;
let leafSat = 0;
let leafBri = 0;

async function setup() {
  createCanvas(800, 1200);
  background(230);
  colorMode(HSB);

  dotDensity = random(0.1, 0.5);
  lineDensity = random(0.1, 0.8);

  mainHue = random(0, 360);

  curveTypes.push(easeOutSine);
  curveTypes.push(easeOutCubic);
  curveTypes.push(easeOutQuart);
  curveTypes.push(easeOutQuint);
  curveTypes.push(easeOutExpo);
  curveTypes.push(easeInOutSine);
  curveTypes.push(easeInOutBounce);
  curveTypes.push(easeOutBounce);
  curveTypes.push(easeOutElastic);
  curveTypes.push(easeInSine);
  curveTypes.push(easeOutBack);


  let xCount = floor(random(3, 12));
  let yCount = floor(random(3, 12));

  let rectWidth = width / xCount;
  let rectHeight = height / yCount;

  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {

      let startX = rectWidth * x;
      let startY = rectHeight * y;

      let plantX = startX + random(rectWidth * 0.2, rectWidth * 0.8);
      let plantY = startY + random(rectHeight * 0.2, rectHeight * 0.8);

      let plantSize = min(rectWidth, rectHeight) * random(0.3, 0.6);
      let leafWidth = plantSize * random(0.2, 0.8);

      let layers = floor(random(3, 12));
      let countPerLayer = floor(random(3, 24));

      randomBowlColor();
      fill(bowlHue, bowlSat, bowlBri);
      noStroke();

      blendMode(MULTIPLY);
      drawBowl(startX, startY, rectWidth, rectHeight);

      blendMode(BLEND);
      drawPlant(plantX, plantY, plantSize, plantSize * random(0.1, 0.7), leafWidth, layers, countPerLayer);
      //await sleep(1);
    }
  }
}

function drawBowl(_x, _y, _width, _height) {
  randomBowlColor();

  let thickness = random(0.1, 0.3) * min(_width, _height);
  let lineCount = thickness * lineDensity;

  noFill();
  stroke(bowlHue, bowlSat, bowlBri);

  // top
  for(let i=0; i<= lineCount; i++)
  {
    let x1_from = _x;
    let y1_from = _y;

    let x1_to = _x;
    let y1_to = _y + thickness;

    let x2_from = _x + _width;
    let y2_from = _y;

    let x2_to = _x + _width;
    let y2_to = _y + thickness;

    let t = i / lineCount;
    let x1 = lerp(x1_from, x1_to, t);
    let y1 = lerp(y1_from, y1_to, t);
    let x2 = lerp(x2_from, x2_to, t);
    let y2 = lerp(y2_from, y2_to, t);

    NYLine(x1, y1, x2, y2);
  }

  // bottom
  for(let i=0; i<= lineCount; i++)
  {
    let x1_from = _x;
    let y1_from = _y + _height - thickness;

    let x1_to = _x;
    let y1_to = _y + _height;

    let x2_from = _x + _width;
    let y2_from = _y + _height - thickness;
    let x2_to = _x + _width;
    let y2_to = _y + _height;

    let t = i / lineCount;
    let x1 = lerp(x1_from, x1_to, t);
    let y1 = lerp(y1_from, y1_to, t);
    let x2 = lerp(x2_from, x2_to, t);
    let y2 = lerp(y2_from, y2_to, t);

    NYLine(x1, y1, x2, y2);
  }

  // left
  for(let i=0; i<= lineCount; i++)
  {
    let x1_from = _x;
    let y1_from = _y;

    let x1_to = _x + thickness;
    let y1_to = _y;

    let x2_from = _x;
    let y2_from = _y + _height;

    let x2_to = _x + thickness;
    let y2_to = _y + _height;

    let t = i / lineCount;
    let x1 = lerp(x1_from, x1_to, t);
    let y1 = lerp(y1_from, y1_to, t);
    let x2 = lerp(x2_from, x2_to, t);
    let y2 = lerp(y2_from, y2_to, t);

    NYLine(x1, y1, x2, y2);
  }

  // right
  for(let i=0; i<= lineCount; i++)
  {
    let x1_from = _x + _width - thickness;
    let y1_from = _y;

    let x1_to = _x + _width;
    let y1_to = _y;

    let x2_from = _x + _width - thickness;
    let y2_from = _y + _height;

    let x2_to = _x + _width;
    let y2_to = _y + _height;

    let t = i / lineCount;
    let x1 = lerp(x1_from, x1_to, t);
    let y1 = lerp(y1_from, y1_to, t);
    let x2 = lerp(x2_from, x2_to, t);
    let y2 = lerp(y2_from, y2_to, t);

    NYLine(x1, y1, x2, y2);
  }

  NYLine(_x, _y, _x + _width, _y, thickness);
  NYLine(_x + _width, _y, _x + _width, _y + _height, thickness);
  NYLine(_x + _width, _y + _height, _x, _y + _height, thickness);
  NYLine(_x, _y + _height, _x, _y, thickness);
}

function drawPlant(_x, _y, _radiusMax, _radiusMin, _leafWidth, _layers, _countPerLayer) {

  let nowCurveType = random(curveTypes);
  let nowLeafWidth = _leafWidth;

  randomPlantColor();

  // random leaf value
  leafCurveValue = random(0.1, 4);
  leafNoiseScale = random(0.001, 0.1);

  for (let i = 0; i < _layers; i++) {

    let lengthT = 1 - (i / (_layers - 1));
    let nowLength = lerp(_radiusMin, _radiusMax, lengthT);

    let rotAdd = 360 / _countPerLayer;
    let nowRot = random(0, 360);

    let nowLeafWidth = _leafWidth * (nowLength / _radiusMax);

    for (let j = 0; j < _countPerLayer; j++) {

      nowRot += rotAdd * random(0.6, 1.4);
      drawLeaf(_x, _y, nowLeafWidth, nowLength, nowRot, nowCurveType);
    }
  }
}

function drawLeaf(_x, _y, _width, _length, _angle, _curve) {
  let drawCount = _length * lineDensity;
  randomLeafColor();

  let lineBriAdd = 0;

  for (let i = 0; i < drawCount; i++) {
    let t = i / drawCount;
    let widthT = _curve(1 - t);

    lineBriAdd = 20 * t;

    let baseX = _x + sin(radians(_angle)) * _length * t;
    let baseY = _y - cos(radians(_angle)) * _length * t;

    _angle += lerp(-leafCurveValue, leafCurveValue, noise(baseX * leafNoiseScale, baseY * leafNoiseScale, -600));

    let fromX = baseX + sin(radians(_angle - 90)) * _width * 0.5 * widthT;
    let fromY = baseY - cos(radians(_angle - 90)) * _width * 0.5 * widthT;

    let toX = baseX + sin(radians(_angle + 90)) * _width * 0.5 * widthT;
    let toY = baseY - cos(radians(_angle + 90)) * _width * 0.5 * widthT;

    // fill(leafHue, leafSat, leafBri + lineBriAdd);
    stroke(leafHue, leafSat, leafBri + lineBriAdd, 0.8);
    NYLine(fromX, fromY, toX, toY);
  }
}

function NYLine(_x1, _y1, _x2, _y2) {
  let distance = dist(_x1, _y1, _x2, _y2);
  let points = distance * dotDensity;

  for (let i = 0; i <= points; i++) {
    let x = lerp(_x1, _x2, i / points);
    let y = lerp(_y1, _y2, i / points);
    let size = noise(x * 0.1, y * 0.1, 600) * 6 + 1;

    // circle(x, y, size);
    push();
    strokeWeight(2);
    translate(x, y);
    rotate(noise(x * 0.001, y * 0.001, 123) * 60);
    line(0, -3, 0, 3);
    pop();
  }
}

function randomBowlColor() {
  bowlHue = mainHue + random(-30, 30);
  bowlSat = random(40, 60);
  bowlBri = random(60, 80);

  if(random() < 0.2)
    bowlHue += 180;

  if(random() < 0.1)
  {
    bowlSat = 0;
    bowlBri = random(90, 100);
  }

  if(bowlHue > 360)
    bowlHue -= 360;
  else if(bowlHue < 0)
    bowlHue += 360;
}

function randomPlantColor() {
  // plantHue = mainHue + random(-30, 30);
  plantHue = random(80, 140);
  plantSat = random(10, 60);
  plantBri = random(60, 80);
}

function randomLeafColor() {
  leafHue = plantHue + random(-20, 20);
  leafSat = plantSat + random(-10, 10);
  leafBri = plantBri + random(-5, 5);
}

function draw() {

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}