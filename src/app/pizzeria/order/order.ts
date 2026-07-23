import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  public orderForm: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.min(18), Validators.max(65)]],
      agreeToTerms: [true]
    });
  }

  public onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Форма отправлена', this.orderForm.value);
      this.orderForm.reset({
        agreeToTerms: true
      });
    }
  }
}