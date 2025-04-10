import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersonalData} from "../models/personal-data.interface";

@Injectable({
    providedIn: 'root'
})
export class ReservationStoreService {
    private personalDataSubject: BehaviorSubject<PersonalData> = new BehaviorSubject<PersonalData>({} as PersonalData);
    private errMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');


    personalData$ = this.personalDataSubject.asObservable();
    errMessage$ = this.errMessageSubject.asObservable();

    setPersonalData(data: PersonalData) {
        this.personalDataSubject.next(data);
    }

    setErrorMessage(errMessage: string) {
        this.errMessageSubject.next(errMessage)
    }

    getPersonalData(): PersonalData {
        return this.personalDataSubject.value;
    }
}