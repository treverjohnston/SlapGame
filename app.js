
var items = {
    barbed: new Item('Barbed Arrow', 2, "Don't miss!"),
    flaming: new Item('Flaming Arrow', 3, 'Woah this is hot'),
    exploding: new Item('Exploding Arrow', 4, 'Careful!')
}

var archer1 = new Character('Harold the Archer')

function equip(type){
    if (type == 'flame'){
        document.getElementById('flame').innerHTML = `
        <button type="button" class="btn btn-default" onclick="attack('flame'), hitCount()">Flaming Arrow</button>
        `
        return barbedArrow()
    } else if (type == 'barbed'){
        document.getElementById('barbed').innerHTML = `
        <button type="button" class="btn btn-default" onclick="attack('barbed'), hitCount()">Barbed Arrow</button>
        `
    } else if (type == 'explode'){
        document.getElementById('explode').innerHTML = `
        <button type="button" class="btn btn-default" onclick="attack('explode'), hitCount()">Exploding Arrow</button>
        `
    }
}

function barbedArrow(){
    archer1.items.splice(0,1, items.barbed)
    return addMods()
}

function flamingArrow(){
    archer1.items.splice(0,1, items.flaming)
    return addMods()
}

function explodingArrow(){
    archer1.items.splice(0,1, items.exploding)
    return addMods()
}

function addMods(){
    var totalMod = 0
    for (var i = 0; i < archer1.items.length; i++) {
        var mod = archer1.items[i];
        totalMod += mod.modifier
    }
   return archer1.mods.push(totalMod)
}

function Item(name, modifier, description,){
    this.name = name,
    this.modifier = modifier,
    this.description = description
}

function Character(name){
    this.name = name,
    this.items = []
    this.health = 100,
    this.hits = 0
    this.mods = [1]
}

function attack(type){
    if (type == 'barbed'){
        return shoot()
    } else if (type == 'flame'){
        return flame()
    } else if (type == 'explode'){
        return explode()
    } else return
}

function shoot(){
    archer1.health -= 1 * (1+ archer1.mods[archer1.mods.length-1])
    if (archer1.health <= 0){
        archer1.health = 0
    } 
    return update()
}

function flame(){
    archer1.health -= 3 * (1+ archer1.mods[archer1.mods.length-1])
    if (archer1.health <= 0){
        archer1.health = 0
    } 
    return update()
}

function explode(){
    archer1.health -= 5 * (1+ archer1.mods[archer1.mods.length-1])
    if (archer1.health <= 0){
        archer1.health = 0
    } 
    return update()
}

function hitCount(){
    archer1.hits++
    return update()
}

function update(){
    document.getElementById('hits').innerHTML = archer1.hits
    document.getElementById('compArcherHealth').innerHTML = `<div class="progress">
                                                                <div class="progress-bar" role="progressbar" style="width: ${archer1.health}%">
                                                                ${archer1.health}%
                                                                </div>
                                                              </div>`
}

update()
