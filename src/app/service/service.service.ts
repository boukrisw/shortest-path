import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  public algo = 'Dijkstra\'s Algorithm';
  public speed = 200;

  //Pour animation de trajet en vert
  public parcoursEnours :pair[]= [];
  
  //Le terrain
  public table = [['#','#','#','#','#','#','#','#','#','#','#','#','#','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ','.',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],['#','#','#','#','#','#','#','#','#','#','#','#','#','#']];
  
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
  
  ConstructPath() {
    let path = [];
    let a=0
    for(let n:pair ={x:this.endX,y:this.endY} ; n!=null ; n =this.prev[n.x][n.y]){
      a++;
      //console.log( n.x,' , ',n.x ,' => ');

      /*if(a==70) {
        path.reverse();
        return path;
      }*/
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

  move(l : pair, e : pair){
    if(this.table[l.x][l.y] == '@.')this.table[l.x][l.y]='.';
    else this.table[l.x][l.y]=' ';

    if(this.table[e.x][e.y] == '.'){
      this.table[e.x][e.y]='@.';
    }else if(this.table[e.x][e.y] == '$'){
      this.table[e.x][e.y]='@';
      if( l.x = e.x){
        if(l.y+1 == e.y){
          this.table[e.x][e.y+1]='$';
        }else{
          this.table[e.x][e.y-1]='$';
        }
      }else{
        if(l.x+1 == e.x){
          this.table[e.x+1][e.y]='$';
        }else{
          this.table[e.x-1][e.y]='$';
        }
      }
    }else{
      this.table[e.x][e.y] ='@';
    } 
    this.sourceX=e.x 
    this.sourceY=e.y;
  }
}

export interface pair {
  x: number;
  y: number;
}

//  setTimeout(() => {}, this.speed*i);

