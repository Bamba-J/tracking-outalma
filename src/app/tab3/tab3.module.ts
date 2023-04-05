import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagePageModule } from '../Modal/message/message.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    NgbModule,
    FormsModule,
    MessagePageModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {


}
