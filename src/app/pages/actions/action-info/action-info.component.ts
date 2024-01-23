import { Component } from '@angular/core';
// import { IActionResponse } from 'src/app/shared/interfaces/actions';
// import { ActionService } from 'src/app/shared/services/actions/action.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, DocumentSnapshot, Firestore, QuerySnapshot, collection, doc, docData, getDoc, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {
  // public action!: IActionResponse;
  public filePath='';
  public name='';
  public description='';
  

  constructor(
    // private actionService: ActionService,
    public afs: Firestore,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.getOneAction(); 
  }

 async loadAction(id:string):Promise<DocumentSnapshot<DocumentData>>{
  const ref=doc(this.afs, "actions",id);
  return await getDoc(ref)
// return await getDocs(query(collection(this.afs, "actions"),where("name","==",id))) //,where("name","==",id)
  }


  getOneAction(): void {
    const ACTION_ID = String(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(ACTION_ID);
    this.filePath='';
    this.name='';
    this.description='';
    this.loadAction(ACTION_ID).then(data => {
      // data.docs.forEach(doc => {
        
        this.description = data.get('description');
        this.filePath = data.get('filePath');
        this.name = data.get('name');
      // })
    })


// docData(doc(this.afs,'actions',ACTION_ID)).subscribe(data=>{
//   this.filePath=data!['filePath'];
//   this.name=data!['name'];
//   this.description=data!['description']
// })


    // this.actionService.getOne(ACTION_ID).subscribe(data => {
    //   this.action = data;
    //   this.filePath=this.action.filePath;
    //   this.name=this.action.name;
    //   this.description=this.action.description
    // })
  }
}
