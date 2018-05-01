import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedin = false;
  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.getAuthStatus().subscribe(result => this.isLoggedin = result.state);
  }

  navigate(location) {
    this.router.navigate([location]);
  }
}
