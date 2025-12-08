import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormComponent, CommonModule, ModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productSelected: Product = new Product();

  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.findall().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }
  
  onNewProduct(product: Product) {
    if (product.id && product.id > 0) {
      // Actualizar
      this.productService.update(product.id, product).subscribe({
        next: () => {
          this.loadProducts(); // Recargar desde API
          this.productSelected = new Product();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // Crear
      this.productService.create(product).subscribe({ 
        next: () => {
          this.loadProducts(); // Recargar desde API
          this.productSelected = new Product();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }
  
  onDeleteProduct(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts(); // Recargar desde API
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  onUpdateProduct(productRow: Product) {
    this.productSelected = { ...productRow };
  }
}