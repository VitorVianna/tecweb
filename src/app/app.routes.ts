import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { EdicaoUsuarioComponent } from './edicao-usuario/edicao-usuario.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'formulario', component: FormularioComponent },
    { path: 'lista-usuario', component: ListaUsuarioComponent, canActivate: [authGuard]},
    { path: 'edicao-usuario/:id', component: EdicaoUsuarioComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: 'login' },
];
