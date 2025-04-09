import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {EndpointsService} from "./services/endpoints.service";

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [EndpointsService]
})
export class AppComponent implements OnInit{
  title = 'Interview task';

  constructor(
  ) {
  }

    ngOnInit(): void {
    }
}
