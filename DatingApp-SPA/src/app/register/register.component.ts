import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;

  // by adding Partial we have made all of the properties in the type optional
  bsConfig: Partial<BsDatepickerConfig>;

  user: User;

  // model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // createRegisterFormUsingFormGroup() {
  //   this.registerForm = new FormGroup(
  //     {
  //       username: new FormControl('', Validators.required),
  //       password: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(4),
  //         Validators.maxLength(8),
  //       ]),
  //       confirmPassword: new FormControl('', Validators.required),
  //     },
  //     this.passwordMatchValidator
  //   );
  // }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(
        (response) => {
          this.alertify.success('Registration successful.');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe((response) => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
    // this.authService.register(this.model).subscribe(
    //   (response) => {
    //     this.alertify.success('registration successful!');
    //   },
    //   (error) => {
    //     this.alertify.error(error);
    //   }
    // );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
