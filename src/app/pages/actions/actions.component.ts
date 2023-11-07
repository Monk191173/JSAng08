import { Component } from '@angular/core';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public curActions: Array<IActionResponse> = [];
  constructor(
    private actionService: ActionService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadActions();
  }

  loadActions(): void {
    // this.actionService.getAll().subscribe(data => {
    //   this.curActions = data;
  // })
    this.route.data.subscribe(({action})=>{
      this.curActions =action
    })
    
  }

  seeMoreAction(Id: number): void {
    this.actionService.curActionId = Id;

  }


}
