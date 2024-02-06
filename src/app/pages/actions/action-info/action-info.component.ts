import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/shared/services/actions/action.service';
import { IActionResponse } from 'src/app/shared/interfaces/actions';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {
  public action!: IActionResponse;
  public filePath = '';
  public name = '';
  public description = '';


  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getOneAction();
  }


  getOneAction(): void {
    const ACTION_ID = String(this.activatedRoute.snapshot.paramMap.get('id'));

    this.filePath = '';
    this.name = '';
    this.description = '';

    this.actionService.getOneFirebase(ACTION_ID).subscribe(data => {
      this.action = data;
      this.filePath = this.action.filePath;
      this.name = this.action.name;
      this.description = this.action.description
    })
  }
}
