import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({})

  // This dependency will be automatically injected upon loading by Angular, we can just use it
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    // These names have to be exactly the same as the Form Control names in the FormGroup in the html
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['',Validators.required],
      checkOutDate: ['',Validators.required],
      guestName: ['',Validators.required],
      // Multiple validators == have to have multiple arrays
      guestEmail: ['',[Validators.required, Validators.email]],
      roomNumber: ['',Validators.required],


    })

      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if(id){
        let reservation = this.reservationService.getReservation(id)
        if(reservation){
        this.reservationForm.patchValue(reservation)

        }
      }
  }

  
  onSubmit(){
    if(this.reservationForm.valid){
      
      let reservation: Reservation = this.reservationForm.value
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      
      if(id){
        console.log(id)
        this.reservationService.updateReservation(id, reservation)
          this.router.navigate(['/list'])

        } else{
          this.reservationService.addReservation(reservation)
          this.router.navigate(['/list'])

        }
      }
      
    }

  }


