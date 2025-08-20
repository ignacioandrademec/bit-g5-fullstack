import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosS } from '../../../services/productos-s';
import { Productos } from '../../../interfaces/productos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-productos.html',
  styleUrl: './crud-productos.css'
})
export class CrudProductos implements OnInit{
  
  productos: Productos[]=[];
  imagenBaseUrl = 'http://107.21.171.118:3000/imagenes/';
  mostrarFormulario = false;
  productoForm: Productos= this.resetProducto();

  modo: 'crear' | 'editar' = 'crear';

  constructor(private productosService: ProductosS, 
              private cdr: ChangeDetectorRef
  ){}

  obtenerProductos():void{
    this.productosService.getAll().subscribe({
      next:(resp)=>{
        this.productos=resp;
        this.cdr.detectChanges();
      },
      error:(err)=> console.log("Error al cargar los productos", err)
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  selectedFile! : File;

  OnFileSelected(event:any):void{
    const file: File = event.target.files[0];
    if(file){
      this.selectedFile = file;
    }
  }

  crearProducto():void{
    if(!this.selectedFile){
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append('tipoProducto', this.productoForm.tipoProducto);
    formData.append('serialProducto', this.productoForm.serialProducto);
    formData.append('marcaProducto', this.productoForm.marcaProducto);
    formData.append('precioProducto', this.productoForm.precioProducto.toString());
    formData.append('colorProducto', this.productoForm.colorProducto);
    formData.append('imagen', this.selectedFile);

    this.productosService.crear(formData).subscribe({
      next:()=>{
        alert('Producto creado correctamente');
        this.productoForm = this.resetProducto();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerProductos();
        this.cdr.detectChanges();
      },
      error:(err)=> {
        console.log("Error al cargar los productos", err)
        alert('Error al cargar los productos')
      }
    })

  }

  resetProducto():Productos{
    return{
      tipoProducto:'',
      serialProducto:'',
      marcaProducto:'',
      precioProducto:0,
      colorProducto:'',
      imagen:''
    };
  }

  seleccionarParaEditar(producto: Productos):void{
    this.modo = 'editar';
    this.productoForm = { ...producto};
    this.mostrarFormulario = true;
  }

  prepararCrear():void{
    this.modo='crear';
    this.productoForm = this.resetProducto();
    this.mostrarFormulario = true;
  }

  cancelarFormulario():void{
    this.OnFileSelected,this.mostrarFormulario = false;
  }

  actualizarProducto():void{
    if(!this.productoForm._id){
      alert("No se encontro el ID del producto");
      return;
    }

    const formData = new FormData();
    formData.append('tipoProducto', this.productoForm.tipoProducto);
    formData.append('serialProducto', this.productoForm.serialProducto);
    formData.append('marcaProducto', this.productoForm.marcaProducto);
    formData.append('precioProducto', this.productoForm.precioProducto.toString());
    formData.append('colorProducto', this.productoForm.colorProducto);
  

    if(this.selectedFile){
      formData.append('imagen', this.selectedFile);
    }

    this.productosService.actualizar(this.productoForm._id,formData).subscribe({
      next:()=>{
        alert("Producto actualizado correctamente");
        this.obtenerProductos(),
        this.productoForm = this.resetProducto();
        this.selectedFile = undefined!;
        this.mostrarFormulario = false;
        this.obtenerProductos();
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log("Error al acualizar el producto");
        alert("Error al actualizar el producto")
      }
    });
  }

  eliminarProducto(id:string):void{
    if(confirm("¿Esta seguro de eliminar el Producto?")){
      this.productosService.delete(id).subscribe({
        next:(resp)=>{
          alert("Producto Eliminado de manera exitosa")
          this.productos = resp;
          this.obtenerProductos();
          this.cdr.detectChanges();
        },
        error: (err)=> console.log("Error al eliminar", err)
      });
    }
  }
}
