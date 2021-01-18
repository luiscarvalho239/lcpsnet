import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLog = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  get f(): any {
    return this.formLog.controls;
  }

  onSubmit(): void {
    this.authSrv.login().subscribe((r: any) => {
      var vr = r.filter(x => x.username == this.f.username.value && x.password == this.f.password.value);

      if(vr.length == 1) {
        alert(`login success as user ${r.username}!!!`);
      
        if(!localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(r));
        }
  
        setTimeout(() => {
          location.href = '/newsfeed';
        }, 5 * 1000);
      } else {
        alert(`Login failed because the user ${this.f.username.value} does not exist in our platform!`);
      }
    }, error => alert(error));
  }
}
