import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  constructor(public router : Router) { }

  goToForm1()
  {
    console.log("demande 1");
    this.router.navigate(['form1']);
  }
  goToForm2()
  {
    console.log("demande 2");
    this.router.navigate(['form2']);
  }
  goToForm3()
  {
    console.log("demande 3");
    this.router.navigate(['form3']);
  }



  ngOnInit() {
  }

}
