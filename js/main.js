/* eslint-disable */

const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
  displayHighScores();
}

function preload() {
  // Initialize arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Load some images!
  game.load.image('bg', './assets/img/cool-space-background.jpg');
  game.load.image('player', './assets/img/ship.png');
  game.load.image('laser', './assets/img/beam.png');
  game.load.image('missile', './assets/img/missile.png');
  game.load.image('railgun', './assets/img/missile.png');
  game.load.image('enemy', './assets/img/enemy.png');
  game.load.image('thruster-static-up', './assets/img/thruster_static_up.png');
  game.load.image('thruster-static-down', './assets/img/thruster_static_down.png');
  game.load.image('thruster-static-left', './assets/img/thruster_static_left.png');
  game.load.image('thruster-static-right', './assets/img/thruster_static_right.png');

  // Load sounds / audio
  game.load.audio('music', './assets/audio/Shadelike.mp3');
  game.load.audio('pewpew', ['./assets/audio/laser.ogg', './assets/audio/laser.mp3']);
  game.load.audio('launch', './assets/audio/Missile.mp3');
  game.load.audio('boom', ['./assets/audio/explosion.ogg', './assets/audio/explosion.mp3']);
  game.load.audio('nukeboom', './assets/audio/ExplosionNuke.mp3');
  game.load.audio('thrusters', './assets/audio/thrusters.mp3');
  

  // Load animations
  game.load.spritesheet('small-explosion', './assets/img/explosion.png', 64, 64);
  game.load.spritesheet('large-explosion', './assets/img/explode.png', 128, 128);

}

function create() {
  // Create bg and make it scroll
  const background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
  background.autoScroll(BG_SCROLL_SPEED, 0);

  // Music and Sounds
  music = game.add.audio('music', 0.25, true);
  setTimeout(function(){ music.play(); }, 1000);
  pewpew = game.add.audio('pewpew', 0.2);
  launch = game.add.audio('launch', 0.8);
  boom = game.add.audio('boom', 0.4);
  nukeboom = game.add.audio('nukeboom', 0.4);

  // Making thruster sounds!
  thruster_sound_x = new Phaser.Sound(game, 'thrusters', 0.8, false);
  thruster_sound_y = new Phaser.Sound(game, 'thrusters', 0.8, false);


  // Create player, set it in world, set properties
  player = game.add.sprite(PLAYER_START.x, PLAYER_START.y, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true; // Don't fall off the edge!
  player.body.setSize(25,25,25,25);
  player.body.immovable = true;
  
  // New properties defined
  player.score = 0;
  player.life = PLAYER_LIFE;

  // Create group objects for game objects with multiple instances
  enemies = addGroup(enemies, 200, 'enemy');
  lasers = addGroup(lasers, 200, 'laser');
  missiles = addGroup(missiles, 20, 'missile');
  rails = addGroup(rails, 20, 'railgun');
  smallExplosions = addGroup(smallExplosions, 200, 'small-explosion');
  largeExplosions = addGroup(largeExplosions, 200, 'large-explosion');

  // Add animations
  largeExplosions.forEach(function(l) {
    l.animations.add('large-explosion');
  })
  smallExplosions.forEach(function(s) {
    s.animations.add('small-explosion');
  })


  // Define user inputs
  cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

  // Write starting text to screen
  createText();

  game.time.events.loop(Phaser.Timer.SECOND / 25, spawnEnemy);

}

function update() {
  // handle cursor/movement keys
  if(cursors.left.isDown) {
    // HOW DO I ADD A SPRITE ATTACHED TO SHIP????
    // game.add.sprite(PLAYER_START.x, PLAYER_START.y, 'thruster-static-left');
    // game.world.create(player.x, player.y, 'thruster-static-left');

    // thruster_left = game.add.sprite(PLAYER_START.x, PLAYER_START.y, 'thruster-static-left') 
    // thruster_left = game.world
    // game.world.getChildAt[0].alignTo(player, Phaser.RIGHT_CENTER);
    
    if (player.body.velocity.x >= -MAX_VELOCITY) {
      player.body.velocity.x -= VELOCITY_INCREMENT;
    }
    if (!thruster_sound_x.isPlaying) {
      thruster_sound_x.play();
    }
  } else if (cursors.right.isDown) {
    if (player.body.velocity.x <= MAX_VELOCITY) {
      player.body.velocity.x += VELOCITY_INCREMENT;
    }
    if (!thruster_sound_x.isPlaying) {
      thruster_sound_x.play();
    }
  }

  if(cursors.up.isDown) {
    if (player.body.velocity.y >= -MAX_VELOCITY) {
      player.body.velocity.y -= VELOCITY_INCREMENT;
    }
    if (!thruster_sound_y.isPlaying) {
      thruster_sound_y.play();
    }

  } else if (cursors.down.isDown) {
    if (player.body.velocity.y <= MAX_VELOCITY) {
      player.body.velocity.y += VELOCITY_INCREMENT;
    }
    if (!thruster_sound_y.isPlaying) {
      thruster_sound_y.play();
    }
  }

  if(cursors.left.isUp && cursors.right.isUp) {
    thruster_sound_x.stop();
  }
  if(cursors.up.isUp && cursors.down.isUp) {
    thruster_sound_y.stop();
  }



  // Handle weapons buttons
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    // Fire weapon
    fireWeapon();
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
    // Fire weapon
    switchWeapon();
  }

  // Define the collisions
  game.physics.arcade.overlap(player, enemies, damagePlayer);
  game.physics.arcade.overlap(lasers, enemies, damageEnemy);
  game.physics.arcade.overlap(missiles, enemies, damageEnemy);
  game.physics.arcade.overlap(rails, enemies, damageEnemy);


}
