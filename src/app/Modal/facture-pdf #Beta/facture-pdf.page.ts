import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-facture-pdf',
  templateUrl: './facture-pdf.page.html',
  styleUrls: ['./facture-pdf.page.scss'],
})
export class FacturePDFPage implements OnInit {

  constructor() { }

  

  ngOnInit() {
  require('../../dllForPDF/basic.js')
  require('../../dllForPDF/jquery-1.7.1.min.js')
  require('../../dllForPDF/jspdf.debug.js')
  require('../../dllForPDF/jquery-ui-1.8.17.custom.min.js')

  }

}
