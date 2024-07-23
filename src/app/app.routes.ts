import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [authGuard] },
  { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [authGuard] },
  { path: 'car-list', component: CarListComponent, canActivate: [authGuard] },
  { path: 'car-detail/:id', component: CarDetailComponent, canActivate: [authGuard] },
  { path: 'booking-list', component: BookingListComponent, canActivate: [authGuard] },
  { path: 'booking-detail/:id', component: BookingDetailComponent, canActivate: [authGuard] }
];