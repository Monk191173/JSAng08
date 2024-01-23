import { Component } from '@angular/core';
import { Auth, updateCurrentUser, updateEmail } from '@angular/fire/auth';
import { DocumentData, DocumentSnapshot, Firestore, doc, docData, getDoc, setDoc } from '@angular/fire/firestore';
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
  public User = {
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
    private auth: Auth,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private afs: Firestore
  ) {  }

  ngOnInit() {

    this.getUser();
    this.initUsersForm();

  }

  getUser(): void {

    this.User = JSON.parse(localStorage.getItem('curUser') as string);
    if (!this.User){
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

  async updUser(email: string): Promise<any> {
    // const user = this.auth.currentUser;
    // return await updateEmail(user!, email);
  }

  async loadUser(id:string):Promise<DocumentSnapshot<DocumentData>>{
    const ref=doc(this.afs, "users",id);
    return await getDoc(ref)
  // return await getDocs(query(collection(this.afs, "actions"),where("name","==",id))) //,where("name","==",id)
    }

  initUsersForm(): void {

    this.loadUser(this.User.uid).then(data => {
      this.User.lastName = data.get('lastName');
      this.User.phone = data.get('phone');
      
      this.userForm = this.fb.group({
        name: [this.User.firstName],
        sename: [this.User.lastName],
        phone: [this.User.phone],
        email: [this.User.email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
        ]
      })  

    })


    // docData(doc(this.afs, 'users', this.User.uid)).subscribe(dbUser => {
    //   this.User.lastName = dbUser!['lastName'];
    //   this.User.phone = dbUser!['phone'];

    //   this.userForm = this.fb.group({
    //     name: [this.User.firstName],
    //     sename: [this.User.lastName],
    //     phone: [this.User.phone],
    //     email: [this.User.email, Validators.pattern(/^[\w-\.]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}$/)
    //     ]
    //   })

    // })

  }

  updateUser(): void {
    this.User.firstName = this.userForm.get('name')?.value;
    this.User.email = this.userForm.get('email')?.value;
    this.User.lastName=this.userForm.get('sename')?.value;
    this.User.phone=this.userForm.get('phone')?.value;
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
