import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from './models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public usuario?: Usuario;
  loading: boolean = false;
  returnUrl: string = '/';

  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';

  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin', [Validators.required]],
      password: ['123', Validators.required]
    });

    // // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Inicio';
  }

  /**
 * convenience getter for easy access to form fields
 */
  get formValues() { return this.loginForm.controls; }

  /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const postData = {
        usua_Nombre: this.formValues['email']?.value,
        usua_Contrasena: this.formValues['password']?.value,
        usua_Imagen: '',
      };
      this.http.post('/Login', postData).subscribe(
        (data: any) => {
  
          if (data.success) {
            // this.router.navigate([this.returnUrl]);
            localStorage.setItem('user', JSON.stringify(data.data));
            this.router.navigateByUrl('/Inicio');
            this.loginForm.reset();
            console.log("por kha?");
          } else {
            this.loading = false;

            // Usuario o contrasena incorrectos
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              titleText: '¡Usuario o contraseña incorrectos!',
              icon: 'warning',
              background: '#f6f6baf2'
            }).then(() => {
              // Acción luego de cerrarse el toast
            });
          }
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
          console.log(error);
          // Handle post request error
        }
      );
    } 
  }
}
