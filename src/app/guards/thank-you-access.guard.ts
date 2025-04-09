import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThankYouAccessGuard implements CanActivate{
    constructor(private router: Router) {}

    canActivate(): boolean {
        const allowed = sessionStorage.getItem('allowThankYou') === 'true';

        if (!allowed) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}