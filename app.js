
var items = {
    barbed: new Item('Barbed Arrow', 2, "Don't miss!"),
    flaming: new Item('Flaming Arrow', 3, 'Woah this is hot'),
    exploding: new Item('Exploding Arrow', 4, 'Careful!')
}

var archer1 = new Character('Harold the Archer', 'archer1')
var archer2 = new Character('Gerald the Archer', 'archer2')
var archer3 = new Character('Jim the Archer', 'archer3')


//determines archer id
function archerQ(Id) {
    if (Id == archer1.id) {
        return archer1
    } else if (Id == archer2.id) {
        return archer2
    } else return archer3
}

//build characte function
function Character(name, id) {
    this.name = name,
        this.id = id,
        this.items = [],
        this.health = 100,
        this.hits = 0,
        this.mods = [1]
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

//presents button for arrow type
function equip(type) {
    if (type == 'flame') {
        document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="flame(), hitCount()">Shoot Flaming Arrow</button>
        `
        document.getElementById('archerType').innerHTML = `
        <img src="archerFire.png" class="img-responsive firstArcher" alt="archer">
        `
    } else if (type == 'barbed') {
        document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="shoot(), hitCount()">Shoot Barbed Arrow</button>
        `
        document.getElementById('archerType').innerHTML = `
        <img src="archerBarbed.png" class="img-responsive firstArcher" alt="archer">
        `
    } else if (type == 'explode') {
        document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="explode(), hitCount()">Shoot Exploding Arrow</button>
        `
        document.getElementById('archerType').innerHTML = `
        <img src="archerBomb.png" class="img-responsive firstArcher" alt="archer">
        `
    }
}

//completes attack function
function basic() {
    archer2.hits++
    archer2.health -= .5
    if (archer2.health < 0) {
        archer2.health = 0
    }
    compAttackBasic('easy')
    return update()
}

//completes attack function
function shoot() {
    archer2.hits++
    archer2.health -= .5 * (archer1.mods[archer1.mods.length - 1])
    if (archer2.health < 0) {
        archer2.health = 0
    }
    compAttackBarbed('easy')
    return update()
}

//completes attack function
function flame() {
    archer2.hits++
    archer2.health -= 1 * (archer1.mods[archer1.mods.length - 1])
    if (archer2.health < 0) {
        archer2.health = 0
    }
    compAttackFlame('easy')
    return update()
}

//completes attack function
function explode() {
    archer2.hits++
    archer2.health -= 1.5 * (archer1.mods[archer1.mods.length - 1])
    if (archer2.health < 0) {
        archer2.health = 0
    }
    compAttackExploding('easy')
    return update()
}

//adds to archer hitcount
function hitCount(archer) {
    let archy = archerQ(archer)
    archy.hits++
    return update()
}

//draw function
function update() {
    document.getElementById('hits').innerHTML = archer2.hits
    document.getElementById('compArcherHealth').innerHTML = `<div class="progress">
                                                                    <div class="progress-bar" role="progressbar" style="width: ${archer2.health}%">
                                                                    </div>
                                                                 </div>`

    document.getElementById('userHits').innerHTML = archer1.hits
    document.getElementById('userArcherHealth').innerHTML = `<div class="progress">
                                                                    <div class="progress-bar" role="progressbar" style="width: ${archer1.health}%">
                                                                    </div>
                                                                 </div>`

    if (archer2.health <= 0) {
        document.getElementById('gameEnd').innerHTML = `
        <h1>${archer2.name} has been defeated!</h1>
        <button type="button" class="btn btn-warning" onclick="reset()">Reset</button>
        `
    } else if (archer1.health <= 0) {
        return document.getElementById('gameEnd').innerHTML = `
        <h1>${archer1.name} has been defeated with ${archer1.hits} hits!</h1>
        <button type="button" class="btn btn-warning" onclick="reset()">Reset</button>`
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
    document.getElementById('gameEnd').innerHTML = ``
    return update()
}

//below are the comp specific functions

function compAttackBasic(archer) {
    if (archer == 'easy') {
        var ouch = Math.floor(Math.random() * 3);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    } if (archer == 'medium') {
        var ouch = (Math.floor(Math.random() * 1) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    }

    update()
}

function compAttackBarbed(archer) {
    if (archer == 'easy') {
        var ouch = (Math.floor(Math.random() * 5) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    } if (archer == 'medium') {
        var ouch = (Math.floor(Math.random() * 5) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    }
    update()
}

function compAttackFlame(archer) {
    if (archer == 'easy') {
        var ouch = (Math.floor(Math.random() * 5) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    } if (archer == 'medium') {
        var ouch = (Math.floor(Math.random() * 8) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    }
    update()
}

function compAttackExploding(archer) {
    if (archer == 'easy') {
        var ouch = (Math.floor(Math.random() * 11) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    } if (archer == 'medium') {
        var ouch = (Math.floor(Math.random() * 12) + 1);
        archer1.health -= ouch;
        if (archer1.health <= 0) {
            archer1.health = 0
        }
        archer1.hits++
    }
    update()
}

update()