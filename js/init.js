/* eslint-disable */

function addGroup(object, num, spriteName) {
  // Create group objects for game objects with multiple instances
  object = game.add.group();
  object.enableBody = true;
  object.physicsBodyType = Phaser.Physics.ARCADE;
  object.createMultiple(num, spriteName);
  object.setAll('outOfBoundsKill', true);
  object.setAll('checkWorldBounds', true);

  return object;
}

function createText() {
  textHP = game.add.text(GAME_WIDTH - 150, 10, `Life: ${player.life}`, {fill: '#fff'});
  textScore = game.add.text(GAME_WIDTH - 150, 30, 'Score: 0', {fill: '#fff'});

}