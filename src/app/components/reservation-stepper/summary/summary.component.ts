import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalData} from "../../../models/personal-data.interface";
import {COUNTRIES, SLOVAK_CITIES} from "../../../../mocks/locations";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'summary',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  @Input() summaryPersonalData?: PersonalData;
  @Input() summaryFormGroup: FormGroup  = new FormGroup({});
  @Input() finalReservationDate: string = "";
  public countries = COUNTRIES;
  public cities = SLOVAK_CITIES;

  get selectedCountryName(): string {
    return this.countries.find(c => c.id === this.summaryPersonalData?.countryId)?.name || '';
  }

  get selectedCityName(): string {
    return this.cities.find(c => c.id === this.summaryPersonalData?.cityId)?.name || '';
  }

}
