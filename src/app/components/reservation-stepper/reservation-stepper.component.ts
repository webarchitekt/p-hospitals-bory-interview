import {ChangeDetectionStrategy, Component, model, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {AppointmentSelectionComponent} from "./appointment-selection/appointment-selection.component";
import {PersonalInformationComponent} from "./personal-information/personal-information.component";
import {EndpointsService} from "../../services/endpoints.service";
import {PersonalData} from "../../models/personal-data.interface";
import {PersonalDataResponse} from "../../models/personal-data-response.interface";
import {MatIconModule} from "@angular/material/icon";
import {SummaryComponent} from "./summary/summary.component";
import {birthNumberAdultValidator} from "../../validators/birthNumberAdultValidator";
import {NotificationsService} from "../../services/notifications.service";
import {HttpErrorResponse} from "@angular/common/http";
import {customEmailValidator} from "../../validators/emailValidator";
import {Router} from "@angular/router";
import {ReservationStoreService} from "../../services/reservation-store.service";
import {ModalComponent} from "../shared/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CalendarUtil} from "../../utils/calendar.util";
import {MatToolbar} from "@angular/material/toolbar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {LogoComponent} from "../shared/logo/logo.component";
import {SkDateAdapter} from "../../adapters/sk-date-adapter";

@Component({
    selector: 'reservation-stepper',
    imports: [
        CommonModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AppointmentSelectionComponent,
        PersonalInformationComponent,
        LogoComponent,
        SummaryComponent,
        MatStepper,
        MatIconModule,
        MatToolbar
    ],
    templateUrl: './reservation-stepper.component.html',
    styleUrl: './reservation-stepper.component.scss',
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'sk-SK'},
        {provide: DateAdapter, useClass: SkDateAdapter},
        {provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationStepperComponent {
    @ViewChild('stepper') stepper!: MatStepper;

    public selected = model<Date | null>(null);
    public selectedDate = "";
    public finalReservationDate = "";
    public slotId = "";
    public finalPersonalData!: PersonalData;
    public personalDataResponse?: PersonalDataResponse;

    public selectDateFormGroup = new FormGroup({
        date: new FormControl(null, Validators.required),
        slot: new FormControl(null, Validators.required),
    });
    public personalDataFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        birthNumber: new FormControl('', [Validators.required, birthNumberAdultValidator()]),
        countryId: new FormControl('', Validators.required),
        cityId: new FormControl({value: '', disabled: true}, Validators.required),
        email: new FormControl('', [Validators.required, customEmailValidator()]),
    });
    public summaryFormGroup = new FormGroup({
        gdpr: new FormControl('', Validators.requiredTrue),
        businessConditions: new FormControl('', Validators.requiredTrue),
        marketingPurposes: new FormControl('')
    });

    constructor(public endpointService: EndpointsService,
                public notificationsService: NotificationsService,
                public router: Router,
                public reservationStoreService: ReservationStoreService,
                public dialog: MatDialog,
                public calendarUtil: CalendarUtil) {
    }

    public handleDateChange(date: any) {
        this.selectedDate = date;
        this.finalReservationDate = this.calendarUtil.skFormatDate(date?.date) + ' o ' + date?.slot;
        this.slotId = date?.slotId;
    }

    public savePersonalData() {
        if (this.personalDataFormGroup.invalid) return;

        this.endpointService.savePersonalData(this.personalDataFormGroup.value).pipe().subscribe({
            next: (response: PersonalDataResponse) => {
                this.personalDataResponse = response;
                const formValue = this.personalDataFormGroup.value;

                this.finalPersonalData = {
                    name: formValue.name ?? '',
                    surname: formValue.surname ?? '',
                    birthNumber: formValue.birthNumber ?? '',
                    countryId: formValue.countryId ?? '',
                    cityId: formValue.cityId ?? '',
                    email: formValue.email ?? ''
                };
                this.stepper.next();
            },
            error: (error: HttpErrorResponse) => {
                this.notificationsService.openErrorSnackBar(error.error?.message)
            }
        })
    }

    public confirmReservation() {
        if (this.summaryFormGroup.invalid) return;

        this.endpointService.confirmReservation(this.slotId).pipe().subscribe({
            next: () => {
                sessionStorage.setItem('allowThankYou', 'true');
                this.reservationStoreService.setPersonalData(this.finalPersonalData);
                this.router.navigate(['/thank-you']);
                this.stepper.next();
            },
            error: (error: HttpErrorResponse) => {
                this.reservationStoreService.setErrorMessage(error.error?.message);
                sessionStorage.setItem('allowThankYou', 'true');
                this.router.navigate(['/thank-you']);
            }
        })
    }

    public openCloseModal(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'reset') {
                this.selectedDate = "";
                this.stepper.reset();
                this.selectDateFormGroup.reset();
                this.personalDataFormGroup.reset();
                this.summaryFormGroup.reset();
                this.notificationsService.openSuccessSnackBar("Úspešne ste vymazali vašu rezerváciu!")
            }
        });
    }
}
