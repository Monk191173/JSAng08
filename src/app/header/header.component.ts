import { Component } from '@angular/core';
import { Storage,ref,getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public linkAct='';
  constructor(private storage: Storage){ 
    const refAct=ref(this.storage,'images/actions.svg');
    
    getDownloadURL(refAct).then(data=>this.linkAct=data);
  }

}
