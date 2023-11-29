import { Component } from '@angular/core';
import { IActionResponse } from 'src/app/shared/interfaces/actions';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {
  public action!: IActionResponse;
  public filePath='';
  public name='';
  public description='';
  

  constructor(
    private actionService: ActionService,
    private afs: Firestore,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getOneAction(); 
  }

  getOneAction(): void {
    const ACTION_ID = String(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(ACTION_ID);
    
docData(doc(this.afs,'actions',ACTION_ID)).subscribe(data=>{
  this.filePath=data!['filePath'];
  this.name=data!['name'];
  this.description=data!['description']
})
    // this.actionService.getOne(ACTION_ID).subscribe(data => {
    //   this.action = data;
    //   this.filePath=this.action.filePath;
    //   this.name=this.action.name;
    //   this.description=this.action.description
    // })
  }
}
