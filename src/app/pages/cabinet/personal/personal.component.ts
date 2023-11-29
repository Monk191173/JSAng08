import { Component } from '@angular/core';
import { Auth, updateCurrentUser, updateEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { IUserResponse } from 'src/app/shared/interfaces/users';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {
  public userForm!: FormGroup;
  private User = {
    uid: '',
    email: '',
    role: '',
    firstName: ''
  }

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private auth: Auth,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private afs: Firestore
  ) { }

  ngOnInit() {
    this.getUser();
    this.initUsersForm();
  }

  getUser(): void {
    this.User = JSON.parse(localStorage.getItem('curUser') as string);
  }

  async updUser(email: string): Promise<any> {
    const user = this.auth.currentUser;
    return await updateEmail(user!, email);
  }

  initUsersForm(): void {
    this.userForm = this.fb.group({
      name: [this.User.firstName, Validators.required],
      email: [this.User.email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
      ]
    })
  }

  updateUser(): void {
    this.User.firstName = this.userForm.get('name')?.value;
    this.User.email = this.userForm.get('email')?.value;
    this.updUser(this.User.email).then(() => {
      setDoc(doc(this.afs, 'users', this.User.uid), this.User);
      localStorage.setItem('curUser', JSON.stringify(this.User));
      this.toastr.success('Змінено !!!');
    }).catch(e => {
      this.toastr.error(e.code);
    })

  }

  get _email() {
    return this.userForm.get('email');
  }

}
