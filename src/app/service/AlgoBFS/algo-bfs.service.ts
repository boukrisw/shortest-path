import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoBFSService {

  constructor(public service: ServiceService) {
  }

  /* --------- Breadth First Search Algorithm --------- */

  solveBFS(){
    this.service.parcoursEnours=[];
    this.service.visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],];
    this.service.prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
     
    var queue :pair[]= []; //queue.push(2);  var i = queue.shift();

    queue.push({x:this.service.sourceX,y:this.service.sourceY})
    this.service.visited[this.service.sourceX][this.service.sourceY] = true;
    
    this.methode(queue);
  }

  methode(queue){
    setTimeout(() => {
      if(queue.length == 0 || this.service.visited[this.service.endX][this.service.endY] == true ){
        //We do nothing!
      }else{
        let node = queue.shift();
        let neighbours : pair[]= this.service.getNeigbours(node.x,node.y);
        neighbours.forEach((next,ind) => {
          if( this.service.visited[next.x][next.y] == false){
            queue.push({x:next.x,y:next.y})
                  this.service.prev[next.x][next.y]=node;
                  this.service.visited[next.x][next.y] = true;
                  //we found solution!
                  if( this.service.table[next.x][next.y] == '.'){
                    this.service.Solution = this.service.ConstructPath();
                    this.service.Solution.map( 
                      (e,i) => {
                          setTimeout(() => {
                            this.service.parcoursEnours.push(e)
                            if(i>0){
                              let l = this.service.Solution[i-1];
                              if(this.service.table[l.x][l.y] == '@.')this.service.table[l.x][l.y]='.';
                              else this.service.table[l.x][l.y]=' ';
                              if(this.service.table[e.x][e.y] == '.')this.service.table[e.x][e.y]='@.';
                              else this.service.table[e.x][e.y] ='@'
                            }
                          }, this.service.speed*i);
                        }
                    ); 
                  }
            }
          }) 
          this.methode(queue);
      }
    }, this.service.speed);
  }
}


export interface pair {
  x: number;
  y: number;
}