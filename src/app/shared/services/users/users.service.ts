import { Injectable } from '@angular/core';
import { IUserPersonal, IUserRequest } from '../../interfaces/users';
import { Observable, Subject } from 'rxjs';
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userLogon = new Subject<boolean>();
  private usersColection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) {
    this.usersColection = collection(afs, 'users');
  }


  getAllFirestore() {
    return collectionData(this.usersColection, { idField: 'id' })
  }

  createFirestore(user: IUserRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.usersColection, user)
  }

  updateFirestore(user: IUserPersonal, id: string) {
    const usRef = doc(this.afs, `users/${id}`);
    return setDoc(usRef, user)
  }

  getOneFirebase(id: string): Observable<IUserPersonal> {
    const usRef = doc(this.afs, `users/${id}`);
    return docData(usRef, { idField: 'uid' }) as Observable<IUserPersonal>
  }

}
