import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRequest, IUserResponse } from 'src/app/shared/interfaces/users';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public regUser = false;
  private Users!: IUserResponse[];
  private newUser!: IUserRequest;
  public usersForm!: FormGroup;
  private curUser = {
    email: '',
    role: ''
  };

  constructor(
    private prodService:ProductsService,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.getUsers();
    this.initUsersForm();
    this.userService.userLogon.next(false);
    this.prodService.changeBasket.next(true);
  }

  getUsers(): void {
    this.userService.getAll().subscribe(data => {
      this.Users = data
    });
  }

  initUsersForm(): void {
    this.usersForm = this.fb.group({
      name: [null],
      email: [null, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
    ],
      password: [null, Validators.required]
    })
  }

  goReg(): void {
    this.regUser = true
  }

  signIn(): void {
    let em = this.usersForm.get('email')?.value;
    let pas = this.usersForm.get('password')?.value;
    if (this.regUser) {
      let nam = this.usersForm.get('name')?.value;
      if (nam == '' || nam == ' ' || nam == null) { alert('Помилка в імені !!!'); return }
      // if (em == '' || em == ' ' || em == null) { alert('Помилка в email !!!'); return }
      if (pas == '' || pas == null) { alert('Помилка в паролі !!!'); return }
      this.newUser = this.usersForm.value;
      this.newUser.role = 'USER';
      let asUs = this.Users.some(el => el.email === em);
      if (asUs) alert('Такий email вже зареєстровано !!');
      else this.userService.create(this.newUser).subscribe({})
      this.getUsers();
      this.regUser = false
    }
    else {
      // if (em == '' || em == ' ' || em == null) { alert('Помилка в email !!!'); return }
      if (pas == '' || pas == null) { alert('Помилка в паролі !!!'); return }
      let asUs = this.Users.filter(el => (el.email == em && el.password == pas));
      if (asUs.length == 0) alert('Невірний пароль або email !!')
      else {
        this.newUser = this.usersForm.value;
        this.curUser.email = this.newUser.email;
        this.curUser.role = asUs[0].role;
        localStorage.setItem("curUser", JSON.stringify(this.curUser));
        if (this.curUser.role == 'ADMIN') this.router.navigate(['admin'])
        else if (this.curUser.role == 'USER') this.router.navigate(['cabinet']);
        this.userService.userLogon.next(true);
      }
    }
  }

  get _email(){
    return this.usersForm.get('email');
  }

}
