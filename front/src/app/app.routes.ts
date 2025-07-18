import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [

    {path: "home", title: 'Inicio', component: Home},
    {path: "login", title: 'Inicio-Sesion', component: Login},
    {path: "register", title: 'Registrarse', component: Register},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', title: '404 || Page not Found', component: PageNotFound}



];
