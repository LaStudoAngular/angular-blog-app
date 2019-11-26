import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bl-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['admin', 'login']);
  }
}
