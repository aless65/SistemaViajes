import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbAlertModule, NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterModule } from '@angular/router';
// import { UiModule } from '../shared/ui/ui.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"


import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LeftSidebarComponent } from './shared/left-sidebar/left-sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { AppRoutingModule } from './app-routing.module';
import { PreloaderComponent } from './shared/widget/preloader/preloader.component';
import { LoginComponent } from './auth/login/login.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { AdvancedTableComponent } from './shared/advanced-table/advanced-table.component';
import { NgbSortableHeaderDirective } from './shared/advanced-table/sortable.directive';
import { CrearComponentColaboradores } from './pages/colaboradores/crear/crear.component';
import { AlertBoxComponent } from './shared/alert-box/alert-box.component';
import { CrearComponentViajes } from './pages/viajes/crear/crear.component';
import { DetallesComponentViajes } from './pages/viajes/detalles/detalles.component';
import { ReporteComponent } from './pages/reporte/reporte.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LeftSidebarComponent,
    DashboardComponent,
    TopbarComponent,
    TransportistasComponent,
    ViajesComponent,
    ColaboradoresComponent,
    PreloaderComponent,
    LoginComponent,
    PageTitleComponent,
    AdvancedTableComponent,
    NgbSortableHeaderDirective,
    CrearComponentColaboradores,
    AlertBoxComponent,
    CrearComponentViajes,
    DetallesComponentViajes,
    ReporteComponent
  ],
  imports: [
    SimplebarAngularModule,
    BrowserModule, 
    HttpClientModule,
    NgbAlertModule, 
    NgbCollapseModule, 
    NgbDropdownModule, 
    NgbNavModule, 
    NgbProgressbarModule,
    ClickOutsideModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    Select2Module,
    RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
