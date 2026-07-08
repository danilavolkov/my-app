import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChildComponent } from './child.component';
import { BoldDirective } from "./bold.directive";
import { WhileDirective } from "./while.directive";
import { DataService } from "./data.service";
import { DataComponent } from "./data.component";

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule, 
    // ChildComponent,
    FormsModule, 
    BoldDirective, 
    WhileDirective, 
    DataComponent
  ],
  providers: [DataService],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  name = "Джанет";
  platform = "YouTube";
  text = "Самая популярная сейчас";
  count: number = 0;
  
  public isAdmin: boolean = true;
  public num: number = 10;
  public day: number = 20;
  public lang: string = 'de';
  public age: number = 12;
  
  public arr: number[] = [1, 2, 3, 4, 5];
  public arr2: string[] = ['a', 'b', 'c', 'd'];
  
  public aa: number = 10;
  public bb: number = 5;
  public opp: string = "-";
  
  condition = true;
  items: string[] = [];
  name2: string = "";
  newItem: string = "";

  constructor(private dataService: DataService) { }
  increase($event: any): void {
    this.count++;
    console.log($event);
  }

  toggle() {
    this.condition = !this.condition;
  }

  addItem(value: string) {
    if (value && value.trim()) {
      this.dataService.addData(value.trim());
      if (this.name === value) this.name = '';
      if (this.name2 === value) this.name2 = '';
      if (this.newItem === value) this.newItem = '';
      this.items = this.dataService.getData();
    }
  }

  ngOnInit() {
    this.items = this.dataService.getData();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const buttons = document.querySelectorAll('.tab-button');
      const panes = document.querySelectorAll('.tab-pane');
      
      buttons.forEach((button) => {
        button.addEventListener('click', function(this: HTMLButtonElement) {
          buttons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const tabId = this.dataset['tab'];
          panes.forEach(p => p.classList.remove('active'));
          const targetPane = document.getElementById(tabId || '');
          if (targetPane) {
            targetPane.classList.add('active');
          }
        });
      });
    }, 100);
  }
}