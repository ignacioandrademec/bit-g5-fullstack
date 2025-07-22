import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Recover } from './components/recover/recover';
import { Register } from './components/register/register';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Shop } from './components/shop/shop';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {path: "home", title: 'Inicio', component: Home},
    {path: "login", title: 'Inicio-Sesion', component: Login},
    {path: "recover", title: 'Recover', component:Recover},
    {path: "register", title: 'Registrarse', component: Register},
    {path: 'shop', title: 'Shop', component: Shop, canActivate:[authGuard]},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', title: '404 || Page not Found', component: PageNotFound}

];
