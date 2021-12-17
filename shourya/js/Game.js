class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var CraftCountRef = await database.ref("CraftCount").once("value");
      if (CraftCountRef.exists()) {
        CraftCount = CraftCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    backGround = createSprite(displayWidth - 40, displayHeight - 30);
    backGround.addImage(groundImage);
    backGround.velocityX = -3;

    craft1 = createSprite(130, 500);
    craft1.addImage("c1", craft1Image);
    craft1.addImage("c1loose", looseImage);
    craft1.addImage("c1win", winImage);
    craft1.scale = 0.5;
    craft1.visible = false;
    craft1.debug = true;
    craft1.setCollider("rectangle", 0, 0, 250, 110);
    craft2 = createSprite(130, 500);
    craft2.addImage("c2", craft2Image);
    craft2.addImage("c2loose", looseImage);
    craft2.addImage("c2win", winImage);
    craft2.scale = 1;
    craft2.visible = false;
    craft2.debug = true;
    craft2.setCollider("rectangle", 0, 0, 250, 110);
    crafts = [craft1, craft2];
  }

  play() {
    form.hide();

    if (backGround.x < 0) {
      backGround.x = backGround.width / 1;
    }
    dushmanFun();

    Player.getPlayerInfo();
    player.getStatusisTouched();
    player.getStatuswhoTouched();
   
      if (dushmanGroup.isTouching(craft1)) {
        player.updateStatus("true", "player1");
      }
      if (dushmanGroup.isTouching(craft2)) {
        player.updateStatus("true", "player2");
      }
      
      if (status1 === "true") {
        if (status2 === "player1") {
          craft1.changeImage("c1loose", looseImage);
        craft2.changeImage("c2win", winImage);
        }
        if (status2 === "player2") {
          craft2.changeImage("c2loose", looseImage);
          craft1.changeImage("c1win", winImage);
        }
        game.update(2)      
      }
    

    if (allPlayers !== undefined) {
      //index of the array
      var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        if (index === player.index) {
          crafts[index - 1].visible = true;
        }
        if (keyCode === DOWN_ARROW && player.index !== null) {
          crafts[index - 1].velocityY = 3;
        }

        if (keyCode === UP_ARROW && player.index !== null) {
          crafts[index - 1].velocityY = -3;
        }

      /*   if (
          dushmanGroup.isTouching(craft1) ||
          dushmanGroup.isTouching(craft2)
        ) {
          if (dushmanGroup.isTouching(craft1)) {
            player.updateStatus("true", "player1");
            player.getStatusisTouched();
            player.getStatuswhoTouched();

            if (status1 === "true" && status2 === "player1") {
              craft1.changeImage("c1loose", looseImage);
              craft2.changeImage("c2win", winImage);
            }
          } else if (dushmanGroup.isTouching(craft2)) {
            player.updateStatus("true", "player2");
            player.getStatusisTouched();
            player.getStatuswhoTouched();
            if (status1 === "true" && status2 === "player2") {
              craft2.changeImage("c2loose", looseImage);
              craft1.changeImage("c1win", winImage);
            }
          }
          craft1.velocityY = 0;
          craft2.velocityY = 0;
          backGround.velocityX = 0;
          gameState = 2;
        } */
      }
    }
    drawSprites();
  }

  end() {
    console.log("game end");
  }
}
