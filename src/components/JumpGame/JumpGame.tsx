import { useEffect, useRef, useState } from 'react';
import { container, canvas, scoreBoard, controls, controlButton, sprite, footerLogo } from '@/components/JumpGame/JumpGameStyle.css';
import { IconChevronLeft } from '@/ui/icons/IconChevronLeft';
import { IconChevronRight } from '@/ui/icons/IconChevronRight';
import spriteImage from '@/assets/sprite.png'
import characterURL from '@/assets/sprites/ELE character sprites.png';
import platformURL from '@/assets/sprites/platformsprites1.png';
import houseURL from '@/assets/house-sprite.png';
import groundURL from '@/assets/ground-sprite.png';
import footerLogoURL from '@/assets/GamingLabelFooter.png';

interface JumpGameProps {
  gameOverCallback: (score: number) => void;
  menuCallback: () => void;
}
export const JumpGame = ({ gameOverCallback, menuCallback }: JumpGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const platformRef = useRef<HTMLImageElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  const groundRef = useRef<HTMLImageElement>(null);
  const screenPortion = 0.8;
  const [width, setWidth] = useState(document.getElementById('main')!.offsetWidth);
  const [height, setHeight] = useState(Math.floor((document.getElementById('main')!.offsetHeight)));
  let ctx: any;

  //Variables for game
  var platforms: Platform[] = [],
    image: HTMLImageElement,
    characterSprites: HTMLImageElement,
    platformSprites: HTMLImageElement,
    houseSprite: HTMLImageElement,   
    groundSprite: HTMLImageElement, 
    left: HTMLButtonElement,
    right: HTMLButtonElement,
    player: Player, 
    game: Game,
    deltaTime = 0,
    platformCount = 10,
    position = 0,
    gravity = 800,
    xAcceleration = 400,
    xDeceleration = 300,
    flag = 0,
    broken = 0,
    dir: string, 
    score = 0,
    paused = false;

  var animationFrameId: number;

  //Base class
  class Base {
    height: number;
    width: number;
    grassHeight: number;
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    moved: number;
    x: number;
    y: number;
    draw: () => void;
    constructor() {
      this.height = 87;
      this.width = width;
      this.grassHeight = 16;

      //Sprite clipping
      this.cx = 0;
      this.cy = 0;
      this.cwidth = 128;
      this.cheight = 87;

      this.moved = 0;

      this.x = 0;
      this.y = height - this.height;

      this.draw = function() {
        try {
          let tx = 0;
          while ((tx) < this.width) {
            ctx.drawImage(groundSprite, this.cx, this.cy, this.cwidth, this.cheight, tx, this.y, this.cwidth, this.cheight);
            tx += this.cwidth;
          }
        } catch (e) {}
      };
    }
  };

  var base = new Base();

  //Player class
  class Player {
    vy: number;
    vx: number;
    isMovingLeft: boolean;
    isMovingRight: boolean;
    isDead: boolean;
    width: number;
    height: number;
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    dir: string;
    x: number;
    y: number;
    animationTimer: number;
    spriteIndex: number;
    draw: () => void;
    jump: () => void;
    jumpHigh: () => void;

    constructor() {
      this.vy = 11;
      this.vx = 0;

      this.isMovingLeft = false;
      this.isMovingRight = false;
      this.isDead = false;

      this.width = 55;
      this.height = 40;

      //Sprite clipping
      this.cx = 0;
      this.cy = 0;
      this.cwidth = 55;
      this.cheight = 40;

      this.dir = "left";

      this.x = width / 2 - this.width / 2;
      this.y = height - 1;

      this.animationTimer = 0;
      this.spriteIndex = 0;

      //Function to draw it
      this.draw = function() {
        try {
          this.animationTimer += deltaTime;
          
          // Clipping logic
          switch (Math.floor(this.animationTimer / 0.15)) {
            case 0: {
              this.cy = 1;
              break;
            }
            case 1: {
              this.cy = 50;
              break;
            }
            case 2: {
              this.cy = 98;
              break;
            }
            case 3: {
              this.cy = 145;
              break;
            }
            default: this.cy = 72;
          }
          if (this.dir == "left") this.cy += 186;
          this.cx = this.spriteIndex * 55;

          if (this.animationTimer >= 0.45) this.animationTimer = 0;

          ctx.drawImage(characterSprites, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
        } catch (e) {
          console.log("error");
        }
      };

      this.jump = function() {
        this.vy = -600;
      };

      this.jumpHigh = function() {
        this.vy = -1000;
      };
    }
  };

  player = new Player();

  //House class
  class House {
    width: number;
    height: number;
    x: number;
    y: number;
    cx: number;
    cy: number;
    draw: () => void;
    cwidth: number;
    cheight: number;
    constructor() {
      this.width = 246;
      this.height = 138;
      this.x = width/2 - this.width/2;
      this.y = 0 - this.height;
      this.cwidth = 123;
      this.cheight = 69;
      this.cx = 0;
      this.cy = 0;
      this.draw = function() {
        try {
          ctx.drawImage(houseSprite, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
        } catch (e) {
          console.log("error");
        }
      }
    }
  }

  var house = new House();

  //Platform class

  enum platformType {
    NORMAL,
    MOVING,
    BREAKABLE,
    VANISHABLE,
  }

  class Platform {
    width: number;
    height: number;
    x: number;
    y: number;
    flag: number;
    state: number;
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    draw: () => void;
    type: platformType;
    types: number[];
    moved: number;
    vx: number;

    constructor() {
      this.width = 75;
      this.height = 14;

      this.x = Math.random() * (width - this.width);
      this.y = position;

      position += (height / platformCount);

      this.flag = 0;
      this.state = 0;

      //Sprite clipping
      this.cx = 0;
      this.cy = 0;
      this.cwidth = 75;
      this.cheight = 14;

      //Function to draw it
      this.draw = function() {
        try {

          if (this.type == platformType.NORMAL) this.cy = 1;
          else if (this.type == platformType.MOVING) this.cy = 33;
          else if (this.type == platformType.BREAKABLE && this.flag === 0) this.cy = 17;
          else if (this.type == platformType.BREAKABLE && this.flag == 1) this.cy = 1000;
          else if (this.type == platformType.VANISHABLE && this.state === 0) this.cy = 49;
          else if (this.type == platformType.VANISHABLE && this.state == 1) this.cy = 89;

          ctx.drawImage(platformSprites, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
        } catch (e) {}
      };

      //Platform types
      //0: Normal
      //1: Moving
      //2: Breakable (Go through)
      //3: Vanishable 
      //Setting the probability of which type of platforms should be shown at what score
      if (score >= 5000) this.types = [1, 2, 2, 2, 3, 3, 3, 3];
      else if (score >= 2000 && score < 5000) this.types = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
      else if (score >= 1000 && score < 2000) this.types = [1, 1, 1, 2, 2, 2, 2, 2];
      else if (score >= 500 && score < 1000) this.types = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
      else if (score >= 100 && score < 500) this.types = [0, 0, 0, 0, 1, 1];
      else this.types = [0];

      this.type = this.types[Math.floor(Math.random() * this.types.length)];

      //We can't have two consecutive breakable platforms otherwise it will be impossible to reach another platform sometimes!
      if (this.type == platformType.BREAKABLE && broken < 1) {
        broken++;
      } else if (this.type == platformType.BREAKABLE && broken >= 1) {
        this.type = platformType.NORMAL;
        broken = 0;
      }

      this.moved = 0;
      this.vx = 60;
    }
  }

  for (var i = 0; i < platformCount; i++) {
    platforms.push(new Platform());
  }

  //Broken platform object
  class Platform_broken_substitute {
    height: number;
    width: number;
    x: number;
    y: number;
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    appearance: boolean;
    draw: () => void;
    constructor() {
      this.height = 23;
      this.width = 70;

      this.x = 0;
      this.y = 0;

      //Sprite clipping
      this.cx = 3;
      this.cy = 65;
      this.cwidth = 48;
      this.cheight = 23;

      this.appearance = false;

      this.draw = function() {
        try {
          if (this.appearance === true) ctx.drawImage(platformSprites, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
          else return;
        } catch (e) {}
      };
    }
  };

  var platform_broken_substitute = new Platform_broken_substitute();

  //Spring Class
  class spring {
    x: number;
    y: number;
    width: number;
    height: number;
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    state: number;
    draw: () => void;
    constructor() {
      this.x = 0;
      this.y = 0;

      this.width = 26;
      this.height = 30;

      //Sprite clipping
      this.cx = 0;
      this.cy = 0;
      this.cwidth = 45;
      this.cheight = 53;

      this.state = 0;

      this.draw = function() {
        try {
          if (this.state === 0) this.cy = 445;
          else if (this.state == 1) this.cy = 501;

          ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
        } catch (e) {}
      };
    }
  };

  var Spring = new spring();

  function keyDown(e: KeyboardEvent) {
    var key = e.keyCode;

    if (key == 37) {
      dir = "left";
      player.isMovingLeft = true;
    } else if (key == 39) {
      dir = "right";
      player.isMovingRight = true;
    }
  }

  function keyUp(e: KeyboardEvent) {
    var key = e.keyCode;

    if (key == 37) {
      dir = "left";
      player.isMovingLeft = false;
    } else if (key == 39) {
      dir = "right";
      player.isMovingRight = false;
    }
  }

  function onLeftTouchStart(e: TouchEvent) {
    dir = "left";
    player.isMovingLeft = true;
  }
  function onLeftTouchEnd(e: TouchEvent) {
    dir = "left";
    player.isMovingLeft = false;
  }
  function onRightTouchStart(e: TouchEvent) {
    dir = "right";
    player.isMovingRight = true;
  }
  function onRightTouchEnd(e: TouchEvent) {
    dir = "right";
    player.isMovingRight = false;
  }

  function onLeftMouseDown(e: MouseEvent) {
    dir = "left";
    player.isMovingLeft = true;
  }
  function onLeftMouseUp(e: MouseEvent) {
    dir = "left";
    player.isMovingLeft = false;
  }
  function onRightMouseDown(e: MouseEvent) {
    dir = "right";
    player.isMovingRight = true;
  }
  function onRightMouseUp(e: MouseEvent) {
    dir = "right";
    player.isMovingRight = false;
  }


  class Game {
    height: number;
    width: number;
    jumpCount: number;
    previousTime: number;
    paintCanvas: () => void;
    playerCalc: () => void;
    springCalc: () => void;
    platformCalc: () => void;
    collides: () => void;
    updateScore: () => void;
    gameOver: () => void;
    update: () => void;
    animLoop: (currentTime: DOMHighResTimeStamp) => void;
    init: () => void;
    pause: () => void;
    resume: () => void;
    houseCalc: () => void;
    constructor() {
      this.height = height;
      this.width = width;
      this.jumpCount = 0;
      this.previousTime = 0;
      this. paintCanvas = () => {
        ctx.clearRect(0, 0, this.width, this.height);
      }
      this.playerCalc = () => {
        if (dir == "left") {
          player.dir = "left";
        } else if (dir == "right") {
          player.dir = "right";
        }

        //Accelerations produces when the user hold the keys
        if (player.isMovingLeft === true) {
          player.x += player.vx * deltaTime;
          player.vx -= xAcceleration * deltaTime;
        } else {
          player.x += player.vx * deltaTime;
          if (player.vx < 0) player.vx += xDeceleration * deltaTime;
        }

        if (player.isMovingRight === true) {
          player.x += player.vx * deltaTime;
          player.vx += xAcceleration * deltaTime;
        } else {
          player.x += player.vx * deltaTime;
          if (player.vx > 0) player.vx -= xDeceleration * deltaTime;
        }

        // Speed limits!
        if(player.vx > 480)
          player.vx = 480;
        else if(player.vx < -480)
          player.vx = -480;
        
        //Jump the player when it hits the base
        if ((player.y + player.height) > (base.y + base.grassHeight) && (base.y + base.grassHeight) < this.height) player.jump();

        //Gameover if it hits the bottom 
        if (base.y > this.height && (player.y + player.height) > this.height && player.isDead == false) player.isDead = true;

        //Make the player move through walls
        if (player.x > this.width) player.x = 0 - player.width;
        else if (player.x < 0 - player.width) player.x = this.width;

        //Movement of player affected by gravity
        if (player.y >= (this.height / 2) - (player.height / 2)) {
          player.y += player.vy * deltaTime;
        }

        //When the player reaches half height, move the platforms to create the illusion of scrolling and recreate the platforms that are out of viewport...
        else {
          platforms.forEach( (p, i) => {

            if (player.vy < 0) {
              p.y -= player.vy * deltaTime;
            }

            if (p.y > this.height) {
              platforms[i] = new Platform();
              platforms[i].y = p.y - this.height;
            }

          });

          if (base.y < this.height) base.y -= player.vy * deltaTime;
          if (player.vy < 0) house.y -= player.vy * deltaTime;


          if (player.vy >= 0) {
            player.y += player.vy * deltaTime;
            player.vy += gravity * deltaTime;
          }

          score++;
        }

        player.vy += gravity * deltaTime;

        //Make the player jump when it collides with platforms
        this.collides();

        if (player.isDead === true) this.gameOver();
      }
      
      this.springCalc = () => {
        var s = Spring;
        var p = platforms[0];

        if (p.type == platformType.NORMAL || p.type == platformType.MOVING) {
          s.x = p.x + p.width / 2 - s.width / 2;
          s.y = p.y - p.height - 10;

          if (s.y > this.height / 1.1) s.state = 0;

          s.draw();
        } else {
          s.x = 0 - s.width;
          s.y = 0 - s.height;
        }
      }

      this.platformCalc = () => {
        var subs = platform_broken_substitute;

        platforms.forEach( (p, i) => {
          if (p.type == platformType.MOVING) {
            if (p.x < 0 || p.x + p.width > this.width) p.vx *= -1;

            p.x += p.vx * deltaTime;
          }

          if (p.flag == 1 && subs.appearance === false && this.jumpCount === 0) {
            subs.x = p.x;
            subs.y = p.y;
            subs.appearance = true;

            this.jumpCount++;
          }

          p.draw();
        });

        if (subs.appearance === true) {
          subs.draw();
          subs.y += 480 * deltaTime;
        }

        if (subs.y > this.height) subs.appearance = false;
      }

      this.collides = () => {
        //Platforms
        platforms.forEach((p, i) => {
          if (player.vy > 0 && p.state === 0 && 
            (player.x + 15 < p.x + p.width) && 
            (player.x + player.width - 15 > p.x) && 
            (player.y + player.height > p.y) && 
            (player.y + player.height < p.y + p.height)) {

            if (p.type == platformType.BREAKABLE && p.flag === 0) {
              p.flag = 1;
              this.jumpCount = 0;
              return;
            } else if (p.type == platformType.VANISHABLE && p.state === 0) {
              player.jump();
              p.state = 1;
            } else if (p.flag == 1) return;
            else {
              player.jump();
            }
          }
        });

        //Springs
        var s = Spring;
        if (player.vy > 0 && (s.state === 0) && 
          (player.x + 15 < s.x + s.width) && 
            (player.x + player.width - 15 > s.x) && 
              (player.y + player.height > s.y) && 
                (player.y + player.height < s.y + s.height)) {
          s.state = 1;
          player.jumpHigh();
        }
      }

      this.houseCalc = () => {
        if (score >= 2000) {
          house.x += ((player.x + player.width / 2) - (house.x + house.width / 2)) / 35;
          house.y += ((player.y + player.height / 2) - (house.y + house. height / 2)) / 35;
        }
        house.draw();
      }

      this.updateScore = () => {
        var scoreText = document.getElementById("score");
        if (scoreText !== null) scoreText.innerHTML = `${score}`;
      }

      this.gameOver = () => {
        platforms.forEach(function(p, i) {
          p.y -= 600 * deltaTime;
        });

        if(player.y > this.height/2 && flag === 0) {
          player.y -= 500 * deltaTime;
          player.vy = 0;
        } 
        else if(player.y < this.height / 2) flag = 1;
        else if(player.y + player.height > this.height) {
          // showGoMenu();
          player.isDead = true;
          cancelAnimationFrame(animationFrameId);
          gameOverCallback(score);

          // var tweet = document.getElementById("tweetBtn");
          // tweet.href='https://twitter.com/share?url=http://is.gd/PnFFzu&text=I just scored ' +score+ ' points in the HTML5 Doodle Jump game!&count=horiztonal&via=cssdeck&related=solitarydesigns';
        
          // var facebook = document.getElementById("fbBtn");
          // facebook.href='https://facebook.com/sharer.php?s=100&p[url]=http://cssdeck.com/labs/html5-doodle-jump/8&p[title]=I just scored ' +score+ ' points in the HTML5 Doodle Jump game!&p[summary]=Can you beat me in this awesome recreation of Doodle Jump created in HTML5?';
        }
      }

      this.update = () => {
        this.paintCanvas();
        this.houseCalc();

        this.platformCalc();

        this.springCalc();

        this.playerCalc();
        player.draw();

        base.draw();

        this.updateScore();
      }

      this.animLoop = (currentTime: DOMHighResTimeStamp) => {
        if (this.previousTime === 0) this.previousTime = currentTime;
        deltaTime = (currentTime - this.previousTime) / 1000;
        this.previousTime = currentTime;
        this.update();
        animationFrameId = requestAnimationFrame(this.animLoop);
      }

      this.init = () => {
        dir = "left;"
        player.spriteIndex = Math.floor(Math.random() * 3);
        requestAnimationFrame(this.animLoop);
      }

      this.pause = () => {
        cancelAnimationFrame(animationFrameId);
      }

      this.resume = () => {
        this.previousTime = 0;
        requestAnimationFrame(this.animLoop);
      }
    }
  }

  game = new Game();

  const handleMenu = () => {
    console.log("click!");
    if (paused) {
      game.resume();
      paused = false;
    } else {
      game.pause();
      paused = true;
    }
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      game.pause();
      paused = true;
      menuCallback();
    } 
  }

  useEffect(() => {
    const updateCtx = () => {
      if (canvasRef.current) {
        ctx = canvasRef.current.getContext('2d');
        const newWidth = Math.min(innerWidth, innerHeight);
        const newHeight = Math.floor(innerHeight * screenPortion);
        setWidth(newWidth);
        setHeight(newHeight);
        game.width = newWidth;
        game.height = newHeight;
        // base.width = newWidth;
        // base.y = newHeight;
      }
    }
    addEventListener('resize', updateCtx)
    const menu = document.getElementById("menu");
    if (
      !canvasRef.current || 
      !spriteRef.current ||
      !characterRef.current ||
      !platformRef.current ||
      !houseRef.current ||
      !groundRef.current ||
      !leftRef.current ||
      !rightRef.current ||
      !menu
    ) {
      console.log('reference error');
      return;
    }
    ctx = canvasRef.current.getContext('2d'); 
    image = spriteRef.current;
    characterSprites = characterRef.current;
    platformSprites= platformRef.current;
    houseSprite = houseRef.current;
    groundSprite = groundRef.current;
    left = leftRef.current;
    right = rightRef.current;

    //Adding pause functionality
    menu.addEventListener("click", handleMenu);
    document.addEventListener("visibilitychange", handleVisibilityChange)
    //Adding keyboard controls
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    //Adding touch controls
    left.addEventListener("touchstart", onLeftTouchStart);
    left.addEventListener("touchend", onLeftTouchEnd);
    right.addEventListener("touchstart", onRightTouchStart);
    right.addEventListener("touchend", onRightTouchEnd);

    //Adding button controls
    left.addEventListener("mousedown", onLeftMouseDown);
    left.addEventListener("mouseup", onLeftMouseUp);
    right.addEventListener("mousedown", onRightMouseDown);
    right.addEventListener("mouseup", onRightMouseUp);
    
    // document.addEventListener("visibilitychange", onVisibilityChange);
    game.init();
    return () => {
      cancelAnimationFrame(animationFrameId);
      // document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
      left.removeEventListener("touchstart", onLeftTouchStart);
      left.removeEventListener("touchend", onLeftTouchEnd);
      right.removeEventListener("touchstart", onRightTouchStart);
      right.removeEventListener("touchend", onRightTouchEnd);
      left.removeEventListener("mousedown", onLeftMouseDown);
      left.removeEventListener("mouseup", onLeftMouseUp);
      right.removeEventListener("mousedown", onRightMouseDown);
      right.removeEventListener("mouseup", onRightMouseUp);
      menu.removeEventListener("click", handleMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      removeEventListener('resize', updateCtx);
    }
  }, []);

  return (
    <div className={container}>
      <div className={scoreBoard} id="scoreBoard">
        <p id="score">0</p>
      </div>
      <canvas id="canvas" className={canvas} ref={canvasRef} width={width} height={height}>
        Aww, your browser doesn't support HTML5!
      </canvas>

      <div className={controls}>
        <button ref={leftRef} className={controlButton}>
          <IconChevronLeft size={"32"}/>
        </button>
        <button ref={rightRef} className={controlButton}>
          <IconChevronRight size={"32"}/>
        </button>
      </div>
      <img onClick={() => open('https://bigloudrock.com')} className={footerLogo} src={footerLogoURL} />

      
      {/*Preloading image ;)*/}
      <img id="sprite" className={sprite} ref={spriteRef} src={spriteImage}/>
      <img id="char1" className={sprite} ref={characterRef} src={characterURL} /> 
      <img id="charGif" className={sprite} ref={platformRef} src={platformURL} /> 
      <img id="house" className={sprite} ref={houseRef} src={houseURL} /> 
      <img id="ground" className={sprite} ref={groundRef} src={groundURL} />
    </div>
  )
}
