import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'bl-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  constructor(private router: Router, public authService: AuthService) {}

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['admin', 'login']);
  }
}
