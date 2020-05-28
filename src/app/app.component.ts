import { Component } from '@angular/core';
import { ServiceService } from './service/service.service';
import { AlgoBFSService } from './service/AlgoBFS/algo-bfs.service';
import { AlgoAStarService } from './service/AlgoAStar/algo-astar.service';
import { AlgoBiDirecDijkstraService } from './service/AlgoBi-diDijkstra/algo-bi-direc-dijkstra.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public Algos: Array<string> = ["Dijkstra's Algorithm",  "A* Search","Bi-direction Dijkstra"];
  public Speeds: Array<string> = ["Fast",  "Average", "Slow"];

  selectedX=-1;
  selectedY=-1;
  help=false;

  constructor(public service: ServiceService, public algoBFS : AlgoBFSService,public algoASTAR : AlgoAStarService,public algoBiBFS :AlgoBiDirecDijkstraService) {
  }


  getImg(i:number,j:number){
    let res = '';
    if(this.service.table[i][j] == ' '){
      res = 'Sol';
      const found = this.service.parcoursEnours.find(element => element.x==i && element.y==j);
      if(found != undefined){
        res+='Current';
      }else if(this.service.visited[i][j] || this.algoBiBFS.visitedBi[i][j]){
        res+='Visited';
      } 
    }else if(this.service.table[i][j] == '#'){
      res = 'Mur';
    }else if(this.service.table[i][j] == '@'){
      res = 'Pousseur';
      if(this.selectedX==i && this.selectedY==j) res +='Sel';
    }else if(this.service.table[i][j] == '.'){
      res = 'But';
      if(this.selectedX==i && this.selectedY==j) res +='Sel';
    }else if(this.service.table[i][j] == '@.'){
      res = 'Pousseur_sur_but';
      if(this.selectedX==i && this.selectedY==j) res +='Sel';
    }
    return '../assets/resources/Images/'+res+'.png';
  }

  click(i,j){
    this.algoBiBFS.found = false;
    this.algoBiBFS.visitedBi = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
    
    this.service.parcoursEnours=[];
    this.service.visited = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false],];
    this.service.prev = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null],];
    
    this.service.visited.map( l => l.map(c=>c=false));
    this.service.prev.map( l => l.map(c=>c=null));
    if(this.service.table[i][j] == ' '){
        if(this.selectedX!=-1 && this.selectedY!=-1){
          if(this.service.table[this.selectedX][this.selectedY] == '@.'){
            this.service.table[i][j] = '@';
            this.service.table[this.selectedX][this.selectedY]='.';
          }else {
            this.service.table[i][j] = this.service.table[this.selectedX][this.selectedY];
            this.service.table[this.selectedX][this.selectedY]=' ';
          }

          if(this.service.table[i][j]=='@'){
            this.service.sourceX = i;
            this.service.sourceY = j;
          }else if(this.service.table[i][j]=='.'){
            this.service.endX = i;
            this.service.endY = j;
          }
        } else{
          this.service.table[i][j] = '#';
        } 
        this.selectedX=-1;
        this.selectedY =-1;
    }else if(this.service.table[i][j] == '#'){
        this.service.table[i][j] = ' ';
        this.selectedX=-1;
        this.selectedY =-1;
    }else {
        this.selectedX=i;
        this.selectedY=j;
    }
  }
  
 Go(){
    this.removeHelp();
    this.selectedX=-1;
    this.selectedY=-1;
    //this.service.printInfo();
    if(this.service.sourceX != this.service.endX || this.service.sourceY != this.service.endY){
      if(this.service.algo == 'Dijkstra\'s Algorithm'){
        this.algoBFS.solveBFS();
      }else if(this.service.algo == 'A* Search'){
        this.algoASTAR.solveAStar();
      }else if(this.service.algo == 'Bi-direction Dijkstra'){
        this.algoBiBFS.solveBiDirBFS();
      }
    }
  }

  changeAlgo(e) {
    this.removeHelp();
    this.service.algo = e.target.value;
  }

  changeSpeed(e) {
    this.removeHelp();
    if(e.target.value=='Fast') this.service.speed = 200
    else if(e.target.value=='Average') this.service.speed = 500
    else if(e.target.value=='Slow') this.service.speed = 1000  
  }

  getMessage(){
    if(this.service.algo == 'Bi-direction Dijkstra'){
      return this.service.algo + ' is weighted and does not guarantee the shortest path!';
    }else {
      return this.service.algo + ' is weighted and guarantees the shortest path!';
    }
  }
  needHelp(){
    this.help=true;
  }

  removeHelp(){
    this.help=false;
  }
  getHelp(){
    return this.help;
  }
}
