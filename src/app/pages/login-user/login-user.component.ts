import { Component } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  public regUser = false;
  e_mail = new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)]);
  e_pas = new FormControl('');
  hide = true;
  // private Users!: IUserResponse[];
  // private newUser!: IUserRequest;
  public usersForm!: FormGroup;
  private curUser = {
    uid: '',
    email: '',
    role: '',
    firstName: '',
    lastName:'',
    phone:''
  };

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService,
    private afs: Firestore,
    private dialogRef: MatDialogRef<HeaderComponent>
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
    // this.prodService.changeBasket.next(true);
  }

  initUsersForm(): void {

    this.usersForm = this.fb.group({
      name: [null],
      sename: [null],
      phone:[null],
      email: this.e_mail,
      // [null, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)    ],
      password: [null, Validators.required],
      dupassword:this.e_pas
    })
  }

  goReg(): void {
    this.regUser = true;
    this.e_pas.setValidators([Validators.required])
  }

  signIn(): void {
    let em = this.usersForm.get('email')?.value;
    let pas = this.usersForm.get('password')?.value;
    let dupas = this.usersForm.get('dupassword')?.value;
    let sename = this.usersForm.get('sename')?.value;
    let phone = this.usersForm.get('phone')?.value;
    const user = {
      role: 'USER',
      email: '',
      firstName: '',
      lastName:'',
      phone:''
    }


    if (this.regUser) {
      let nam = this.usersForm.get('name')?.value;
      if (nam == '' || nam == ' ' || nam == null) { this.toastr.error('Помилка в імені !!!'); return }
      if (dupas !=pas ) { this.toastr.error('Помилка в паролі !!!'); return }
      this.signUp(em, pas).then(data => {
        user.email = em;
        user.firstName = nam;
        user.lastName=sename;
        user.phone=phone;
        setDoc(doc(this.afs, 'users', data.user.uid), user);
        this.toastr.success('Успішно зареєстровано !!')
        this.regUser = false;
        this.e_pas.setValidators([]);
      }).catch(e => {
        this.toastr.error(e.code)
      })
    }

    else {
      if (pas == '' || pas == null) { this.toastr.error('Помилка в паролі !!!'); return }

      this.login(em, pas).then(dataUs => {
        docData(doc(this.afs, 'users', dataUs.user.uid)).subscribe(data => {
          this.curUser.role = data!['role'];
          if (this.curUser.role == 'USER') {
            this.curUser.email = data!['email'];
            this.curUser.uid = dataUs.user.uid;
            this.curUser.firstName = data!['firstName'];
            this.curUser.lastName = data!['lastName'];
            this.curUser.phone = data!['phone'];
            localStorage.setItem("curUser", JSON.stringify(this.curUser));
            this.router.navigate(['cabinet']);
            this.userService.userLogon.next(true);
            this.toastr.success('Вітаємо !!')
            this.dialogRef.close();
          }
          else {this.toastr.warning('Щось пішло не так...певно ви не юзер )')}
        })
      }).catch(e => {
        this.toastr.error(e.code)
      })
    }

  }

  get _email() {
    return this.usersForm.get('email')!;
  }

  getErrorMessage() {
    if (this.e_mail.hasError('required')) {
      return 'Ви маєте ввести значення';
    }

    return this.e_mail.hasError('email') ? 'Невірний email' : '';
  }
}
