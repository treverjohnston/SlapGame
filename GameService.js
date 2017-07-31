function GameService() {
    //private

    var items = {
        barbed: new Item('Barbed Arrow', 2, "Don't miss!"),
        flaming: new Item('Flaming Arrow', 3, 'Woah this is hot'),
        exploding: new Item('Exploding Arrow', 4, 'Careful!')
    }

    var archer1 = new Character('Harold the Archer', 'archer1')
    var archer2 = new Character('Gerald the Archer', 'archer2')
    var archer3 = new Character('Jim the Archer', 'archer3')


    //build character function
    function Character(name, id) {
        this.name = name,
            this.id = id,
            this.items = [],
            this.health = 100,
            this.hits = 0,
            this.mods = [1]
        this.attacks = {
            "basic": 'basic',
            "barbed": 'barbed',
            "flame": 'flame',
            "explode": 'explode'
        }
    }

    //build item function
    function Item(name, modifier, description) {
        this.name = name,
            this.modifier = modifier,
            this.description = description
    }
    //adds up sum of all modifiers on items equipped
    function addMods() {
        var totalMod = 0
        for (var i = 0; i < archer1.items.length; i++) {
            var mod = archer1.items[i];
            totalMod += mod.modifier
        }
        return archer1.mods.push(totalMod)
    }

    //adds to archer hitcount
    function hitCount() {
        archer1.hits++
        archer2.hits++
    }

    //resets game
    function reset() {
        archer1.health = 100
        archer1.hits = 0
        archer2.health = 100
        archer2.hits = 0
        document.getElementById('archerType').innerHTML = `
        <img src="archer.png" class="img-responsive firstArcher" alt="archer">
        `
        document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="app.controllers.gameController.attack('basic'), app.controllers.gameController.hitCounter()">Shoot Basic Arrow</button>

        `
        document.getElementById('gameEnd').innerHTML = ``
    }

    //attaches arrow type to archer object
    function barbedArrow() {
        archer1.items.shift()
        archer1.items.push(items.barbed)
        return addMods()
    }

    //attaches arrow type to archer object
    function flamingArrow() {
        archer1.items.shift()
        archer1.items.push(items.flaming)
        return addMods()
    }

    //attaches arrow type to archer object
    function explodingArrow() {
        archer1.items.shift()
        archer1.items.push(items.exploding)
        return addMods()
    }
    //completes attack function
    function basic() {
        archer2.health -= .5
        if (archer2.health < 0) {
            archer2.health = 0
        }
        compAttackBasic()
    }

    //completes attack function
    function shoot() {
        if (archer2.hits % 10 == 0) {
            archer2.health -= 1 * (archer1.mods[archer1.mods.length - 1])
            if (archer2.health < 0) {
                archer2.health = 0
            }
        }
        archer2.health -= .5 * (archer1.mods[archer1.mods.length - 1])
        if (archer2.health < 0) {
            archer2.health = 0
        }
        compAttackBarbed()
    }

    //completes attack function
    function flame() {
        if (archer2.hits % 10 == 0) {
            archer2.health -= 2 * (archer1.mods[archer1.mods.length - 1])
            if (archer2.health < 0) {
                archer2.health = 0
            }
        }
        archer2.health -= 1 * (archer1.mods[archer1.mods.length - 1])
        if (archer2.health < 0) {
            archer2.health = 0
        }
        compAttackFlame()
    }

    //completes attack function
    function explode() {
        if (archer2.hits % 10 == 0) {
            archer2.health -= 3 * (archer1.mods[archer1.mods.length - 1])
            if (archer2.health < 0) {
                archer2.health = 0
            }
        }
        archer2.health -= 1.5 * (archer1.mods[archer1.mods.length - 1])
        if (archer2.health < 0) {
            archer2.health = 0
        }
        compAttackExploding()
    }
    //below are the comp specific functions
    function compAttackBasic() {
        if (archer2.health >= 50) {
            var ouch = Math.floor(Math.random() * 2);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        } if (archer2.health >= 0 && archer2.health < 50) {
            var ouch = (Math.floor(Math.random() * 5) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }
        }
    }

    function compAttackBarbed() {
        if (archer2.health >= 50) {
            var ouch = (Math.floor(Math.random() * 2) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        } if (archer2.health >= 0 && archer2.health < 50) {
            var ouch = (Math.floor(Math.random() * 10) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }
        }
    }

    function compAttackFlame() {
        if (archer2.health >= 50) {
            var ouch = (Math.floor(Math.random() * 5) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        } if (archer2.health >= 0 && archer2.health < 50) {
            var ouch = (Math.floor(Math.random() * 15) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        }
    }

    function compAttackExploding() {
        if (archer2.health >= 50) {
            var ouch = (Math.floor(Math.random() * 11) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        } if (archer2.health >= 0 && archer2.health < 50) {
            var ouch = (Math.floor(Math.random() * 18) + 1);
            archer1.health -= ouch;
            if (archer1.health <= 0) {
                archer1.health = 0
            }

        }
    }
    function archerId(Id) {
        if (Id == archer1.id) {
            return archer1
        }
        if (Id == archer2.id) {
            return archer2
        }
    }
    //public

    //determines archer id
    this.getArcherOne = function getArcherOne() {
        var archerOneCopy = Object.assign({}, archer1)
        return archerOneCopy
    }

    this.getArcherTwo = function getArcherTwo() {
        var archerTwoCopy = Object.assign({}, archer2)
        return archerTwoCopy
    }

    this.getItems = function getItems() {
        var getArcherItems = Object.assign({}, archer1.items)
    }

    this.getArrow = function getArrow(type) {
        if (type == 'barbed') {
            return barbedArrow()
        }
        if (type == 'flame') {
            return flamingArrow()
        }
        if (type == 'explode') {
            return explodingArrow()
        }
    }

    this.getHits = function getHits() {
        hitCount()
    }

    this.getAttack = function getAttack(type) {
        if (type == 'basic') {
            return basic()
        }
        if (type == 'barbed') {
            return shoot()
        }
        if (type == 'flame') {
            return flame()
        }
        if (type == 'explode') {
            return explode()
        }
    }

    this.getReset = function getReset() {
        return reset()
    }
}