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

    document.body.addEventListener("keydown", (e) => {
      switch (e.code) {
        case controls.PlayerOneBlock: {
          firstPlayer.block = true;
          break;
        }
        case controls.PlayerTwoBlock: {
          secondPlayer.block = true;
          break;
        }
        default: {
          if (Object.keys(firstPlayer.criticalHitKeys).includes(e.code)) {
            firstPlayer.criticalHitKeys[e.code] = true;
            if (!(Object.values(firstPlayer.criticalHitKeys).includes(false)) && firstPlayer.criticalHit) {
              selectDamage(true)(firstPlayer, secondPlayer)
              firstPlayer.coolDownCriticalHit()
            }
          }
          if (Object.keys(secondPlayer.criticalHitKeys).includes(e.code)) {
            secondPlayer.criticalHitKeys[e.code] = true;
            if (!(Object.values(secondPlayer.criticalHitKeys).includes(false)) && secondPlayer.criticalHit) {
              selectDamage(true)(secondPlayer, firstPlayer)
              secondPlayer.coolDownCriticalHit()
            }
            break;
          }
        }
      }
    })
    document.body.addEventListener("keyup", (e) => {
      switch (e.code) {
        case controls.PlayerOneAttack: {
          selectDamage()(firstPlayer, secondPlayer);
          break;
        }
        case controls.PlayerTwoAttack: {
          selectDamage()(secondPlayer, firstPlayer);
          break;
        }
        case controls.PlayerOneBlock: {
          firstPlayer.block = false
          break;
        }
        case controls.PlayerTwoBlock: {
          secondPlayer.block = false
          break;
        }
        default: {
          if ([...Object.keys(firstPlayer.criticalHitKeys)].includes(e.code)) {
            firstPlayer.criticalHitKeys[e.code] = false;
          }
          if ([...Object.keys(secondPlayer.criticalHitKeys)].includes(e.code)) {
            secondPlayer.criticalHitKeys[e.code] = false;
          }
        }
      }
    })
  });
}

export function getDamage(attacker, defender) {
  const attack = getHitPower(attacker)
  const defend = defender.block ? getBlockPower(defender) : 0
  if (attacker.block || attack < defend) {
    return 0
  }
  return attack - defend
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
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
