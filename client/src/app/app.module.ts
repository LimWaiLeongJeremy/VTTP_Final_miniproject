import { FormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapsModule } from "@angular/google-maps";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SucessComponent } from './sucess/sucess.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuard } from './authenticate/auth.guard';
import { AuthInterceptor } from './authenticate/auth.interceptor';
import { UserService } from './service/user.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion'; 
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { 
    path: '', 
    title: "Potter Potions!", 
    component: HomeComponent 
  },
  { 
    path: 'home', 
    title: "Potter Potions!", 
    component: HomeComponent 
  },
  {  
    path: 'login', 
    title: "Login",
    component: LoginComponent 
  },
  { 
    path: 'about', 
    title: "About Potter Potions!", 
    component: AboutUsComponent 
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: "Admin DashBoard",
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'checkOut', 
    component: CheckOutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Check Out'] }
  },
  { path: 'success', 
    component: SucessComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Success'] } 
  },
  { 
    path: 'forbidden', 
    component: ForbiddenComponent,
    data: { roles: ['Success'] }  
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SucessComponent,
    CheckOutComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AccordionModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    TableModule,
    ToastModule,
    FormsModule,
    TooltipModule,
    DataViewModule,
    DropdownModule,
    SidebarModule,
    OrderListModule,
    AvatarModule,
    CarouselModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
