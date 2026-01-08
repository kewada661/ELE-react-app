import { useEffect, useRef } from 'react';
import { container, canvas, scoreBoard, controls, controlButton, sprite } from '@/components/JumpGame/JumpGameStyle.css';
import { IconChevronLeft } from '@/ui/icons/IconChevronLeft';
import { IconChevronRight } from '@/ui/icons/IconChevronRight';
import spriteImage from '@/assets/sprite.png'
import characterURL from '@/assets/sprites/ELE character sprites.png';
import platformURL from '@/assets/sprites/platformsprite.png'

interface JumpGameProps {
  gameOverCallback: (score: number) => void;
}
export const JumpGame = ({ gameOverCallback }: JumpGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const platformRef = useRef<HTMLImageElement>(null);
  const screenPortion = 0.8;
  const width = Math.min(innerWidth, innerHeight),
    height = Math.floor(innerHeight * screenPortion);
  let ctx: any;

  //Variables for game
  var platforms: Platform[] = [],
    image: HTMLImageElement,
    characterSprites: HTMLImageElement,
    platformSprites: HTMLImageElement,    
    left: HTMLButtonElement,
    right: HTMLButtonElement,
    player: Player, 
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
    cx: number;
    cy: number;
    cwidth: number;
    cheight: number;
    moved: number;
    x: number;
    y: number;
    draw: () => void;
    constructor() {
      this.height = 5;
      this.width = width;

      //Sprite clipping
      this.cx = 0;
      this.cy = 614;
      this.cwidth = 100;
      this.cheight = 5;

      this.moved = 0;

      this.x = 0;
      this.y = height - this.height;

      this.draw = function() {
        try {
          ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
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
    draw: (deltaTime: number) => void;
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
      console.log("width:", width),
      this.y = height - 1;

      this.animationTimer = 0;
      this.spriteIndex = 0;

      //Function to draw it
      this.draw = function(deltaTime: number) {
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
      this.width = 70;
      this.height = 17;

      this.x = Math.random() * (width - this.width);
      this.y = position;

      position += (height / platformCount);

      this.flag = 0;
      this.state = 0;

      //Sprite clipping
      this.cx = 0;
      this.cy = 0;
      this.cwidth = 55;
      this.cheight = 14;

      //Function to draw it
      this.draw = function() {
        try {

          if (this.type == platformType.NORMAL) this.cy = 1;
          else if (this.type == platformType.MOVING) this.cy = 33;
          else if (this.type == platformType.BREAKABLE && this.flag === 0) this.cy = 17;
          else if (this.type == platformType.BREAKABLE && this.flag == 1) this.cy = 1000;
          else if (this.type == platformType.VANISHABLE && this.state === 0) this.cy = 90;
          else if (this.type == platformType.VANISHABLE && this.state == 1) this.cy = 1000;

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
      this.height = 30;
      this.width = 70;

      this.x = 0;
      this.y = 0;

      //Sprite clipping
      this.cx = 0;
      this.cy = 554;
      this.cwidth = 105;
      this.cheight = 60;

      this.appearance = false;

      this.draw = function() {
        try {
          if (this.appearance === true) ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
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

  function init() {
    //Variables for the game
    dir = "left";
    var jumpCount = 0;
    var previousTime = 0;

    //Choose random character sprite

    player.spriteIndex = Math.floor(Math.random() * 3);

    //Function for clearing canvas in each consecutive frame

    function paintCanvas() {
      ctx.clearRect(0, 0, width, height);
    }

    //Player related calculations and functions

    function playerCalc(deltaTime: number) {
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
      if ((player.y + player.height) > base.y && base.y < height) player.jump();

      //Gameover if it hits the bottom 
      if (base.y > height && (player.y + player.height) > height && player.isDead == false) player.isDead = true;

      //Make the player move through walls
      if (player.x > width) player.x = 0 - player.width;
      else if (player.x < 0 - player.width) player.x = width;

      //Movement of player affected by gravity
      if (player.y >= (height / 2) - (player.height / 2)) {
        player.y += player.vy * deltaTime;
      }

      //When the player reaches half height, move the platforms to create the illusion of scrolling and recreate the platforms that are out of viewport...
      else {
        platforms.forEach(function(p, i) {

          if (player.vy < 0) {
            p.y -= player.vy * deltaTime;
          }

          if (p.y > height) {
            platforms[i] = new Platform();
            platforms[i].y = p.y - height;
          }

        });

        if (base.y < height) base.y -= player.vy * deltaTime;


        if (player.vy >= 0) {
          player.y += player.vy * deltaTime;
          player.vy += gravity * deltaTime;
        }

        score++;
      }

      player.vy += gravity * deltaTime;

      //Make the player jump when it collides with platforms
      collides();

      if (player.isDead === true) gameOver(deltaTime);
    }

    //Spring algorithms

    function springCalc() {
      var s = Spring;
      var p = platforms[0];

      if (p.type == platformType.NORMAL || p.type == platformType.MOVING) {
        s.x = p.x + p.width / 2 - s.width / 2;
        s.y = p.y - p.height - 10;

        if (s.y > height / 1.1) s.state = 0;

        s.draw();
      } else {
        s.x = 0 - s.width;
        s.y = 0 - s.height;
      }
    }

    //Platform's horizontal movement (and falling) algo

    function platformCalc(deltaTime: number) {
      var subs = platform_broken_substitute;

      platforms.forEach(function(p, i) {
        if (p.type == platformType.MOVING) {
          if (p.x < 0 || p.x + p.width > width) p.vx *= -1;

          p.x += p.vx * deltaTime;
        }

        if (p.flag == 1 && subs.appearance === false && jumpCount === 0) {
          subs.x = p.x;
          subs.y = p.y;
          subs.appearance = true;

          jumpCount++;
        }

        p.draw();
      });

      if (subs.appearance === true) {
        subs.draw();
        subs.y += 480 * deltaTime;
      }

      if (subs.y > height) subs.appearance = false;
    }

    function collides() {
      //Platforms
      platforms.forEach(function(p, i) {
        if (player.vy > 0 && p.state === 0 && 
          (player.x + 15 < p.x + p.width) && 
          (player.x + player.width - 15 > p.x) && 
          (player.y + player.height > p.y) && 
          (player.y + player.height < p.y + p.height)) {

          if (p.type == platformType.BREAKABLE && p.flag === 0) {
            p.flag = 1;
            jumpCount = 0;
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

    function updateScore(deltaTime: number) {
      var scoreText = document.getElementById("score");
      if (scoreText !== null) scoreText.innerHTML = score.toString();
    }

    function gameOver(deltaTime: number) {
      platforms.forEach(function(p, i) {
        p.y -= 600 * deltaTime;
      });

      if(player.y > height/2 && flag === 0) {
        player.y -= 500 * deltaTime;
        player.vy = 0;
      } 
      else if(player.y < height / 2) flag = 1;
      else if(player.y + player.height > height) {
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

    //Function to update everything

    function update(deltaTime: number) {
      paintCanvas();
      platformCalc(deltaTime);

      springCalc();

      playerCalc(deltaTime);
      player.draw(deltaTime);

      base.draw();

      updateScore(deltaTime);
    }

    const animloop = function(currentTime: DOMHighResTimeStamp) {
      if (previousTime === 0) previousTime = currentTime;
      deltaTime = (currentTime - previousTime) / 1000;
      previousTime = currentTime;
      update(deltaTime);
      animationFrameId = requestAnimationFrame(animloop);
    };
    requestAnimationFrame(animloop);
  }

  useEffect(() => {
    const updateCtx = () => {
      if (canvasRef.current) {
        ctx = canvasRef.current.getContext('2d');
      }
    }
    addEventListener('resize', updateCtx)
    if (
      !canvasRef.current || 
      !spriteRef.current ||
      !characterRef.current ||
      !platformRef.current ||
      !leftRef.current ||
      !rightRef.current
    ) {
      console.log('reference error');
      return;
    }
    ctx = canvasRef.current.getContext('2d'); 
    image = spriteRef.current;
    characterSprites = characterRef.current;
    platformSprites= platformRef.current;
    left = leftRef.current;
    right = rightRef.current;
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
    
    document.addEventListener("visibilitychange", onVisibilityChange);
    init();
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
      removeEventListener('resize', updateCtx);
    }
  }, []);

  return (
    <div className={container}>
      <div className={scoreBoard} id="scoreBoard">
        <p id="score">0</p>
      </div>
      <canvas id="canvas" className={canvas} ref={canvasRef} width={Math.min(innerHeight, innerWidth)} height={Math.floor(innerHeight * screenPortion)}>
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
      
      {/*Preloading image ;)*/}
      <img id="sprite" className={sprite} ref={spriteRef} src={spriteImage}/>
      <img id="char1" className={sprite} ref={characterRef} src={characterURL} /> 
      <img id="charGif" className={sprite} ref={platformRef} src={platformURL} /> 

    </div>
  )
}