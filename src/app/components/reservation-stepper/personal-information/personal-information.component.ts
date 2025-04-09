import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule, MatLabel} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EndpointsService} from "../../../services/endpoints.service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {COUNTRIES, SLOVAK_CITIES} from "../../../../mocks/locations";

@Component({
  selector: 'personal-information',
  imports: [CommonModule, MatFormFieldModule, MatLabel, ReactiveFormsModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {
  @Input() personalDataFormGroup: FormGroup = new FormGroup({});

  public countries = COUNTRIES;
  public citiesByCountry = SLOVAK_CITIES;

  constructor(public endpointService: EndpointsService) {}

  public onCountryChange(id: string): void {
    const cityControl = this.personalDataFormGroup.get('cityId');

    if (id === '1') {
      cityControl!.enable();
    } else {
      cityControl!.disable();
      cityControl!.reset();
    }
  }
}
