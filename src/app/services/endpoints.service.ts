import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersonalDataResponse} from "../models/personal-data-response.interface";
import {SlotsByDate} from "../models/slot.interface";

@Injectable({
    providedIn: 'root'
})

export class EndpointsService {

    constructor(
        private http: HttpClient
    ) {}

    getAvailableSlots(): Observable<SlotsByDate> {
        return this.http.get<SlotsByDate>(`/api/available-slots`);
    }

    savePersonalData(personalInfo: any): Observable<PersonalDataResponse> {
        const headers = { 'content-type': 'application/json'}
        return this.http.post<PersonalDataResponse>('api/save-personal-data', personalInfo,{'headers':headers});
    }

    confirmReservation(id: string): Observable<any> {
        const headers = { 'content-type': 'application/json' };
        const body = { id };
        return this.http.post<any>('/api/complete', body, { headers });
    }



}