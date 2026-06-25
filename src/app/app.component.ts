import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {NgIf} from "@angular/common";
import {NgFor} from "@angular/common";

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
    name = "Джанет";
    platform = "YouTube";
    text = "Самая популярная сейчас";
    count: number = 0;
    increase($event : any): void {
        this.count++;
        console.log($event);
    }
public isAdmin: boolean = true;
public num: number = 10;
public day: number = 20;
public lang: string = 'de';
public age: number = 12;
public arr: number[] = [1, 2, 3, 4, 5];
public arr2: string[] = ['a', 'b', 'c', 'd'];
}
