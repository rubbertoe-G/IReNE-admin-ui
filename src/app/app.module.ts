import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { LoginModule } from './layouts/login/login.module';
import { fakeBackendProvider } from './shared/fakebackend/fakebackend.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreviewModule } from './layouts/preview/preview.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    LoginModule,
    PreviewModule,
    HttpClientModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptors, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
