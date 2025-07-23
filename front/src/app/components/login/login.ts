import { Component, inject } from '@angular/core';
import { Credential } from '../../interfaces/credential';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router = inject(Router);
  loginService : LoginService = inject(LoginService);
  credentialForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  handleSubmit(){

    if(this.credentialForm.valid){
      const username = this.credentialForm.value.username;
      const password = this.credentialForm.value.password;

      if(typeof username === 'string' && typeof password === 'string'){
         const credential: Credential ={
          username,
          password,
      };
      this.loginService.login(credential).subscribe((response:any)=>{

        if(response.result === 'fine'){
          
          localStorage.setItem('token',response.data);

          const decoded: any = this.loginService.decodeToken(response.data);
          console.log('Token decodificado', decoded);
          if(decoded.rol === 'admin'){
            this.router.navigateByUrl('/admin-panel');
          }else{
            alert("redirigiendo al shop");
             this.router.navigateByUrl('/shop');
          }

        }

      });
      }
    }else{
      console.log("Error invalid form");
    }
  }
}

