import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from 'src/app/shared/error-handler';
import { ServerErrorInterceptor } from 'src/app/shared/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { LoginModule } from './layouts/login/login.module';
import { fakeBackendProvider } from './shared/fakebackend/fakebackend.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreviewModule } from './layouts/preview/preview.module';
import { JwtInterceptor } from "src/app/shared/authentication/jwt.interceptor"
import { from } from 'rxjs';
import { RevisionsComponent } from './modules/revisions/revisions.component';
import { DatePipe } from '@angular/common';

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
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    fakeBackendProvider,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
