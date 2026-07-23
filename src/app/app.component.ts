import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChildComponent } from './child.component';
import { BoldDirective } from "./bold.directive";
import { WhileDirective } from "./while.directive";
import { DataService } from "./data.service";
import { DataComponent } from "./data.component";
import { NgModel } from '@angular/forms';
import { FormatPhone } from './pipe/custom-pipe-pipe';
import {Routes} from '@angular/router';
import {Home} from './pizzeria/home/home';
import {Menu} from './pizzeria/menu/menu';
import {Pizza} from './pizzeria/pizza/pizza';
import {Contacts} from './pizzeria/contacts/contacts';
import { Order } from './pizzeria/order/order';
import { PizzeriaLayout } from './pizzeria/pizzeria-layout/pizzeria-layout';
import { RouterOutlet, RouterModule } from '@angular/router';


export const routes: Routes = [
  { 
    path: 'pizzeria', 
    component: PizzeriaLayout,
    children: [
      { path: '', component: Home },
      { path: 'menu', component: Menu },
      { path: 'pizza/:id', component: Pizza },
      { path: 'contacts', component: Contacts },
      { path: 'order', component: Order },
    ]
  },

  {path: '', component: Home},
  {path: 'menu', component: Menu},
  {path: 'pizza/:id', component: Pizza},
  {path: 'contacts', component: Contacts},
  {path: 'order', component: Order },
];

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, // ChildComponent,
  FormsModule, FormatPhone,
  BoldDirective, WhileDirective, DataComponent, //RouterOutlet, 
  RouterModule, 
  //PizzeriaLayout
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
  public testNumbers = [
    { number: '251234567', country: 'BY' as const, description: 'Корректный BY номер' },
    { number: '251234567phone.', country: 'BY' as const, description: 'BY с текстом' },
    { number: '   9991234567!!!', country: 'RU' as const, description: 'RU с пробелами' },
    { number: '123456789', country: 'PL' as const, description: 'Корректный PL номер' },
    { number: '48123456789', country: 'PL' as const, description: 'PL с кодом страны' },
    { number: 'abc123', country: 'BY' as const, description: 'Некорректный номер' },
    { number: '', country: 'BY' as const, description: 'Пустая строка' },
    { number: '12', country: 'RU' as const, description: 'Слишком короткий' },
    { number: '123456789012345', country: 'BY' as const, description: 'Слишком длинный' },
    { number: '12345', country: 'PL' as const, description: 'Неверная длина для PL' },
    { number: '+375251234567', country: 'BY' as const, description: 'С +375' },
    { number: '8-999-123-45-67', country: 'RU' as const, description: 'С дефисами' }
  ];
  public testNumber: string = '';
  public selectedCountry: 'BY' | 'RU' | 'PL' = 'BY';
  public formattedResult: string = '';
  public countries = ['BY', 'RU', 'PL'] as const;
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
  public formatNumber(): void {
    if (this.testNumber && this.testNumber.trim()) {
      const pipe = new FormatPhone();
      this.formattedResult = pipe.transform(this.testNumber.trim(), this.selectedCountry);
    } else {
      this.formattedResult = 'Введите номер телефона';
    }
  }
  public isValidNumber(value: string, country: 'BY' | 'RU' | 'PL'): boolean {
    if (!value) return false;
    
    const cleaned = value.replace(/\D/g, '');
    
    const patterns = {
      'BY': /^\d{9}$/,
      'RU': /^\d{10}$/,
      'PL': /^\d{9}$/
    };
    
    return patterns[country].test(cleaned);
  }
  public clearTestInput(): void {
    this.testNumber = '';
    this.formattedResult = '';
  }
  ngOnInit() {
  this.items = this.dataService.getData();
  if (localStorage.getItem('openPizzeria') === 'true') {
    localStorage.removeItem('openPizzeria');
    setTimeout(() => {
      window.location.hash = '/pizzeria';
    }, 100);
  }
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
  public forPipees = 'rerun Al-Haitam';
  public forPipees2 = 'For GOD PLEASE!!!';
 public openPizzeria(): void {
  localStorage.setItem('openPizzeria', 'true');
  window.open(window.location.href, '_blank');
}

}