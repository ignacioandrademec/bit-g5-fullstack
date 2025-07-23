import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosS } from '../../services/productos-s';
import { Productos } from '../../interfaces/productos';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrls: ['./shop.css']
})
export class Shop implements OnInit{
  productos: Productos[]=[]
  constructor(private router: Router,
              private productService:ProductosS){}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next:(prods)=>{
        this.productos = prods;
      },
      error:(err)=>{
        console.log("Error al cargar los productos", err);
      }
    });

  }

  getImageUrl(nombreArchivo:string):string{
    return `http://localhost:3000/imagenes/${nombreArchivo}`;
  }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  
}
