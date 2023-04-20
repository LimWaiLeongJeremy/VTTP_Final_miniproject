import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { OrderListModule } from 'primeng/orderlist';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';
// import { AgmCoreModule } from "@agm/core";

// TODO: add meniofest
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
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
    data: { roles: ['User'] }
  },
  { path: 'success', 
    component: SucessComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] } 
  },
  { path: 'forbidden', component: ForbiddenComponent },
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
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBZzT0kiPzAEUjF7BJd0FHfu2wzDmc8EX0'
    // }),
    
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
