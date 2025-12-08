import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  
  @Input() product: Product = { id: 0, name: '', price: 0, description: '' };
  @Output() newproductEvent = new EventEmitter<Product>();

  onSubmit() {
    this.newproductEvent.emit(this.product);
  }
}