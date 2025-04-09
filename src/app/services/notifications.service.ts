import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class NotificationsService {

    constructor(
        public snackBar: MatSnackBar,
    ) {}

    openErrorSnackBar(message: string) {
        this.snackBar.open(message, "",{duration: 4000, panelClass: 'error-snack', horizontalPosition: "center"});
    }

    openSuccessSnackBar(message: string) {
        this.snackBar.open(message, "",{duration: 4000, panelClass: 'success-snack', horizontalPosition: "center"});
    }
}