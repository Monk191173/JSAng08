import { Component } from '@angular/core';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, Firestore, QuerySnapshot, collection, doc, docData, getDocs, getFirestore, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public curActions: Array<IActionResponse> = [];
  private tmpAction = {
    name: '',
    description: '',
    filePath: '',
    id: ''
  }

  constructor(
    private actionService: ActionService,
    private route: ActivatedRoute,
    private afs: Firestore
  ) { }

  ngOnInit() {
    this.loadActions().then(data => {
      data.docs.forEach(doc => {
        this.tmpAction.description = doc.get('description');
        this.tmpAction.filePath = doc.get('filePath');
        this.tmpAction.name = doc.get('name');
        this.tmpAction.id = doc.id;
        this.curActions.push(this.tmpAction)
        this.tmpAction = {
          name: '',
          description: '',
          filePath: '',
          id: ''
        }
      })
    })
  }

  async loadActions(): Promise<QuerySnapshot<DocumentData>> {
    // this.actionService.getAll().subscribe(data => {
    //   this.curActions = data;
    // })


    // this.route.data.subscribe(({action})=>{
    //   this.curActions =action
    // })

    const q = query(collection(this.afs, "actions"));
    const data = await getDocs(q);
    return data
  }

  seeMoreAction(Id: number): void {
    this.actionService.curActionId = Id;
  }


}
