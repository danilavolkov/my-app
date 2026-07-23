import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  pizzas = [
    {id: 1, name: 'Сьюзи', price: 'Chika'},
    {id: 2, name: 'Габриэль', price: 'Freddy'},
    {id: 3, name: 'Джереми', price: 'Bonny'},
    {id: 4, name: 'Фриц', price: 'Foxy'},
    {id: 5, name: 'Кэссиди', price: 'GoldenFreddy'},
  ];
}
