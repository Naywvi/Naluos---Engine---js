export default class Game { //load map with parameters (div id, name, width, height, assets to load)
    constructor({DivHtmlID = "#game-container", GameName = "Game Default Name", GameWidth = 800, GameHeigth = 600}){
        this.Environment = document.querySelector(DivHtmlID)
        this.GameName = GameName
        this.GameWidth = GameWidth
        this.GameHeigth = GameHeigth
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.objects = new Map()
    }

    start(){
        this.Environment.appendChild(this.canvas)
        this.canvas.setAttribute('id','canvas')
        this.canvas.width = this.GameWidth
        this.canvas.height = this.GameHeigth
    }

    add(EntityObject){
        var rect = this.ctx.rect(EntityObject.x, EntityObject.y, EntityObject.width, EntityObject.height)
        this.objects.set(EntityObject.name, EntityObject)
        this.ctx.fill(rect)
    }
    addEvent(EntityObject, input, speed = 0.1){
        console.log(this.objects.get(EntityObject.name))
        console.log('t')
        window.addEventListener('ArrowDown', () =>{
            console.log("tg");
        })
    }

}


