import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
