import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUserPersonal } from 'src/app/shared/interfaces/users';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {
  public userForm!: FormGroup;
  public User: IUserPersonal = {
    uid: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    phone: ''
  }

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getUserLocal();
    this.initUsersForm();
  }

  getUserLocal(): void {
    this.User = JSON.parse(localStorage.getItem('curUser') as string);

    if (!this.User) {
      this.User = {
        uid: '',
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        phone: ''
      }
    }

    this.userForm = this.fb.group({
      name: [this.User.firstName],
      sename: [this.User.lastName],
      phone: [this.User.phone],
      email: [this.User.email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
      ]
    })

  }


  initUsersForm(): void {

    this.userService.getOneFirebase(this.User.uid).subscribe(data => {
      this.User.lastName = data.lastName;
      this.User.phone = data.phone;

      this.userForm = this.fb.group({
        name: [this.User.firstName],
        sename: [this.User.lastName],
        phone: [this.User.phone],
        email: [this.User.email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
        ]
      })

    })


  }

  updateUser(): void {
    this.User.firstName = this.userForm.get('name')?.value;
    this.User.email = this.userForm.get('email')?.value;
    this.User.lastName = this.userForm.get('sename')?.value;
    this.User.phone = this.userForm.get('phone')?.value;
    this.userService.updateFirestore(this.User, this.User.uid).then(() => {
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
