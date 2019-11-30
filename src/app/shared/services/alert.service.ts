import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../interfaces';

@Injectable()
export class AlertService {
  public alert$ = new BehaviorSubject<Alert>({type: 'success', message: ''});

  success(message: string) {
    this.alert$.next({type: 'success', message});
  }

  warning(message: string) {
    this.alert$.next({type: 'warning', message});
  }

  danger(message: string) {
    this.alert$.next({type: 'danger', message});
  }

}
