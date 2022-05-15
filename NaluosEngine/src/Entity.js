export default class Entity{ //load entity with parameters
    constructor({Canvas, Context, name, x = 0, y = 0, width = 800, height = 600, img = "Rectangle", sounds, sprite = null}) {
        this.sounds = sounds
        this.InitEntityPosition(x, y);
        this.InnerEntitySize(width, height);
        this.InitEnvironment(Canvas, Context)
        this.sprite = sprite
        this.name = name || "Default Entity"
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

    SetImgSprite(imgPath) { //set sprite img
        var img = document.createElement('img');
        img.src = imgPath
        return img
    }

    DrawSprite(img){ 
            this.Context.beginPath()
            this.Context.drawImage(img, 50,50, this.width, this.height,this.x, this.y,this.width, this.height)
            this.Context.fill()
        };

    get nameOfEntity(){
        return this.name
    }

    get isEntity(){
        return true
    }

    get isImage(){
        if(this.img === "Rectangle") return false
        return true
    }
}