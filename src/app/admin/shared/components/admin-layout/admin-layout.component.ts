import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bl-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['admin', 'login']);
  }
}
