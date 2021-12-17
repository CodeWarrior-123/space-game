class Player {
  constructor(){
    this.index = null;
    this.name = null;
   
  }

  getCount(){
    var CraftCountRef = database.ref('CraftCount');
   CraftCountRef.on("value",(data)=>{
      CraftCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      CraftCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      name:this.name
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  
getStatusisTouched(){
  database.ref('isTouched').on("value",(data)=>{
      status1 = data.val();
    })
}

getStatuswhoTouched(){
  database.ref('whoTouched').on("value",(data)=>{
      status2 = data.val();
    })
}

updateStatus(status,player){
  database.ref('/').update({
   'isTouched' : status,
    'whoTouched':player
  });
}


}
