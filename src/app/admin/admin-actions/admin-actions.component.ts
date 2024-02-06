import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';


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
  private currentActionId = '';

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
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
    this.actionService.getAllFirebase().subscribe(data => {
      this.adminActions = data as IActionResponse[];
    })
  }


  addAction(): void {
    if (this.editStatus) {
      this.actionService.updateFirebase(this.actionForm.value, this.currentActionId).then(() => {
        this.loadActions();
      })

    } else {
      this.actionService.createFirebase(this.actionForm.value).then(() => {
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
    this.actionService.deleteFirebase(action.id).then(() => {
      this.loadActions();
    })
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('filePath'));
    if (!task) this.isUploaded = false;
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
