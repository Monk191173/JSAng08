import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, deleteDoc, doc, docData, getDocs, query, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent {
  public adminActions: Array<IActionResponse> = [];
  public actionForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  // public linkAct:string='';
  private currentActionId = '';
  private tmpAction = {
    name: '',
    description: '',
    filePath: '',
    id: ''
  }

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private afs: Firestore,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }
  initActionForm(): void {
    this.actionForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      filePath: ['', Validators.required]
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          filePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  loadActions(): void {
    this.adminActions = [];
    this.getActions().then(data => {
      data.docs.forEach(doc => {
        this.tmpAction.description = doc.get('description');
        this.tmpAction.filePath = doc.get('filePath');
        this.tmpAction.name = doc.get('name');
        this.tmpAction.id = doc.id;
        this.adminActions.push(this.tmpAction)
        this.tmpAction = {
          name: '',
          description: '',
          filePath: '',
          id: ''
        }
      })
    })
  }

  async getActions(): Promise<QuerySnapshot<DocumentData>> {
    // this.actionService.getAll().subscribe(data => {
    //   this.adminActions = data;
    // })
    const q = query(collection(this.afs, "actions"));
    const data = await getDocs(q);
    return data
  }

  addAction(): void {
    if (this.editStatus) {
      // this.actionService.update(this.actionForm.value, this.currentActionId).subscribe(() => {
      //   this.loadActions();
      // })
      setDoc(doc(this.afs, 'actions', this.currentActionId), this.actionForm.value).then(() => {
        this.loadActions();
      })

    } else {
      // this.actionService.create(this.actionForm.value).subscribe(() => {
      //   this.loadActions();
      // })
      addDoc(collection(this.afs, "actions"), this.actionForm.value).then(() => {
        this.loadActions();
      })

    }
    this.editStatus = false;
    this.actionForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editAction(action: IActionResponse): void {
    this.actionForm.patchValue({
      name: action.name,
      description: action.description,
      filePath: action.filePath
    });
    this.editStatus = true;
    this.currentActionId = action.id;
    this.isUploaded = true;
  }

  deleteAction(action: IActionResponse): void {
    // this.actionService.delete(action.id).subscribe(() => {
    //   this.loadActions();
    // })
    deleteDoc(doc(this.afs, 'actions', action.id)).then(() => {
      this.loadActions();
    })
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('filePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.actionForm.patchValue({
        filePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value;
  }

}
