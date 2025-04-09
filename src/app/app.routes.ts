import { Route } from '@angular/router';
import {ThankYouComponent} from "./components/shared/thank-you/thank-you.component";
import {ThankYouAccessGuard} from "./guards/thank-you-access.guard";
import {ReservationStepperComponent} from "./components/reservation-stepper/reservation-stepper.component";

export const appRoutes: Route[] = [
    {
        path: '',
        component: ReservationStepperComponent,
    },
    {
        path: 'thank-you',
        component: ThankYouComponent,
        canActivate: [ThankYouAccessGuard]
    }];
