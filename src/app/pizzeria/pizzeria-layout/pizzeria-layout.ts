import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pizzeria-layout',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './pizzeria-layout.html',
  styleUrl: './pizzeria-layout.css',
})
export class PizzeriaLayout {
  public currentYear: number = new Date().getFullYear();
}
