import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'modello', 'marca', 'anno', 'azioni'];
  cars: any[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => {
        console.error('Failed to get cars', err);
      }
    });
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete car', err);
      }
    });
  }
}