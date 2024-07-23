import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../services/booking.service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  booking: Booking | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingService.getBookingById(+id).subscribe({
        next: (data) => {
          this.booking = data;
        },
        error: (err) => {
          console.error('Failed to get booking details', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}