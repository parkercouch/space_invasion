// Game-wide constants
var GAME_HEIGHT = 400;
var GAME_WIDTH = 700;
var SCORE_SLOTS = 5;
var DEFAULT_SPEED = 300;
var LEVEL_INCREMENT = 150;
var STARTING_LIFE = 150;
var ENEMY_LIFE = 150;
var ENEMY_SPEED_MIN = -250;
var ENEMY_SPEED_MAX = -400;
var SWITCH_WEAPON_TIMER = 1000;
var WEAPONS = [
  {name: 'Laser', velocity: 450, timer: 140, offset: 0, damage: 25, type: 'small'},
  {name: 'Missile', velocity: 275, timer: 600, offset: 10, damage: 100, type: 'large'},
  {name: 'Double Laser', velocity: 450, timer: 190, offset: 20, damage: 25, type: 'small'}
];

// Global Variables
var player, enemies; // characters
var lasers, missiles; // weapons

// Sound, Visual Effects, and Text
var music, pewpew, boom, nukeboom; // sound effects
var explosions, nukes; // visual effects
var scoreText, hpText, levelText; // text

// Key Controllers
var cursors; // arrow keys

// Timers and trackers
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;
var nextEnemyFire = 3;
var level = 1;
