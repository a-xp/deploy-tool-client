import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {ProfileService} from "./profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  constructor(public authService: AuthenticationService, public profileService:ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.loadProfile();
  }
}
