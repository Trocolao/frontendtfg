import { Component, OnInit } from '@angular/core';
import { Itempedido } from './itempedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  listaItemsCarrito: Itempedido[] = [];
  totalAmount: number = 0;

  constructor(private router: Router) { }

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

  vaciarCarrito(): void {
    localStorage.clear();
    this.listaItemsCarrito = [];
    this.calculateTotal();
  }

  eliminarItem(id: number): void {
    this.listaItemsCarrito = this.listaItemsCarrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.listaItemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  pagar(): void {
    this.router.navigate(['/pasarela-pago']); // Asegúrate de tener una ruta configurada para la pasarela de pago
  }
}

