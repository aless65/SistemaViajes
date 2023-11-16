import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CrearComponentColaboradores } from './pages/colaboradores/crear/crear.component';
import { CrearComponentViajes } from './pages/viajes/crear/crear.component';
import { DetallesComponentViajes } from './pages/viajes/detalles/detalles.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
    { path: '', redirectTo: '/Inicio', pathMatch:'full'},
    { path: 'Inicio', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'Iniciar Sesion', component: LoginComponent },
    { path: 'Colaboradores', component: ColaboradoresComponent, canActivate: [authGuard] },
    { path: 'Colaboradores/Crear', component: CrearComponentColaboradores, canActivate: [authGuard] },
    { path: 'Transportistas', component: TransportistasComponent, canActivate: [authGuard] },
    { path: 'Viajes', component: ViajesComponent, canActivate: [authGuard] },
    { path: 'Viajes/Crear', component: CrearComponentViajes, canActivate: [authGuard] },
    { path: 'Viajes/Detalles', component: DetallesComponentViajes, canActivate: [authGuard] },
    { path: 'Reporte', component: ReporteComponent, canActivate: [authGuard] },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }