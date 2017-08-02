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
    //updates hit counter
        document.getElementById('hits').innerHTML = `<h2>Hits Taken: ${archerTwo.hits}</h2>`
        document.getElementById('compArcherHealth').innerHTML = `<div class="progress" >
            <div class="progress-bar" role="progressbar" style="width: ${archerTwo.health}%">
            </div>
                                                                 </div> `

        document.getElementById('userHits').innerHTML = `<h2>Hits Taken: ${archerOne.hits}</h2>`
        document.getElementById('userArcherHealth').innerHTML = `<div class="progress" >
            <div class="progress-bar" role="progressbar" style="width: ${archerOne.health}%">
            </div>
            </div> `
    //updates win counter
        document.getElementById('winsOne').innerHTML = `
        <h2>Wins: ${archerOne.winCount}</h2>
        `
        document.getElementById('winsTwo').innerHTML = `
        <h2>Wins: ${archerTwo.winCount}</h2>
        `        

        //updates damage readout
        if (archerOne.health < 100 || archerTwo.health < 100) {
            if (archerTwo.damage == 0 && archerOne.damage == 0) {
                document.getElementById('gameEnd').innerHTML = `
                <h1> ${archerTwo.name } has dodged your attack!</h1>
                <h1> You have dodged ${archerTwo.name}'s attack!</h1>
                `
            }
            if (archerTwo.damage > 0 && archerOne.damage > 0) {
                document.getElementById('gameEnd').innerHTML = `
                <h1> You have done ${archerTwo.damage } damage!</h1>
                <h1> You have taken ${archerOne.damage } damage!</h1>
                    `
            }
            if (archerTwo.damage > 0 && archerOne.damage == 0) {
                document.getElementById('gameEnd').innerHTML = `
                <h1> You have done ${archerTwo.damage } damage!</h1>
                <h1> You have dodged ${archerTwo.name}'s attack!</h1>
                    `
            }
            if (archerOne.damage > 0 && archerTwo.damage == 0) {
                document.getElementById('gameEnd').innerHTML = `
                <h1> ${archerTwo.name } has dodged your attack!</h1>
                <h1> You have taken ${archerOne.damage } damage!</h1>
                    `
            }
        }
        //updates game end
        if (archerTwo.health <= 0 && archerOne.health > 0) {
             document.getElementById('gameEnd').innerHTML = `
                    <h1> ${archerTwo.name } has been defeated!</h1>
                        <button type="button" class="btn btn-warning" onclick="app.controllers.gameController.reset()">Reset</button>
        `
               document.getElementById('arrow-type').innerHTML = ``
               document.getElementById('items').innerHTML = ``
        } else if (archerOne.health <= 0 && archerTwo.health > 0) {
             document.getElementById('gameEnd').innerHTML = `
            <h1> You have been defeated with ${archerOne.hits } hits!</h1>
                <button type="button" class="btn btn-warning" onclick="app.controllers.gameController.reset()">Reset</button>`
                document.getElementById('arrow-type').innerHTML = ``
                document.getElementById('items').innerHTML = ``
         }
    }
    //public

    this.hitCounter = function hitCounter() {
        gameService.getHits()
        update()
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