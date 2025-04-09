import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthNumberAdultValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const raw = control.value;

        if (!raw) return null;

        const rc = raw.replace('/', '');

        if (!/^\d{9,10}$/.test(rc)) {
            return { invalidFormat: true };
        }

        if (rc.length === 10 && parseInt(rc, 10) % 11 !== 0) {
            return { notDivisibleBy11: true };
        }

        const year = parseInt(rc.slice(0, 2), 10);
        let month = parseInt(rc.slice(2, 4), 10);
        const day = parseInt(rc.slice(4, 6), 10);

        //validation for woman
        if (month > 50) month -= 50;

        const fullYear = year < 54 ? 2000 + year : 1900 + year;
        const birthDate = new Date(fullYear, month - 1, day);

        if (isNaN(birthDate.getTime())) {
            return { invalidDate: true };
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        if (age < 18) {
            return { notAdult: true };
        }

        return null;
    };
}