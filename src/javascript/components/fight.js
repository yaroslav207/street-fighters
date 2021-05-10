import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const firstPlayer = new Player({...firstFighter, criticalHitCombination: controls.PlayerOneCriticalHitCombination})
    const secondPlayer = new Player({...secondFighter, criticalHitCombination: controls.PlayerTwoCriticalHitCombination})

    function selectDamage(criticalDamage = false) {
      return function (attacker, defender) {
        const damage = criticalDamage ? attacker.attack * 2 : getDamage(attacker, defender);
        if (attacker._id === firstPlayer._id) {

          secondPlayer.takeDamage(damage)
        } else {
          firstPlayer.takeDamage(damage)
        }
        changeHealthBar(firstPlayer.percentHealth, secondPlayer.percentHealth)
        checkHealth()
      }
    }

    function checkHealth() {
      if (firstPlayer.currentHealth === 0) {
        resolve(secondPlayer);
      }
      if (secondPlayer.currentHealth === 0) {
        resolve(firstPlayer);
      }
    }

    
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
