import { Injectable, TemplateRef } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { ToastrModule, ToastRef, ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastr: ToastrService;

  constructor() { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

 







}
