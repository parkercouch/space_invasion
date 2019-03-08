/* eslint-disable */

// Constants
const GAME_WIDTH = 1000;
const GAME_HEIGHT = 750;
const PLAYER_LIFE = 100;
const ENEMY_LIFE = 500;
const PLAYER_START = {
  x: 100,
  y: 200
};
const VELOCITY_INCREMENT = 15;
const SCORE_SLOTS = 5;
const MAX_VELOCITY = 300;
const BG_SCROLL_SPEED = -30;
const WEAPONS = [
  {
    name: 'Laser',
    velocity: 450,
    timer: 100,
    damage: 5,
    offsetX: 50,
    offsetY: 20,
  },
  {
    name: 'Missile',
    velocity: 275,
    timer: 650,
    damage: 100,
    offsetX: 50,
    offsetY: 25,
  },
  {
    name: 'RailGun',
    velocity: 7500,
    timer: 200,
    damage: 150,
    offsetX: 50,
    offsetY: 25,
  },
];

// Global Variables
// Assets & Inputs
let boom;
let cursors;
let music;
let nukeboom;
let pewpew;
let launch;
let thruster_sound;
let smallExplosions;
let largeExplosions;
let textHP;
let textScore;

// Game Objects
let enemies;
let lasers;
let missiles;
let player;
let rails;

let thruster_up;
let thruster_down;
let thruster_left;
let thruster_right;

// Timers & Trackers
let currentWeapon = 2;
let switchTimer = 0;
let weaponTimer = 0;



