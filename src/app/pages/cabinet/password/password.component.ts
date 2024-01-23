import { Component } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword, updatePassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserRequest, IUserResponse } from 'src/app/shared/interfaces/users';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public passForm!: FormGroup;
  // private Users!: IUserResponse[];
  public curUser!: IUserRequest;
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initPassForm();
  }

  getUsers(): void {
    this.curUser = JSON.parse(localStorage.getItem('curUser') as string);
  }

  initPassForm(): void {
    this.passForm = this.fb.group({
      oldPass: [null, Validators.required],
      newPass: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  async login(email: string, password: string): Promise<UserCredential|undefined> {
    if (password==null) return undefined
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    if (cred) return cred
    else return undefined
     
  }

  async updUser(password: string): Promise<any> {
    const user = this.auth.currentUser;
    return await updatePassword(user!, password);
  }

  signIn(): void {
    let oldPas = this.passForm.get('oldPass')?.value;
    let newPas = this.passForm.get('newPass')?.value;
    let pass = this.passForm.get('password')?.value;
    
    this.login(this.curUser.email, oldPas).then(() => {
      if (pass != newPas) {
        this.toastr.error('Введено некоректні дані. Помилка в новому паролі !!!!');
      }
      else {
        this.updUser(pass).then(() => {
          this.toastr.success('Успішно змінено !!!');
          this.router.navigate(['login'])
        }).catch(e => {
          this.toastr.error('Введено некоректні дані. Помилка в новому паролі !!!!');
          this.toastr.error(e.code);
        })
      }
    }).catch(e => {
      this.toastr.error('Введено некоректні дані. Помилка в старому паролі !!!!');
      this.toastr.success(e.code);
    });

  }



}
