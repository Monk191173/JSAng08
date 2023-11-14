import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRequest, IUserResponse } from 'src/app/shared/interfaces/users';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public passForm!: FormGroup;
  private Users!: IUserResponse[];
  private curUser!: IUserRequest;
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUsers();
    this.initPassForm();
  }

  getUsers(): void {
    this.userService.getAll().subscribe(data => {
      this.Users = data
    });
  }

  initPassForm(): void {
    this.passForm = this.fb.group({
      oldPass: [null, Validators.required],
      newPass: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  signIn():void{
    let oldPas=this.passForm.get('oldPass')?.value;
    let curUser=this.Users.filter(us=>us.email==JSON.parse(localStorage.getItem('curUser') as string).email);
    if(curUser[0].password!=oldPas||oldPas==''||oldPas==null){alert('Введено некоректні дані. Помилка в старому паролі !!!!'); return}
    
    let newPas=this.passForm.get('newPass')?.value;
    let pass=this.passForm.get('password')?.value;
    if (pass!=newPas||newPas==''||pass==''||newPas==null||pass==null){alert('Введено некоректні дані. Помилка в новому паролі !!!!'); return}

    curUser[0].password=newPas;
    this.userService.update(curUser[0],curUser[0].id).subscribe(()=>{
      alert('Успішно змінено !!!');
      this.router.navigate(['login'])
    });
  }
}
