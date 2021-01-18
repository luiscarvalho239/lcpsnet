import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formReg = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private authSrv: AuthService, private usersSrv: UsersService) { }

  ngOnInit(): void {
  }

  get f(): any {
    return this.formReg.controls;
  }

  onSubmit(): void {
    this.usersSrv.getUsers().subscribe((ux: any) => {
      var uxv = ux.filter((x: any) => x.username == this.f.username.value || x.email == this.f.email.value);

      if(uxv.length == 0) {
        this.authSrv.register(this.formReg.value).subscribe(
          r => alert(r), 
          error => alert(error)
        );
      } else {
        alert(`ERROR: The user ${this.f.username.value} already exists!`);
      }
    }, error => alert(error));
  }
}
