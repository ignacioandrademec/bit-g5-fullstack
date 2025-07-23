import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrudProductos } from './crud-productos/crud-productos';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, CrudProductos],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

  constructor(private router: Router){}

  logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
}
