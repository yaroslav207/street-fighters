import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
}

export function getHitPower(fighter) {
  // return hit power
}

export function getBlockPower(fighter) {
  // return block power
}

class Player {
  constructor(playerInfo) {
    this._id = playerInfo._id;
    this.name = playerInfo.name;
    this.attack = playerInfo.attack;
    this.block = false;
    this.source = playerInfo.source;
    this.criticalHit = true;
    this.criticalHitKeys = playerInfo.criticalHitCombination.reduce((obj, item) => (obj[item] = false, obj), {});
    this.currentHealth = playerInfo.health;
    this.defense = playerInfo.defense;
    this.health = playerInfo.health;
  }

  get percentHealth() {
    return (this.currentHealth / this.health) * 100
  }

  takeDamage(damage) {
    if (this.currentHealth <= damage) {
      this.currentHealth = 0
    } else {
      this.currentHealth = this.currentHealth - damage
    }
  }

  coolDownCriticalHit() {
    this.criticalHit = false;
    setTimeout(() => {
      this.criticalHit = true
    }, 10000);
  }
}
