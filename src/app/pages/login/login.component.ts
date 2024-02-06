import { Component } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public usersForm!: FormGroup;
  private curUser = {
    uid: '',
    email: '',
    role: '',
    firstName: ''
  };

  constructor(
    private prodService: ProductsService,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService,
    private afs: Firestore
  ) { }

  async login(email: string, password: string): Promise<UserCredential> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return cred
  }
  async signUp(email: string, password: string): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    return cred
  }


  ngOnInit(): void {
    localStorage.clear();
    this.initUsersForm();
    this.userService.userLogon.next(false);
    this.prodService.changeBasket.next(true);
  }

  initUsersForm(): void {
    this.usersForm = this.fb.group({
      name: [null],
      email: [null, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
      ],
      password: [null, Validators.required]
    })
  }


  signIn(): void {
    let em = this.usersForm.get('email')?.value;
    let pas = this.usersForm.get('password')?.value;

    if (pas == '' || pas == null) { this.toastr.error('Помилка в паролі !!!'); return }
    this.login(em, pas).then(dataUs => {
      docData(doc(this.afs, 'users', dataUs.user.uid)).subscribe(data => {
        this.curUser.role = data!['role'];
        if (this.curUser.role == 'ADMIN') {
          this.curUser.email = dataUs.user.providerData[0].uid;
          this.curUser.uid = dataUs.user.uid;
          localStorage.setItem("curUser", JSON.stringify(this.curUser));
          this.router.navigate(['admin']);
          this.userService.userLogon.next(true);
          this.toastr.success('Вітаємо !!');
        }
        else {
          this.toastr.warning('Натисніть на користувача біля корзини !!!');
          this.router.navigate(['']);
        }
      })
    }).catch(e => {
      this.toastr.error(e.code)
    })

  }

  get _email() {
    return this.usersForm.get('email');
  }

}
