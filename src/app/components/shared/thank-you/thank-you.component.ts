import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReservationStoreService} from "../../../services/reservation-store.service";
import {Subscription} from "rxjs";
import {PersonalData} from "../../../models/personal-data.interface";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'thank-you',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit, OnDestroy {
  @Output() backToStart = new EventEmitter<void>();
  private subscriptionPersonalData!: Subscription;
  private subscriptionErrMessage!: Subscription;
  public personalData?: PersonalData;
  public errorMessage?: string;

  constructor(public reservationStoreService: ReservationStoreService, public router: Router) {
  }

  public ngOnInit() {
    sessionStorage.removeItem('allowThankYou');
    this.subscriptionPersonalData = this.reservationStoreService.personalData$.subscribe((data) => {
      if (data) {
        this.personalData = data;
      }
    });

    this.subscriptionErrMessage = this.reservationStoreService.errMessage$.subscribe((err) => {
      if (err) {
        this.errorMessage = err;
      }
    });
  }

  public ngOnDestroy() {
    this.subscriptionPersonalData.unsubscribe();
    this.subscriptionErrMessage.unsubscribe();
  }

  public newReservation(): void {
    this.router.navigate(['/']);
  }
}
