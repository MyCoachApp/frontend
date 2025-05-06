import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppComponent,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class AppModule { }