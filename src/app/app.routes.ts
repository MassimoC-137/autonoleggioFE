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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'car/:id', component: CarDetailComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'booking/:id', component: BookingDetailComponent }
];