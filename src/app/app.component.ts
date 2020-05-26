import { Component } from '@angular/core';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCar;

  selectedX=-1;
  selectedY=-1;


  constructor(public service: ServiceService) {
  }


  getImg(i:number,j:number){
    let res = '';
    if(this.service.table[i][j] == ' '){
      res = 'Sol';
      const found = this.service.parcoursEnours.find(element => element.x==i && element.y==j);
      
      if(found != undefined){
        res+='Current';
      }else if(this.service.visited[i][j] == true){
        res+='Visited';
      } 
      
    }else if(this.service.table[i][j] == '#'){
      res = 'Mur';
    }else if(this.service.table[i][j] == '@'){
      res = 'Pousseur';
      if(this.selectedX==i && this.selectedY==j) res +='Sel';
    }else if(this.service.table[i][j] == '$'){
      res = 'Caisse';
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
  public setSpeed(s){
    if(s=='Fast') this.service.speed = 500
    else if(s=='Slow') this.service.speed = 1000
  }

  public setAlgo(s){
    this.service.algo = s;
  }

  canMove(i,j){
    return this.service.table[i][j] == '@' || this.service.table[i][j] == '$' || this.service.table[i][j] == '.';
  }

  Go(){
    this.service.launchAlgo();
  }
}

export interface pair {
  x: number;
  y: number;
}