/* eslint-disable */

function fireWeapon() {
  // check if timer is expired. If so, fire!
  if(game.time.now < weaponTimer || player.life <= 0) {
    return;
  }

  let weapon;
  let sideWeapons = [];

  switch (WEAPONS[currentWeapon].name) {
    case 'Laser':
      weapon = lasers.getFirstExists(false);
      pewpew.play();
      break;
    case 'Missile':
      weapon = missiles.getFirstExists(false);
      launch.play();
      break;
    case 'RailGun':
      weapon = rails.getFirstExists(false);
      sideWeapons.push(lasers.getFirstExists(false));
      sideWeapons.push(lasers.next());
      sideWeapons.push(lasers.next());
      sideWeapons.push(lasers.next());
      sideWeapons.push(lasers.next());
      pewpew.play();
      break;
  }

  weapon.reset(player.x + WEAPONS[currentWeapon].offsetX, player.y + WEAPONS[currentWeapon].offsetY);
  weapon.body.velocity.x = WEAPONS[currentWeapon].velocity;

  if (sideWeapons.length > 0) {
    sideWeapons.forEach((sideWeapon, i) => {
      sideWeapon.reset(player.x + WEAPONS[currentWeapon].offsetX, player.y + WEAPONS[currentWeapon].offsetY);
      sideWeapon.body.velocity.x = game.rnd.integerInRange(WEAPONS[0].velocity - 100, WEAPONS[0].velocity + 100);
      if (i % 2 === 0) {
        sideWeapon.body.velocity.y = game.rnd.integerInRange(-600, 600);
      } else {
        sideWeapon.body.velocity.y = game.rnd.integerInRange(-600, 600);
      }
    });
  }

  weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
}

function switchWeapon() {
  // Make sure it's not too soon to switch weapons
  if(game.time.now < switchTimer || player.life <= 0) {
    return;
  }

  currentWeapon++;
  if(currentWeapon >= WEAPONS.length) {
    currentWeapon = 0;
  }

  // console.log('switching');
  switchTimer = game.time.now + 1000;
}