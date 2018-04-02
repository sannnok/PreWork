import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
//import { Uploader }      from 'angular2-http-file-upload';
import { AgmCoreModule } from '@agm/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Import HttpClientModule from @angular/common/http
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatToolbarModule, MatInputModule, MatButtonModule } from '@angular/material';


import { routes } from './app.router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FormComponent } from './form/form.component';
import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { TrackComponent } from './track/track.component';

// import * as $ from 'jquery';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ProductsComponent,
    CartComponent, 
    HomeComponent,
    ContactComponent,
    FormComponent,
    NotfoundComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAVa3B9POexu_zr1dZsL-2m-A88N7e4j0o' }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule
    // PopupModule.forRoot()
    
  ],
  providers: [
  UserService, 
  AuthguardGuard, 
  {provide: LocationStrategy, useClass: HashLocationStrategy}, 
  // Uploader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
