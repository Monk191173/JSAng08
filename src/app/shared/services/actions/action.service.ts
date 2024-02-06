import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActionRequest, IActionResponse } from '../../interfaces/actions';
import { 
  CollectionReference,
  DocumentReference, 
  Firestore, 
  addDoc, 
  collectionData,
  deleteDoc, 
  doc, 
  collection,
  DocumentData, 
  docData,
  setDoc 
} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public curActionId: number = -1;
  public actionsColection!: CollectionReference<DocumentData>

  constructor(
    public afs: Firestore
  ) {
    this.actionsColection = collection(afs, 'actions');
  }


  //---------------------------------------------------------------------
  getAllFirebase() {
    return collectionData(this.actionsColection, { idField: 'id' })
  }

  createFirebase(action: IActionRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.actionsColection, action)
  }

  updateFirebase(category: IActionRequest, id: string) {
    const actRef = doc(this.afs, `actions/${id}`);
    return setDoc(actRef, category)
  }

  deleteFirebase(id: string) {
    const actRef = doc(this.afs, `actions/${id}`);
    return deleteDoc(actRef);
  }

  getOneFirebase(id: string): Observable<IActionResponse> {
    const actRef = doc(this.afs, `actions/${id}`);
    return docData(actRef, { idField: 'id' }) as Observable<IActionResponse>
  }

  //---------------------------------------------------------------------
}
