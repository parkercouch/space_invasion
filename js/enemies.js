// function spawnEnemy(){
//   var enemy = enemies.getFirstExists(false);
//   enemy.reset(GAME_WIDTH - 10, game.rnd.integerInRange(50, GAME_HEIGHT - 50));
//   enemy.body.velocity.x = -250;
//   enemy.life = ENEMY_LIFE;
// }
function launchRandomlySpacedEnemies(thisObj) {
    var numberOfEnemiesToCreate = Math.floor(Math.random() * (level+1));

    for(var i = 0; i < numberOfEnemiesToCreate; i++){
      var enemy = enemies.create(GAME_WIDTH, Math.floor(Math.random() * GAME_HEIGHT), 'enemy');
      enemy.body.velocity.x = Math.floor(Math.random() * ENEMY_SPEED_MAX - ENEMY_SPEED_MIN) + ENEMY_SPEED_MIN;
      enemy.body.velocity.y = game.rnd.integerInRange(-200, 200);
      enemy.body.drag.y = 30;
      enemy.life = ENEMY_LIFE;
    }
}

function hurtPlayer(player, enemy){
  // Sound effects/visual effects
  boom.play();
  var explosion = explosions.getFirstExists(false);
  explosion.reset(player.body.x, player.body.y);
  explosion.play('smallboom', 30, false, true);

  // Logic
  enemy.kill();
  player.life -= 25;
  hpText.text = 'Life: ' + player.life.toString();

  if(player.life <= 0){
    player.kill();
    gameOver();
  }
  else if(player.life <= 50){
    player.tint = '0xff0000';
  }
}

function weaponEnemy(weapon, enemy){
  // Game logic
  enemy.life -= WEAPONS[currentWeapon].damage;
  if(enemy.life <= 0){
    enemy.kill();
    addScore(10);
  }
  weapon.kill();

  // Play visual and sound effects
  if(WEAPONS[currentWeapon].type === 'large' || enemy.life === 0){
    nukeboom.play();
    var nuke = nukes.getFirstExists(false);
    nuke.reset(enemy.body.x, enemy.body.y);
    nuke.play('boom', 30, false, true);
    nukeboom.play();
  }
  else{
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x, enemy.body.y);
    explosion.play('smallboom', 30, false, true);
    boom.play();
  }
}
