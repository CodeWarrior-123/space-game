class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('reset');
    this.nut = createImg("images/plate.png")
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
   background(bannerImage)
    this.title.html("SPACE RACE");
    this.title.position(displayWidth/2 - 50, 0);
    this.reset.position(displayWidth-100,displayHeight-500)

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.nut.position(100 , 200)

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.nut.hide();
      player.name = this.input.value();
      CraftCount = CraftCount+1;
      console.log(CraftCount);
      player.index = CraftCount;
      player.update();
      player.updateCount(CraftCount);
      //this.greeting.html("Hello " + player.name)
      this.greeting.class("greetings")
      var message = `
      Hello ${this.input.value()}
      </br>wait for another player to join...`;
      this.greeting.html(message);
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
  
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      player.updateStatus(false,"null")
      database.ref('/').update({
        players: null 
      });
      })
     
    }
   
}
