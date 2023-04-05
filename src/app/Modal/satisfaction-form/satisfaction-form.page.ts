import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.page.html',
  styleUrls: ['./satisfaction-form.page.scss'],
})
export class SatisfactionFormPage implements OnInit {
  constructor(public config: NgbRatingConfig) { }
  
  currentRate1 = 3;
  currentRate2 = 3;
  currentRate3 = 3;
  currentRate4 = 3;
  currentRate5 = 3;
  currentRate6 = 3;
  currentRate7 = 3;
  currentRate8 = 3;

  question = [
    { question: 'Question 1', reponse:this.currentRate1},
    { question: 'Question 2', reponse:this.currentRate2},
    { question: 'Question 3',reponse:this.currentRate3},
    { question: 'Question 4',reponse:this.currentRate4},
    { question: 'Question 5',reponse:this.currentRate5},
    { question: 'Question 6',reponse:this.currentRate6},
    { question: 'Question 7',reponse:this.currentRate7},
    { question: 'Question 8',reponse:this.currentRate8},
  ];






  

  Send(){
   console.log(this.question) 
  }

  ngOnInit() {
    this.config.max=5
    var date = new Date()
    console.log(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear())
  }

}
