import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { EventoModule } from './evento/evento.module';
import { HomeComponent } from './home/home.component';
import { PlatoModule } from './plato/plato.module';
import { ReservaModule } from './reserva/reserva.module';
import { PedidoModule } from './pedido/pedido.module';
import { ResenaModule } from './resena/resena.module';

import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminEventoModule } from './adminevento/adminevento.module';
import { AdminPlatoModule } from './adminplato/adminplato.module';
import { AdminResenaModule } from './adminresena/adminresena.module';

import { AdminReservaModule } from './adminreserva/adminreserva.module';
import { AdminpedidoModule } from './adminpedido/adminpedido.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PasarelaPagoComponent } from './pasarela-pago/pasarela-pago.component';
import { AdminComponent } from './admin/admin.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    HomeComponent,
    PasarelaPagoComponent,
    AdminComponent,
    CarritoComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ResenaModule,
    EventoModule,
    AdminReservaModule,
    PlatoModule,
    ReservaModule,
    NgbModule,
    NgbRatingModule,
    AdminEventoModule,
    AdminPlatoModule,
    
    AdminResenaModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    PedidoModule,
    AdminpedidoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }