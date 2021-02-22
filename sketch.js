var pics = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var picsort = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var rights = [0];
let boxe = [];
let col = 4;
var bol = 0,
  che1 = 0,
  che2 = 0,
  cou = 0,
  newCol = 0,
  level = 8,
    colored = 230;
    nextBox=false;
win = true;

function startIt() {
setTimeout(function(){       colored = 0;
    for (let i = 0; i < boxe.length; i++) {boxe[i].checkIt();}}, 3000);
}

startIt();


function squaresBox() {
  shuffle(pics, true);

  let x = 0,
    y = 0,
    r = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < col; j++) {
      let b = new Boxes(75 + x, 50 + y, 100, pics[r]);
      r += 1;
      boxe.push(b);
      x += 115;
    }
    x = 0;
    y += 115;

  }
}




function setup() {

  squaresBox();
  
  buttonNext = createButton('Next level');
      buttonNext.position(-50, 600);

  buttonNext.mousePressed(NextLevel);

    buttonAgain = createButton('Play again');
  buttonAgain.mousePressed(PlayAgain);



}

function draw() {
 
  
  let canv = createCanvas(600 + newCol, 700);
  canv.center("horizontal");
  
  
  background(200);

  buttonAgain.position(windowWidth/2+150, 600);


  for (let i = 0; i < boxe.length; i++) {
    boxe[i].show();
  }
  

  var r = 0,
    x = 0,
    y = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < col; j++) {

      fill(0);
      noStroke();
      textSize(50);
      if (pics[r]>9) {
      text(pics[r], 95 + x, 115 + y);
      } else {text(pics[r], 110 + x, 115 + y);}
      
      r += 1;
      x += 115;

    }
    x = 0;
    y += 115;

  }


  if (rights.length > level) {
    text("Done in " + cou + " tries", 130, 560);
    nextBox = true;
  } else {
    text(cou + " tries", 200, 560);
        nextBox = false;

  }

  /*  rights = sort(rights);
   for (let f = 1; f < picsort.length; f++) {
      if (picsort[f] != rights[f]) {
        win = false;     text(cou + " tries", 200, 620);
  break;
      } else {win = true;}
    }
    if (win) {
      text("Done in " + cou + " tries", 150, 620);
    }*/
  


if (nextBox) {  
    buttonNext.position(windowWidth/2-250, 600);


} else {
    buttonNext.position(-50, 600);


}

}


class Boxes {
  constructor(x, y, r, valo) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.valo = valo;
    this.clic = true;

    this.brightness = colored;
  }

  clicked(px, py) {
    let d = dist(px, py, this.x + 50, this.y + 50);
    if (d < this.r / 2 && this.clic) {
      this.brightness = 230;
      bol += 1;

      if (bol == 1) {
        che1 = this.valo;
        this.clic = false;
      } else if (bol == 2) {
        che2 = this.valo;
        this.clic = false;
        cou += 1;

        if (che1 == che2) {
          rights.push(che1)
        }

      }


    }
  }

  checkIt() {
    for (let f = 0; f < rights.length; f++) {
      if (this.valo != rights[f]) {
        this.clic = true;
        this.brightness = colored;

      } else {
        this.clic = false;
        this.brightness = 255;
        break;
      }
    }
  }


  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness);
    square(this.x, this.y, this.r);
  }
}

function mousePressed() {
  for (let i = 0; i < boxe.length; i++) {
    boxe[i].clicked(mouseX, mouseY);
  }

  if (bol == 3) {
    for (let i = 0; i < boxe.length; i++) {
      boxe[i].checkIt();
      bol = 0;
      che1 = 0;
      che2 = 0;
    }
  }
}

function NextLevel() {
  newCol += 115;
  col += 1;
  rights = [0];
  win = true;
  cou = 0;
  bol = 0;
  che1 = 0;
  che2 = 0;
  boxe = [];

  level += 1;
  pics.push(level);
  pics.push(level);
  picsort.push(level);
  level += 1;
  pics.push(level);
  pics.push(level);
  picsort.push(level);
        colored = 230;

  squaresBox();

  startIt();

}

function PlayAgain() {
  newCol = 0;
  col = 4;
  boxe = [];

  rights = [0];
  bol = 0;
  che1 = 0;
  che2 = 0;
  cou = 0;
  level = 8;
  win = true;

  pics = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  picsort = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      colored = 230;

  squaresBox();

  startIt();

}
