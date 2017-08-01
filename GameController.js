function GameController() {
    //private
    var gameService = new GameService()
    //presents button for arrow type
    function equip(type) {
            if (type == 'barbed') {
                document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="app.controllers.gameController.getAttack('barbed'), app.controllers.gameController.hitCounter()">Shoot Barbed Arrow</button>
        `
                document.getElementById('archerType').innerHTML = `
        <img src="archerBarbed.png" class="img-responsive firstArcher" alt="archer">
        `
            } else if (type == 'flame') {
                document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="app.controllers.gameController.getAttack('flame'), app.controllers.gameController.hitCounter()">Shoot Flaming Arrow</button>
        `
                document.getElementById('archerType').innerHTML = `
        <img src="archerFire.png" class="img-responsive firstArcher" alt="archer">
        `
            } else if (type == 'explode') {
                document.getElementById('arrow-type').innerHTML = `
        <button type="button" class="btn btn-default" onclick="app.controllers.gameController.getAttack('explode'), app.controllers.gameController.hitCounter()">Shoot Exploding Arrow</button>
        `
                document.getElementById('archerType').innerHTML = `
        <img src="archerBomb.png" class="img-responsive firstArcher" alt="archer">
        `
            }
    }


    // draw function
    function update() {
        let archerOne = gameService.getArcherOne()
        let archerTwo = gameService.getArcherTwo()
        document.getElementById('hits').innerHTML = archerTwo.hits
        document.getElementById('compArcherHealth').innerHTML = `<div class="progress" >
            <div class="progress-bar" role="progressbar" style="width: ${archerTwo.health}%">
            </div>
                                                                 </div> `

        document.getElementById('userHits').innerHTML = archerOne.hits
        document.getElementById('userArcherHealth').innerHTML = `<div class="progress" >
            <div class="progress-bar" role="progressbar" style="width: ${archerOne.health}%">
            </div>
                                                                 </div> `
        //updates damage readout
        if (archerOne.health < 100 || archerTwo.health < 100) {
            if (archerTwo.damage == 0) {
                document.getElementById('gameEnd').innerHTML = `
            <h1> ${archerTwo.name } has dodged your attack!</h1>
                `
            }
            if (archerTwo.damage > 0) {
                document.getElementById('gameEnd').innerHTML = `
                <h1> You have done ${archerTwo.damage } damage to ${archerTwo.name } !</h1>
                    `
            }
        }
        //updates game end
        if (archerTwo.health <= 0 && archerOne.health > 0) {
            return document.getElementById('gameEnd').innerHTML = `
                    <h1> ${archerTwo.name } has been defeated!</h1>
                        <button type="button" class="btn btn-warning" onclick="app.controllers.gameController.reset()">Reset</button>
        `
        } else if (archerOne.health <= 0 && archerTwo.health > 0) {
            return document.getElementById('gameEnd').innerHTML = `
            <h1> You have been defeated with ${archerOne.hits } hits!</h1>
                <button type="button" class="btn btn-warning" onclick="app.controllers.gameController.reset()">Reset</button>`
        }

    }
    //public

    this.hitCounter = function hitCounter() {
        gameService.getHits()
    }

    this.attackType = function attackType(type) {
        if (type == 'barbed') {
            equip('barbed')
            gameService.getArrow(type)
        }
        if (type == 'flame') {
            equip('flame')
            gameService.getArrow(type)
        }
        if (type == 'explode') {
            equip('explode')
            gameService.getArrow(type)
        }
    }

    this.getAttack = function getAttack(type) {
        gameService.getAttack(type)
        update()
    }

    this.reset = function reset() {
        gameService.getReset()
        update()
    }
    update()
}