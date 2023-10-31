import { Component } from '@angular/core';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public curActions: Array<IActionResponse> = [];
  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.loadActions();
  }

  loadActions(): void {
    this.actionService.getAll().subscribe(data => {
      this.curActions = data;
    })
  }

  seeMoreAction(Id: number): void {
    this.actionService.curActionId = Id;

  }


}