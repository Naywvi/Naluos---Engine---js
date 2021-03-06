export default class Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null, map}) {
        this.sounds = sounds
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        this.InitEnvironment(Canvas, Context)
        this.sprite = sprite
        this.name = name || "Default Entity"
        this.animations = new Map()
        this.map = map
        this.save = {
            x, y,
        }
        this.oldPosition = {
            x,y,
        }
        this.velocity = {
            gravity: 0.5,
            x: 0,
            y: 10,
        }
        this.isAEntity = true
        this.isMonster = false
        if(img === "Rectangle") this.img = img
        else this.img = this.SetImgSprite(img)
        if (this.sprite != null) this.hasSprite = true
        else this.hasSprite = false
    }
    InitEntityPosition(x = 0, y = 0) {
        this.x = x; 
        this.y = y;
    }

    InnerEntitySize(width, height) {
        this.width = width;
        this.height = height;
    }

    InitEnvironment(canvas, context){
        this.Canvas = canvas
        this.Context = context
    }

    SetImgSprite(imgPath, framesAnimation, speedAnimation, direction) { //set sprite img
        this.animations.set(direction, framesAnimation, speedAnimation)

        var img = document.createElement('img');
        img.src = imgPath
        return img
    }

    get nameOfEntity(){
        return this.name
    }

    get isEntity(){
        return this.isAEntity
    }

    set isEntity(bool){
        return this.isAEntity = bool
    }

    get isImage(){
        if(this.img === "Rectangle") return false
        return true
    }

    setGravity({bool = true}){
        if(bool){
            if (this.y + this.height + this.velocity.y <= this.Canvas.height*2){
                this.oldPosition.y = this.y
                this.y += this.velocity.y, this.velocity.y += this.velocity.gravity
            }
        }
        this.map.set(this.name, this)
    }

    teleport(tpX,tpY){
        this.x = tpX
        this.y =  this.Canvas.height - tpY
        this.map.set(this.name, this)
    }

    setCollision({bool = true, position = { top : { break : true, collision : true }, right: { break: false, collision: true} ,bottom : { break: false, collision: true }, left: {break: false, collision: true}} }){
        if(bool){
            this.map.forEach(e => {
                if(e.isEntity){
                    if(position.top.collision){
                        if(this.y + this.height >= e.y + e.height && this.y + this.velocity.y <= e.y + e.height && this.x + this.width >= e.x && this.x <= e.x + e.width){
                            this.velocity.y = 0,  this.hasJumped = false
                            if(position.top.break) this.map.delete(e.name)
                        }     
                    }
                    if(position.bottom.collision){
                        if(this.y + this.height <= e.y && this.y + this.height + this.velocity.y >= e.y && this.x + this.width >= e.x && this.x <= e.x + e.width) {
                            this.velocity.y = 0, this.hasJumped = true
                        }
                    }
                    if(position.left.collision){ // collision with right side of the entity
                        if(this.x + this.velocity.x >= e.x-this.width && this.x - this.velocity.x <= e.x && this.y + this.height >= e.y && this.y <= e.y + e.height){
                            this.velocity.x = -0.1
                            this.x = e.x - this.width
                            position.top.collision = false
                        }
                    }
                    if(position.right.collision){ // collision with left side of the entity
                        if(this.x + this.width <= e.x + e.width + this.width - this.velocity.x && this.x + this.width + this.velocity.x >= e.x + e.width && this.y + this.height >= e.y && this.y <= e.y + e.height){
                            this.velocity.x = 0.1
                            this.x = e.x + e.width
                            position.top.collision = false
                        }
                    }
                }
            });
        }
    }

    update(){
        this.map.set(this.name, this)
    }

    checkCollisionTop({object}){
        if(object.oldPosition.y <  Math.floor(this.y - this.height) && object.y > Math.floor(this.y - this.height) && object.x >= this.x - this.width && object.x <= this.x + this.width){
            return true
        }
        return false
    }

    checkCollisionBottom({object}){
        if(object.oldPosition.y <  Math.floor(this.y) && object.y > Math.floor(this.y) && object.x >= this.x - this.width && object.x <= this.x + this.width){
            return true
        }
        return false
    }

    checkCollisionBottomList({objectList: objArray}){
        for (let index = 0; index < objArray.length; index++) {
            if(this.x + objArray[index].width/2 >=  objArray[index].x && this.x <= objArray[index].x - objArray[index].width/2 + objArray[index].width && this.oldPosition.y - this.height  <= objArray[index].y && this.y + this.height >= objArray[index].y){
                return [true, objArray[index]]
            }
        }
        return [false, null]
    }

    checkCollisionTopList({objectList: objArray}){
        for (let index = 0; index < objArray.length; index++) {
            if(objArray[index].oldPosition.y <  Math.floor(this.y - this.height) && objArray[index].y > Math.floor(this.y - this.height) && objArray[index].x >= this.x - this.width && objArray[index].x <= this.x + this.width){
                return [true, objArray[index]]
            }
        }
        return [false, null]
    }

    checkCollisionFromInside({entityObject: obj}){
        if (this.x>=obj.x-40 && this.x<=obj.x+obj.width && Math.floor(this.y)>=obj.y-20 && Math.floor(this.y)<=obj.y+obj.height-20) {
            return true
        }
        return false
    }

    checkCollisionFromInsideList({entityObjects: ArrayObj}){
        for (let index = 0; index < ArrayObj.length; index++) {
            if (this.x>=ArrayObj[index].x-40 && this.x<=ArrayObj[index].x+ArrayObj[index].width && Math.floor(this.y)>=ArrayObj[index].y-20 && Math.floor(this.y)<=ArrayObj[index].y+ArrayObj[index].height-20) {
                return true
            }
        }
        return false
    }

    delete(){
        this.map.delete(this.name)
        delete this
    }
}