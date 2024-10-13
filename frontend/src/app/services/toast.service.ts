import { Injectable } from '@angular/core';
declare let iziToast: any;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccess(message: string, title: string = 'Sucesso') {
    iziToast.success({
      title: title,
      message: message,
      position: 'topRight'
    });
  }

  showError(message: string, title: string = 'Erro') {
    iziToast.error({
      title: title,
      message: message,
      position: 'topRight'
    });
  }

  showInfo(message: string, title: string = 'Info') {
    iziToast.info({
      title: title,
      message: message,
      position: 'topRight'
    });
  }

  showWarning(message: string, title: string = 'Aviso') {
    iziToast.warning({
      title: title,
      message: message,
      position: 'topRight'
    });
  }
}
