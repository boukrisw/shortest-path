import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  Solution;
  parcoursEnours :pair[]= [];
  
  public algo = 'Dijkstra\'s Algorithm';
  public speed = 500;
  public table = [['#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ','$',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ','.',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#'],
           ['#','#','#','#','#','#','#','#','#','#','#','#','#','#']
          ];

          visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
          ];

 prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
       [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      ];

  //Source
  public sourceX:number; 
  public sourceY:number;
  //Destination
  public endX:number; 
  public endY:number;
  //BoxPos
  public BoxX:number; 
  public BoxY:number;
  //Directions
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
  
  async launchAlgo(){
      console.log("yes")
      this.printInfo();


      if(this.algo == 'Breadth First Search'){
        this.solveBFS();
      }else if(this.algo == 'Dijkstra\'s Algorithm'){
        //this.Dijkstra();
      }
        
  }
  //  setTimeout(() => {}, this.speed*i);


  /* --------- Breadth First Search Algorithm --------- */
  

  solveBFS(){
    this.parcoursEnours=[];
    this.visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],];
    this.prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
     
    var queue :pair[]= []; //queue.push(2);  var i = queue.shift();

    queue.push({x:this.sourceX,y:this.sourceY})
    this.visited[this.sourceX][this.sourceY] = true;
    
    this.methode(queue);
  }

  methode(queue){
    setTimeout(() => {
      if(queue.length == 0 || this.visited[this.endX][this.endY] == true ){
        //We do nothing!
      }else{
        let node = queue.shift();
        let neighbours : pair[]= this.getNeigbours(node.x,node.y);
        neighbours.forEach((next,ind) => {
          if( this.visited[next.x][next.y] == false){
            queue.push({x:next.x,y:next.y})
                  this.prev[next.x][next.y]=node;
                  this.visited[next.x][next.y] = true;
                  //we found solution!
                  if( this.table[next.x][next.y] == '.'){
                    this.Solution = this.ConstructPath();
                    this.Solution.map( 
                      (e,i) => {
                          setTimeout(() => {
                            this.parcoursEnours.push(e)
                            if(i>0){
                              let l = this.Solution[i-1];
                              if(this.table[l.x][l.y] == '@.')this.table[l.x][l.y]='.';
                              else this.table[l.x][l.y]=' ';
                              if(this.table[e.x][e.y] == '.')this.table[e.x][e.y]='@.';
                              else this.table[e.x][e.y] ='@'
                            }
                          }, this.speed*i);
                        }
                    ); 
                  }
            }
          }) 
          this.methode(queue);
      }
    }, this.speed);
  }

  ConstructPath(){
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
  getNeigbours(x:number,y:number): pair[]{
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
/*
  Dijkstra(){
    console.log(this.AdjMatrix());
  }

  AdjMatrix() : number[][]{
    let tab: number[][]=[];
    for(let i=0;i<this.table[0].length*this.table.length-1;i++){
      tab.push([]);
    }
    tab.map( (l,a) => {
        for(let i=0;i<this.table[0].length*this.table.length-1;i++){
          tab[a].push(0);
        }
      }   
    );

    this.table.map( (l,x) => {
      l.map( (c,y) =>{
        if(c!='#'){
          for(let i=0;i<4;i++){
            let tempX = x + this.dx[i];
            let tempY = y + this.dy[i];
            if(tempX>=0 && tempY>=0 && tempX<this.table.length && tempY<this.table[0].length && this.table[tempX][tempY]!='#'){
              tab[x*this.table[0].length+y][tempX*this.table[0].length+tempY]=1;
            }
          }
        }
      } )  
    })
    
    return tab;
  }*/

  
  
}

export interface pair {
  x: number;
  y: number;


}