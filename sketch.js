
// style parameters
let noiseScaleX = 0.1;
let noiseScaleY = 0.1;

let lineDensity = 1.0;
let dotDensity = 1.0;
let baseLineThickness = 1;
let baseLineLength = 6;


let mainHue = 0;

let curveTypes = []

// leaf settings
let leafCurveValue = 3;
let leafNoiseScale = 0.01;

// color settings
let nowHue = 0;
let nowSat = 0;
let nowBri = 0;
let nowAlpha = 0;


let bowls = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  colorMode(HSB);

  dotDensity = random(0.05, 0.5);
  lineDensity = random(0.4, 0.8);

  noiseScaleX = random(0.0001, 0.01);
  noiseScaleY = random(0.0001, 0.01);

  baseLineThickness = random(1, 6);
  baseLineLength = random(6, 12);

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

  // background rect?
  let bgHueA = processHue(mainHue + random(-10, 10));
  let bgHueB = processHue(mainHue + random(-10, 10));
  let bgSatA = random(0, 20);
  let bgSatB = random(0, 20);
  let bgBriA = random(5, 25);
  let bgBriB = random(5, 25);

  if(random() < 0.5)
  {
    bgBriA = random(20, 40);
    bgBriB = random(20, 40);
  }
  let bgLineCount = height * lineDensity;

  for (let y = 0; y < bgLineCount; y++) {
    let t = y / (bgLineCount - 1);
    let nowY = height * t;

    NYSetColorLerp(bgHueA, bgSatA, bgBriA, bgHueB, bgSatB, bgBriB, t);
    NYDotLine(0, nowY, width, nowY);
  }

  let xCount = floor(random(1, 3));
  let yCount = floor(random(1, 3));

  let padding = min(windowWidth, windowHeight) * 0.05;

  let rectWidth = (width - 2 * padding) / xCount;
  let rectHeight = (height - 2 * padding) / yCount;

  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {

      let startX = rectWidth * x + padding;
      let startY = rectHeight * y + padding;

      let plantX = startX + random(rectWidth * 0.2, rectWidth * 0.8);
      let plantY = startY + random(rectHeight * 0.2, rectHeight * 0.8);

      let plantSize = min(rectWidth, rectHeight) * random(0.3, 0.6);
      let leafWidth = plantSize * random(0.2, 0.8);

      let layers = floor(random(3, 12));
      let countPerLayer = floor(random(3, 24));

      let rects = SubdivideRect(startX, startY, rectWidth, rectHeight, 0);

      for (let r = 0; r < rects.length; r++) {
        let rect = rects[r];

        let bowlX = rect.x;
        let bowlY = rect.y;
        let bowlWidth = rect.w;
        let bowlHeight = rect.h;

        let newBowl = new PlantBowl(bowlX, bowlY, bowlWidth, bowlHeight);
        bowls.push(newBowl);
      }
    }
  }

  for (let i = 0; i < bowls.length; i++) {

    if (bowls[i].bowlType == 3) // empty bowl
      continue;

    if (bowls[i].bowlType <= 1) // rect
    {
      bowls[i].drawBowlRect();
    }
    else if (bowls[i].bowlType == 2) // circle
    {
      bowls[i].drawBowlRound();
    }

    await sleep(1);
  }

  for (let i = 0; i < bowls.length; i++) {
    if (bowls[i].bowlType == 3) // empty bowl
      continue;

    bowls[i].drawPlant();
    await sleep(1);
  }
}

function SubdivideRect(_x, _y, _width, _height, _depth) {

  let doSplit = random(0, 1) < 0.9;

  if (min(_width, _height) < 120) {
    doSplit = false;
  }

  if (doSplit) {
    let splitRatio = random(0.4, 0.6);

    // split X
    if (random() < 0.5) {
      let rectA_x = _x;
      let rectA_y = _y;
      let rectA_width = _width * splitRatio;
      let rectA_height = _height;

      let rectB_x = _x + _width * splitRatio;
      let rectB_y = _y;
      let rectB_width = _width * (1 - splitRatio);
      let rectB_height = _height;

      let rectA = SubdivideRect(rectA_x, rectA_y, rectA_width, rectA_height, _depth + 1);
      let rectB = SubdivideRect(rectB_x, rectB_y, rectB_width, rectB_height, _depth + 1);

      return rectA.concat(rectB);
    }
    // split Y
    else {
      let rectA_x = _x;
      let rectA_y = _y;
      let rectA_width = _width;
      let rectA_height = _height * splitRatio;

      let rectB_x = _x;
      let rectB_y = _y + _height * splitRatio;
      let rectB_width = _width;
      let rectB_height = _height * (1 - splitRatio);

      let rectA = SubdivideRect(rectA_x, rectA_y, rectA_width, rectA_height, _depth + 1);
      let rectB = SubdivideRect(rectB_x, rectB_y, rectB_width, rectB_height, _depth + 1);

      return rectA.concat(rectB);
    }
  }
  else {
    return [{ x: _x, y: _y, w: _width, h: _height, depth: _depth }];
  }
}

function draw() {

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}