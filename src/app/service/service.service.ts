import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  public Solution;

  public algo = 'Dijkstra\'s Algorithm';
  public speed = 500;

  //Pour animation de trajet en vert
  public parcoursEnours :pair[]= [];
  
  //Le terrain
  public table = [['#','#','#','#','#','#','#','#','#','#','#','#','#','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ','$',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ','.',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#','#','#','#','#','#','#','#','#','#','#','#','#','#']];
  
  //Pour reperer les case deja visite
  public visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],];
  
  //pour stocker le prédécesseur d'une case
  public prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
    

  //Source
  public sourceX:number; 
  public sourceY:number;
  //Destination
  public endX:number; 
  public endY:number;
  //BoxPos
  public BoxX:number; 
  public BoxY:number;
  //Les Directions [Nord,East,Sud,Ouest]
  dx = [-1,0,1,0];
  dy = [0,1,0,-1];
  
  constructor() {
    this.init();
  }

  

  init(){
    this.parcoursEnours=[];
    this.table.map((l,x)=>{
      l.map((c,y)=>{
        if(this.table[x][y] == '@'){
          this.sourceX = x;this.sourceY = y;
        }else if(this.table[x][y] == '.'){
          this.endX = x;this.endY = y;
        }else if(this.table[x][y] == '$'){
          this.BoxX = x;this.BoxY = y;
        }
      })
    })
  }

 


  printInfo(){
    console.log('algo  :' , this.algo);
    console.log('speed  :' , this.speed);
    console.log('source  :' , this.sourceX,' , ',this.sourceY);
    console.log('end  :' , this.endX,' , ',this.endY);
  }
  
  ConstructPath() : pair[]{
    let path = [];
    for(let n:pair ={x:this.endX,y:this.endY} ; n!=null ; n =this.prev[n.x][n.y]){
      path.push(n);
    }
    path.reverse();
    this.init();

    if(path[0].x == this.sourceX && path[0].y== this.sourceY){
      return path;
    }
    return [];
  }

  /* Get list Neighbours of (x,y)
                     (x-1,y)
                        |
                        |
          (x,y-1) --- (x,y) --- (x,y+1)
                        |
                        |
                     (x+1,y)
  */
  getNeigbours(x:number,y:number) : pair[]{
    let res:pair[]=[];
    
    for(let i=0;i<4;i++){
      let tempX = x + this.dx[i];
      let tempY = y + this.dy[i];
      if(tempX>=0 && tempY>=0 && tempX<this.table.length && tempY<this.table[0].length && this.table[tempX][tempY]!='#'){
        res.push({x:tempX,y:tempY});
      }
    }
    return res;
  }
}

export interface pair {
  x: number;
  y: number;
}

//  setTimeout(() => {}, this.speed*i);

