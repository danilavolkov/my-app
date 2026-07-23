import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-pizza',
  imports: [RouterLink],
  templateUrl: './pizza.html',
  styleUrl: './pizza.css',
})
export class Pizza implements OnInit {
  private readonly route = inject(ActivatedRoute);
  pizzaId: string | null = null;

  ngOnInit() {
      this.pizzaId = this.route.snapshot.paramMap.get('id');
  }
}
