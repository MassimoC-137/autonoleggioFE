import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'utente', 'auto', 'dataInizio', 'dataFine', 'azioni'];
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Failed to get bookings', err);
      }
    });
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete booking', err);
      }
    });
  }
}