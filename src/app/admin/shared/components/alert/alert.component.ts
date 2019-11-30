import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Alert } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bl-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() timeout = 5000;

  public message: string;
  public type: string;

  private aSub = new Subscription();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe((alert: Alert) => {
      this.message = alert.message,
      this.type = `alert-${alert.type}`;

      const delay = setTimeout(() => {
        this.message = '';
        clearTimeout(delay);
      }, this.timeout);
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
