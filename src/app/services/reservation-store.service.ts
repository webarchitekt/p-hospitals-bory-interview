import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersonalData} from "../models/personal-data.interface";

@Injectable({
    providedIn: 'root'
})
export class ReservationStoreService {
    private personalDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
    private errMessageSubject = new BehaviorSubject<string | undefined>('');


    personalData$ = this.personalDataSubject.asObservable();
    errMessage$ = this.errMessageSubject.asObservable();

    setPersonalData(data: PersonalData | undefined) {
        this.personalDataSubject.next(data);
    }

    setErrorMessage(errMessage: string) {
        this.errMessageSubject.next(errMessage)
    }

    getPersonalData(): PersonalData {
        return this.personalDataSubject.value;
    }
}