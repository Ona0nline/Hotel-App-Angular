import { Injectable } from '@angular/core';
import { Reservation } from './models/reservation';
import { OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
// We can inject the service into the constructor think autowired
export class ReservationService {

  constructor(){
    let savedReservations = localStorage.getItem("reservations")
    this.reservations = savedReservations ? JSON.parse(savedReservations) : []
  }

  private reservations: Reservation[] = [];

  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void{
    reservation.id = Date.now().toString()
    this.reservations.push(reservation)

    localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1)

  }

  updateReservation(id:string, updatedreservation: Reservation):void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedreservation
  }

}
