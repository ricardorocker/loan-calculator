import { Component } from '@angular/core';
import { NavLink } from 'src/app/model/nav-link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navLinks: NavLink[] = [
    { label: 'Home', url: '/home' },
    { label: 'Simulation', url: '/loan-calculator' },
    { label: 'About', url: '/about' }
  ];
}


