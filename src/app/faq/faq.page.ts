import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  public question = [
    {
      titre: 'Question 1',
      texte: 'Ma reponse 1 Ma reponse 1 Ma reponse 1 Ma reponse 1 Ma reponse 1 Ma reponse 1 ',
    },
    {
      titre: 'Question 2',
      texte: 'Ma reponse 2 Ma reponse 2 Ma reponse 2 Ma reponse 2 Ma reponse 2 Ma reponse 2 Ma reponse 2 Ma reponse 2 ',
    },
    {
      titre: 'Question 3',
      texte: 'Ma reponse 3 Ma reponse 3 Ma reponse 3 Ma reponse 3 Ma reponse 3 Ma reponse 3 Ma reponse 3 ',
    },
    {
      titre: 'Question 4',
      texte: 'Ma reponse 4 Ma reponse 4 Ma reponse 4 Ma reponse 4 Ma reponse 4 Ma reponse 4 Ma reponse 4 Ma reponse 4 ',
    },
    {
      titre: 'Question 5',
      texte: 'Ma reponse 5 Ma reponse 5 Ma reponse 5 Ma reponse 5 Ma reponse 5 Ma reponse 5 Ma reponse 5 Ma reponse 5 ',
    },
    {
      titre: 'Question 6',
      texte: 'Ma reponse 6 Ma reponse 6 Ma reponse 6 Ma reponse 6 Ma reponse 6 Ma reponse 6 Ma reponse 6 Ma reponse 6 ',
    },
    {
      titre: 'Question 7',
      texte: 'Ma reponse 7 Ma reponse 7 Ma reponse 7 Ma reponse 7 Ma reponse 7 Ma reponse 7 Ma reponse 7 Ma reponse 7 ',
    },
    {
      titre: 'Question 8',
      texte: 'Ma reponse 8 Ma reponse 8 Ma reponse 8 Ma reponse 8 Ma reponse 8 Ma reponse 8 Ma reponse 8 Ma reponse 8 ',
    },

  ];

  
  constructor() { }

  ngOnInit() {
  }
}
