import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    public user: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private toastrService: ToastrService) { }

    public displayError(title: string, message: string = ''): void {
        this.toastrService.error(message, title);
    }

    public displaySuccess(title: string, message: string = '') {
        this.toastrService.success(message, title);
    }

    public displayWarning(message: string) {
        this.toastrService.warning(message);
    }

    public displayMessage(message: string) {
        this.toastrService.show(message);
    }
}
