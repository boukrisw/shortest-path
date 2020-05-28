import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoBiDirecDijkstraService {
  found = false;
  visitedBi= [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
  constructor(public service: ServiceService) { }

  solveBiDirBFS(){

    //init
    this.found = false;
    this.service.parcoursEnours=[];
    this.visitedBi = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
    this.service.prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
     
    var queueDep :pair[]= []; 

    queueDep.push({x:this.service.sourceX,y:this.service.sourceY})
    this.visitedBi[this.service.sourceX][this.service.sourceY] = 'Dep';

    var queueArr :pair[]= []; 

    queueArr.push({x:this.service.endX,y:this.service.endY})
    this.visitedBi[this.service.endX][this.service.endY] = 'Arr';
    
    //Searching
    this.methodeDep(queueDep,queueArr);
  }

  //Searching from the source
  methodeDep(queueDep,queueArr){
    setTimeout(() => {
      if(queueDep.length == 0 || this.found){
        //We do nothing!
      }else{
        let node = queueDep.shift();
        let neighbours : pair[]= this.service.getNeigbours(node.x,node.y);
        neighbours.forEach((next,ind) => {
          if( this.visitedBi[next.x][next.y] != 'Dep'){
                  if(this.visitedBi[next.x][next.y] == 'Arr' && !this.found){
                    //we found solution!
                    this.found = true;
                    /******** to define the path */
                    let inDep: pair = node;
                    while(next!=null && (next.x!=this.service.endX || next.y!=this.service.endY)){
                      let temp = this.service.prev[next.x][next.y];
                      this.service.prev[next.x][next.y] = inDep;
                      inDep =next;
                      next = temp;
                    }
                    if(next!=null)this.service.prev[next.x][next.y] = inDep;
                    //console.log( 'Trouve dans dep');
                    let sol = this.service.ConstructPath();
                    /************************ */
                    /*Movement with animation */
                    sol.map( 
                      (e,i) => {
                          setTimeout(() => {
                            this.service.parcoursEnours.push(e)
                            if(i>0){
                              let l = sol[i-1];
                              this.service.move(l,e);
                            }
                          }, this.service.speed*i);
                        }
                    ); 
                  }else{
                    queueDep.push({x:next.x,y:next.y})
                    this.service.prev[next.x][next.y]=node;
                    this.visitedBi[next.x][next.y] = 'Dep';
                  }
            }
          }) 
          this.methodeArr(queueDep,queueArr);
      }
    }, this.service.speed);
  }


  //Searching from the end
  methodeArr(queueDep,queueArr){
    setTimeout(() => {
      if(queueDep.length == 0 || this.found){
        //We do nothing!
      }else{
        let node = queueArr.shift();
        let neighbours : pair[]= this.service.getNeigbours(node.x,node.y);
        neighbours.forEach((next,ind) => {
          if( this.visitedBi[next.x][next.y] != 'Arr'){

                  if(this.visitedBi[next.x][next.y] == 'Dep' && !this.found){
                    //we found solution!
                    this.found = true;
                    /******** to define the path */
                    let inDep: pair = node;
                    while(inDep!=null && (inDep.x!=this.service.endX || inDep.y!=this.service.endY)){
                      let temp = this.service.prev[inDep.x][inDep.y];
                      this.service.prev[inDep.x][inDep.y] = next;
                      next =inDep;
                      inDep = temp;
                    }

                    if(inDep!=null)this.service.prev[inDep.x][inDep.y] = next;
                    let sol = this.service.ConstructPath();
                    /************************ */
                    /*Movement with animation */
                    sol.map( 
                      (e,i) => {
                          setTimeout(() => {
                            this.service.parcoursEnours.push(e)
                            if(i>0){
                              let l = sol[i-1];
                              this.service.move(l,e);
                            }
                          }, this.service.speed*i);
                        }
                    );
                  }else{
                    queueArr.push({x:next.x,y:next.y})
                    this.service.prev[next.x][next.y]=node;
                    this.visitedBi[next.x][next.y] = 'Arr';
                  }
            }
          }) 
          this.methodeDep(queueDep,queueArr);
      }
    }, this.service.speed);
  }
}
export interface pair {
  x: number;
  y: number;
}