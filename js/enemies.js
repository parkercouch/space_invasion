/* eslint-disable */

function spawnEnemy() {
  // console.log('spawn enemy');
  const enemy = enemies.getFirstExists(false);
  enemy.reset(GAME_WIDTH - 1, game.rnd.integerInRange(10, GAME_HEIGHT - 10));
  enemy.body.velocity.x = game.rnd.integerInRange(-800, -100);
  enemy.body.velocity.y = game.rnd.integerInRange(-200, 200);
  enemy.body.drag.y = game.rnd.integerInRange(20, 100);
  
  //  This adjusts the collision body size to be a 100x50 box.
  //  50, 25 is the X and Y offset of the newly sized box.

  // sprite1.body.setSize(100, 50, 50, 25);
  // sprite1.body.immovable = true;
  
  // enemy.body.setSize(100, 50, 50, 25);
  enemy.life = ENEMY_LIFE;
}

function damagePlayer(p, enemy) {
  // Sound / Visual effects
  explode('small', player.body);
  explode('large', enemy.body);

  // Logic
  enemy.kill();
  player.life -= 25;
  textHP.text = `Life: ${player.life}`;

  if(player.life <= 0) {
    player.kill();
    explode('large', player.body);
    // Game over
    gameOver();
  } else if (player.life <= 40) {
    player.tint = '0xff0000';

  }

}

function damageEnemy(weapon, enemy) {
  // Sounds / Visuals
  switch (weapon.key) {
    case 'laser':
      explode('small', enemy.body);
      weapon.kill();
      break;
    case 'missile':
      explode('large', enemy.body);
      weapon.kill();
      break;
    case 'railgun':
      explode('large', enemy.body);
      // weapon.kill();
      break;
  }

  enemy.life -= WEAPONS[currentWeapon].damage;
  if(enemy.life <= 0) {
    enemy.kill();
    // large explosion
    addScore(10);


    // TODO: Add score
  } else {
    // small explosion
  }
}


function explode(size, body) {
  let explosion;
  switch (size) {
    case 'large':
      explosion = largeExplosions.getFirstExists(false);
      explosion.reset(body.x, body.y);
      explosion.play('large-explosion', 30, false, true);
      nukeboom.play();
      break;
    case 'small':
      explosion = smallExplosions.getFirstExists(false);
      explosion.reset(body.x, body.y);
      explosion.play('small-explosion', 30, false, true);
      boom.play();
      break;
  }

}