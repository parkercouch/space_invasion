var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init(){
  displayHighScores();
}

function preload(){
  // Initialize arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Load images for later use
  game.load.image('bg', './assets/img/cool-space-background.jpg');
  game.load.image('player', './assets/img/ship.png');
  game.load.image('laser', './assets/img/beam.png');
  game.load.image('missile', './assets/img/missile.png');
  game.load.image('enemy', './assets/img/enemy.png');

  // Load animations
  game.load.spritesheet('smallboom', './assets/img/explosion.png', 64, 64);
  game.load.spritesheet('boom', './assets/img/explode.png', 128, 128);

  // Load audio files for later use
  game.load.audio('music', './assets/audio/Shadelike.mp3');
  game.load.audio('pewpew', ['./assets/audio/laser.ogg', './assets/audio/laser.mp3']);
  game.load.audio('launch', './assets/audio/Missile.mp3');
  game.load.audio('boom', ['./assets/audio/explosion.ogg', './assets/audio/explosion.mp3']);
  game.load.audio('nukeboom', ['./assets/audio/ExplosionNuke.mp3']);
}

function create(){
  // Create the background and make it scroll
  var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
  background.autoScroll(-30, 0);

  // Set up sounds
  music = game.add.audio('music');
  pewpew = game.add.audio('pewpew', 0.1);
  launch = game.add.audio('launch', 0.5);
  boom = game.add.audio('boom', 0.3);
  nukeboom = game.add.audio('nukeboom', 0.6);
  music.play();

  // Create the player, place it in the world, and give it life
  player = game.add.sprite(100, 200, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.score = 0;
  player.life = STARTING_LIFE;

  // Create group objects for game objects like weapons, enemies, etc.
  lasers = addGroup(lasers, 20, 'laser', -1);
  missiles = addGroup(missiles, 10, 'missile', -1);
  enemies = addGroup(enemies, 100, 'enemy', 1);
  explosions = addGroup(explosions, 20, 'smallboom', 0.5);
  nukes = addGroup(nukes, 10, 'boom', 0.5);

  // Set properties for individual enemies
  enemies.forEach(function(enemy){
    enemy.life = ENEMY_LIFE;
  });

  // Add animations to each explosion type
  explosions.forEach(function(explosion){
    explosion.animations.add('smallboom');
  });

  nukes.forEach(function(nuke){
    nuke.animations.add('boom');
  });

  // Set initial game state
  initializeGame();

  // Create enemies in a loop
  // game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);
}

function update(){
  // Initial velocity is 0
  player.body.velocity.set(0);

  // Handle cursor/movement keys
  if(cursors.left.isDown){
    player.body.velocity.x = -DEFAULT_SPEED;
  }
  else if(cursors.right.isDown){
    player.body.velocity.x = DEFAULT_SPEED;
  }

  if(cursors.up.isDown){
    player.body.velocity.y = -DEFAULT_SPEED;
  }
  else if(cursors.down.isDown){
    player.body.velocity.y = DEFAULT_SPEED;
  }

  // Hanlde weapons buttons
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    fireWeapon();
  }
  if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
    switchWeapon();
  }

  // Define levels
  if(level * LEVEL_INCREMENT < player.score){
    level++;
    showLevelText();
    setTimeout(removeLevelText, 1000);
  }

  // Launch Enemies
  if(player.life > 0 && nextEnemyFire <= game.time.totalElapsedSeconds()){
    launchRandomlySpacedEnemies();
    nextEnemyFire += Math.floor(Math.random() * 0.5) + 0.5;
  }

  // Define my desired collisions
  game.physics.arcade.overlap(player, enemies, hurtPlayer);
  game.physics.arcade.overlap(lasers, enemies, weaponEnemy);
  game.physics.arcade.overlap(missiles, enemies, weaponEnemy);
}












