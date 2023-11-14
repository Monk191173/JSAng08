import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUserResponse } from 'src/app/shared/interfaces/users';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {
  public userForm!: FormGroup;
  private Users!: IUserResponse[];

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUsers();
    this.initUsersForm();
  }

  getUsers(): void {
    this.activatedRoute.data.subscribe(({ users }) => {
      this.Users = users;
      this.Users = this.Users.filter((mas) => (mas.email == JSON.parse(localStorage.getItem('curUser') as string).email));
    })
  }

  initUsersForm(): void {
    this.userForm = this.fb.group({
      name: [this.Users[0].name, Validators.required],
      email: [this.Users[0].email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
    ]
    })
  }

  updateUser(): void {
    this.Users[0].name = this.userForm.get('name')?.value;
    this.Users[0].email = this.userForm.get('email')?.value;
    let asUs = this.Users.some(el => (el.email === this.Users[0].email && el.id!=this.Users[0].id));
    if (asUs) alert('Такий email вже зареєстровано !!')
    else {
      localStorage.setItem('curUser', JSON.stringify({ email: this.Users[0].email, role: this.Users[0].role }));
      this.userService.update(this.Users[0], this.Users[0].id).subscribe(() => {
        alert('Змінено !!!')
      });
    }
  }

  get _email(){
    return this.userForm.get('email');
  }

}
