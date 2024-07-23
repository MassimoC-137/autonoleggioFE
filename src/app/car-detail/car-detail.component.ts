import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CarService } from '../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(+id).subscribe({
        next: (data) => {
          this.car = data;
        },
        error: (err) => {
          console.error('Failed to get car details', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/cars']);
  }
}