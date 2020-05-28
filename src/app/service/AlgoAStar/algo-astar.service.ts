import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoAStarService {

  constructor(public service: ServiceService) { }
  /* --------- A* Algorithm --------- */
  solveAStar(){
    this.service.parcoursEnours=[];
    this.service.visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],];
    this.service.prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
     
    var queue :node[]= [];

    queue.push({x:this.service.sourceX,y:this.service.sourceY,cout:0,heuristique:0})

    this.methode(queue);
  }

  methode(queue:node[]){
    setTimeout(() => {
      if(queue.length == 0 || this.service.visited[this.service.endX][this.service.endY] == true){
        //We do nothing!
      }else{
        let current = this.lowestCost(queue);
        queue = queue.filter(obj => obj !== current);
        this.service.visited[current.x][current.y] = true;
        
        if(this.service.visited[this.service.endX][this.service.endY] == true){
          return 
        }

 
        let neighbours : pair[]= this.service.getNeigbours(current.x,current.y);
        neighbours.forEach((next,ind) => {
          if( this.service.visited[next.x][next.y] == false){
                  let nextNode:node = {x:next.x,y:next.y,cout:current.cout+1,heuristique:current.cout+this.distance(next)}
                  queue.push(nextNode);
                  if(this.service.prev[next.x][next.y]==null){
                    this.service.prev[next.x][next.y]={x:current.x,y:current.y,cout:current.cout,heuristique:current.cout+this.distance(next)};
                  }else{
                    if(this.service.prev[next.x][next.y].heuristique>=current.cout+this.distance(next)){
                      this.service.prev[next.x][next.y]={x:current.x,y:current.y,cout:current.cout,heuristique:current.cout+this.distance(next)};
                    }
                  }                      
                  //we found solution!
                  if(this.service.table[next.x][next.y] == '.'){
                    let sol = this.service.ConstructPath();
                    sol.map( 
                      (e,i) => {
                          setTimeout(() => {
                            this.service.parcoursEnours.push(e)
                            if(i>0){
                              let l = sol[i-1];
                              this.service.move({x:l.x,y:l.y},{x:e.x,y:e.y});
                            }
                          }, this.service.speed*i);
                        }
                    ); 
                    //console.log('pxhhiiiiw')
                    //this.service.parcoursEnours.map(obj => console.log(obj.x,',',obj.y,' -> '))
                  }
            }
          }) 
          this.methode(queue);
      }
    }, this.service.speed);
  }


  lowestCost(queue){
      var min = queue[0];
      for(let i=1;i<queue.length;i++){
        if(min.heuristique >= queue[i].heuristique) min=queue[i];
      }
      return min;
  }


  compare2Nodes(n1:node, n2:node){
       if(n1.heuristique < n2.heuristique) return 1;
       else if(n1.heuristique  == n2.heuristique) return 0;
       else return -1;
  }

  distance(v:pair){
    return Math.abs(v.x-this.service.endX)+Math.abs(v.y-this.service.endY);
  }
}

export interface node {
  x: number;
  y: number;
  cout: number;
  heuristique: number;
}

export interface pair {
  x: number;
  y: number;
}
