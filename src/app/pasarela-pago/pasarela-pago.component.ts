import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itempedido } from './itempedido';  // Ajusta la ruta según sea necesario
import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';  // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent implements OnInit {
  listaItemsCarrito: Itempedido[] = [];
  totalAmount: number = 0;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pedidoService: PedidoService
  ) {
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardExpiry: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
      cardCvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  ngOnInit(): void {
    this.loadCarrito();
    this.calculateTotal();
  }

  loadCarrito(): void {
    const carritoStorage = localStorage.getItem("carrito") as string;
    if (carritoStorage) {
      this.listaItemsCarrito = JSON.parse(carritoStorage);
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.listaItemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.pedidoService.store(this.listaItemsCarrito).subscribe(
        response => {
          alert('Pago realizado con éxito!');
          localStorage.removeItem("carrito");
          this.router.navigate(['/pedido/myindex']);
        },
        error => {
          alert('Hubo un error al procesar el pago. Por favor, intente nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete correctamente todos los campos.');
    }
  }

  cancelar(): void {
    localStorage.removeItem("carrito");
    this.router.navigate(['/plato/index']);
  }
}
