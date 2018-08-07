function addGroup(object, number, spriteName, anchor){
  object = game.add.group();
  object.enableBody = true;
  object.physicsBodyType = Phaser.Physics.ARCADE;
  object.createMultiple(number, spriteName);
  object.setAll('outOfBoundsKill', true);
  object.setAll('checkWorldBounds', true);
  object.setAll('anchor.x', anchor);
  object.setAll('anchor.y', anchor);
  return object;
}

function initializeGame(){
  // Add keyboard controls
  cursors = game.input.keyboard.createCursorKeys(); // arrow keys
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

  // Add Score and HP Text to the screen
  hpText = game.add.text(GAME_WIDTH - 150, 20, 'Life: 0', {fill: '#fff'});
  scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 40, 'Score: 0', {fill: '#fff'});
}
