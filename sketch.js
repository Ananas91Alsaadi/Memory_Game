var pics = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var picsort = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var rights = [0];
let boxe = [];
let checkerxy = [];
let col = 4;
var bol = 0,
  che1 = 0,
  che2 = 0,
  cellsquare1,
  cellsquare2,
  cou = 0,
  cou2 = 0,
  newCol = 0,
  level = 8,
  colored = 230,
  nextBox = false,
  Mplayer = true,
    win1=0,win2=0,
  win = true;

function startIt() {
  setTimeout(function() {
    colored = 0;
    for (let i = 0; i < boxe.length; i++) {
      boxe[i].checkIt();
    }
  }, 3000);
}

startIt();


function squaresBox() {
  shuffle(pics, true);

  let x = 0,
    y = 0,
    r = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < col; j++) {
      let b = new Boxes(75 + x, 50 + y, 100, pics[r], r);
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
  buttonNext.position(-1000, 600);

  buttonNext.mousePressed(NextLevel);

  buttonAgain = createButton('Play again');
  buttonAgain.mousePressed(PlayAgain);


}

function draw() {


  let canv = createCanvas(600 + newCol, 700);
  canv.center("horizontal");


  background(200);

  buttonAgain.position(windowWidth / 2 + 150, 600);


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
      if (pics[r] > 9) {
        text(pics[r], 95 + x, 115 + y);
      } else {
        text(pics[r], 110 + x, 115 + y);
      }

      r += 1;
      x += 115;

    }
    x = 0;
    y += 115;

  }
      textSize(35);


  if (rights.length > level) {
    text("Done in " + cou + " tries", 130, 560);
    nextBox = true;
  } else {
    text(cou + " tries", 200, 560);
        text(cou2 + " tries", 200, 600);

    nextBox = false;
  }


  if (nextBox) {
    buttonNext.position(windowWidth / 2 - 250, 600);


  } else {
    buttonNext.position(-1000, 600);
  }
      textSize(20);

  text("Your correctes "+ win1, 200, 640);
  text("Computer correctes "+win2, 200, 660);
}


class Boxes {
  constructor(x, y, r, valo, iden) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.valo = valo;
    this.iden = iden;
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
        cellsquare1 = this.iden;

        this.clic = false;
      } else if (bol == 2) {
        che2 = this.valo;
        cellsquare2 = this.iden;

        this.clic = false;
        cou += 1;

        if (che1 == che2) {
          win1++;
          rights.push(che1);
          checkerxy.push(cellsquare1);

          checkerxy.push(cellsquare2);

        }
      }
    }
  }

  coputerT(cx, cy) {

    if (cx == this.iden && this.clic) {
      this.brightness = 230;
      bol += 1;

      if (bol == 1) {
        che1 = this.valo;
        cellsquare1 = this.iden;
        this.clic = false;
      } else if (bol == 2) {
        che2 = this.valo;
        cellsquare2 = this.iden;

        this.clic = false;
        cou2 += 1;
        bol += 1;

        if (che1 == che2) {
                    win2++;

          rights.push(che1);
          checkerxy.push(cellsquare1);
          checkerxy.push(cellsquare2);

        }
      }
    } else if (cy == this.iden && this.clic) {
      this.brightness = 230;
      bol += 1;

      if (bol == 1) {
        che1 = this.valo;
                cellsquare1 = this.iden;

        this.clic = false;
      } else if (bol == 2) {
        che2 = this.valo;
                cellsquare2 = this.iden;

        this.clic = false;
        cou2 += 1;
        bol += 1;

        if (che1 == che2) {
                              win2++;

          rights.push(che1)
          checkerxy.push(cellsquare1);
          checkerxy.push(cellsquare2);

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
  if (Mplayer) {
    for (let i = 0; i < boxe.length; i++) {
      boxe[i].clicked(mouseX, mouseY);
    }

    if (bol == 3) {
      for (let i = 0; i < boxe.length; i++) {
        boxe[i].checkIt();
      }
      bol = 0;
      
      if (che1 != che2) {Mplayer = false;}

      che1 = 0;
      che2 = 0;
      computerTurn();

    }
  }

}

function computerTurn() {
  if (Mplayer == false && checkerxy.length < (level*2-1) ) {
    let x = Math.floor(Math.random() * pics.length);
    let y = Math.floor(Math.random() * pics.length);
    
    let xycheck = false;
      for (let i = 0; i < checkerxy.length; i++) {
      if (checkerxy[i] == x || checkerxy[i] == y) {
            xycheck = true;
            break;
      } else {continue;}
    }

    console.log(x);
    console.log(y);
    console.log(checkerxy);
    
    if (x == y || xycheck) {
      computerTurn();
    } else {
      for (let i = 0; i < boxe.length; i++) {
        boxe[i].coputerT(x, y);
      }
    }
 
  setTimeout(function() {
    for (let i = 0; i < boxe.length; i++) {
      boxe[i].checkIt();
    }
    bol = 0;
    if (che1 != che2) {Mplayer = true;}

    che1 = 0;
    che2 = 0;
    computerTurn();
    
 }, 1000);
} }

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
  checkerxy = [];
    Mplayer = true;
    win1=0;win2=0;
    cou2 = 0;

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
  checkerxy = [];

  rights = [0];
  bol = 0;
  che1 = 0;
  che2 = 0;
  cou = 0;
    cou2 = 0;

  level = 8;
  win = true;
    Mplayer = true;
    win1=0;win2=0;


  pics = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  picsort = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  colored = 230;

  squaresBox();

  startIt();

}