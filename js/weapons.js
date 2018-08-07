function fireWeapon(){
  if(game.time.now < weaponTimer || player.life <= 0){
    return;
  }

  if(WEAPONS[currentWeapon].name === 'Double Laser'){
    var weapon1 = lasers.getFirstExists(false);
    weapon1.reset(player.x - WEAPONS[currentWeapon].offset, player.y + WEAPONS[currentWeapon].offset);
    weapon1.body.velocity.x = WEAPONS[currentWeapon].velocity;
    var weapon2 = lasers.getFirstExists(false);
    weapon2.reset(player.x - WEAPONS[currentWeapon].offset, player.y - WEAPONS[currentWeapon].offset);
    weapon2.body.velocity.x = WEAPONS[currentWeapon].velocity;
    weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
    pewpew.play();
    return;
  }

  var weapon;
  if(WEAPONS[currentWeapon].name === 'Laser'){
    weapon = lasers.getFirstExists(false);
    pewpew.play();
  }
  else if(WEAPONS[currentWeapon].name === 'Missile'){
    weapon = missiles.getFirstExists(false);
    launch.play();
  }

  weapon.reset(player.x + WEAPONS[currentWeapon].offset, player.y + WEAPONS[currentWeapon].offset);
  weapon.body.velocity.x = WEAPONS[currentWeapon].velocity;
  weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
}

function switchWeapon(){
  if(game.time.now < switchTimer){
    return;
  }

  currentWeapon++;
  if(currentWeapon >= WEAPONS.length){
    currentWeapon = 0;
  }

  switchTimer = game.time.now + SWITCH_WEAPON_TIMER;
}
