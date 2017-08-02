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
        this.damage = -1,
            this.winCount = 0
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

    //updates winCount
    function winCount() {
        if (archer2.health <= 0 && archer1.health > 0) {
            archer1.winCount++
        }
        if (archer1.health <= 0 && archer2.health > 0) {
            archer2.winCount++
        }
    }
    //adds to archer hitcount
    function hitCount() {
        if (archer1.health > 0 && archer2.health > 0) {
            if (archer1.damage > 0) {
                archer1.hits++
            }
            if (archer2.damage > 0) {
                archer2.hits++
            }
        }
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
        <button type="button" class="btn btn-default" onclick="app.controllers.gameController.getAttack('basic'), app.controllers.gameController.hitCounter()">Shoot Basic Arrow</button>

        `
        document.getElementById('items').innerHTML = `
        <button type="button" class="btn btn-default equip col-xs-3 well" onclick="app.controllers.gameController.attackType('barbed')">Equip Barb</button>
        <button type="button" class="btn btn-default equip col-xs-3 well" onclick="app.controllers.gameController.attackType('flame')">Equip Flame</button>
        <button type="button" class="btn btn-default equip col-xs-3 well" onclick="app.controllers.gameController.attackType('explode')">Equip Bomb</button>
        `
        document.getElementById('gameEnd').innerHTML = ``
    }

    //attaches arrow type to archer object
    function arrow(type) {
        if (type == 'barbed') {
            archer1.items.shift()
            archer1.items.push(items.barbed)
            return addMods()
        }
        if (type == 'flame') {
            archer1.items.shift()
            archer1.items.push(items.flaming)
            return addMods()
        }
        if (type == 'explode') {
            archer1.items.shift()
            archer1.items.push(items.exploding)
            return addMods()
        }
    }
    //completes attack function
    function attack(type) {
        let damage = (Math.floor(Math.random() * 3)) * (archer1.mods[archer1.mods.length - 1])
        if (type == 'basic') {
            archer2.health -= .5
            if (archer2.health < 0) {
                archer2.health = 0
            }
        }
        if (type == 'barbed') {
            if (archer1.health > 0) {
                archer2.health -= damage
                if (archer2.health < 0) {
                    archer2.health = 0
                }
            }
        }
        if (type == 'flame') {
            if (archer1.health > 0) {
                archer2.health -= damage
                if (archer2.health < 0) {
                    archer2.health = 0
                }
            }
        }
        if (type == 'explode') {
            if (archer1.health > 0) {
                archer2.health -= damage
                if (archer2.health < 0) {
                    archer2.health = 0
                }
            }
        }
        compAttack(type)
        winCount()
        archer2.damage = damage
    }
    //below are the comp specific functions
    function compAttack(type) {
        if (type == 'basic') {
            if (archer2.health > 0) {
                var ouch = Math.floor(Math.random() * .75);
                archer1.health -= ouch;
                archer1.damage = ouch;
                if (archer1.health <= 0) {
                    archer1.health = 0
                }
            }
        }
        if (type == 'barbed') {
            if (archer2.health > 0) {
                var ouch = (Math.floor(Math.random() * 3) + 0);
                archer1.health -= ouch;
                archer1.damage = ouch;
                if (archer1.health <= 0) {
                    archer1.health = 0
                }
            }
        }
        if (type == 'flame') {
            if (archer2.health > 0) {
                var ouch = (Math.floor(Math.random() * 6) + 0);
                archer1.health -= ouch;
                archer1.damage = ouch;
                if (archer1.health <= 0) {
                    archer1.health = 0
                }
            }
        }
        if (type == 'explode') {
            if (archer2.health > 0) {
                var ouch = (Math.floor(Math.random() * 9) + 0);
                archer1.health -= ouch;
                archer1.damage = ouch;
                if (archer1.health <= 0) {
                    archer1.health = 0
                }
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

    //creates archer 1 clone
    this.getArcherOne = function getArcherOne() {
        var archerOneCopy = Object.assign({}, archer1)
        return archerOneCopy
    }
    //creates archer 2 clone
    this.getArcherTwo = function getArcherTwo() {
        var archerTwoCopy = Object.assign({}, archer2)
        return archerTwoCopy
    }
    //assigns items to archer 1
    this.getItems = function getItems() {
        var getArcherItems = Object.assign({}, archer1.items)
    }

    //equips arrow mods
    this.getArrow = function getArrow(type) {
        arrow(type)
    }

    //updates hit count
    this.getHits = function () {
        hitCount()
    }

    //determines and completes attack type
    this.getAttack = function getAttack(type) {
        attack(type)
    }

    //resets game
    this.getReset = function getReset() {
        return reset()
    }
}