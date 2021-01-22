class Food{
    constructor(foodStock,lastFed){
        this.image = loadImage("images/milk.png");
        this.foodStock = 0;
        this.lastFed = lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    bedroom(){
        background(bedroomImg,550,250);
    }
    
    garden(){
        background(gardenImg,550,250);
    }

    washroom(){
        background(washroomImg,550,250);
    }

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image,300,600,110,110);

        if(this.foodStock !=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=110;
                    y=y+90;
                }
                image(this.image,x,y,90,90);
                x = x + 40;
            }
        }
    }
}