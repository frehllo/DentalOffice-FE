import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ToTrustedHtmlPipe } from '../../../../pipes/html-trusted.pipe';
import { MatButtonModule } from '@angular/material/button';
/* import { PdfViewerModule } from 'ng2-pdf-viewer'; */
/* import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; */

export interface DocumentConfig {
  name: string;
  content: string;
}

@Component({
  selector: 'app-module-preview-modal',
  standalone: true,
  imports: [MatStepperModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogModule, ToTrustedHtmlPipe/* , PdfViewerModule */],
  templateUrl: './module-preview-modal.component.html',
  styleUrl: './module-preview-modal.component.scss'
})
export class ModulePreviewModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  modules: DocumentConfig[] | null = null;
  pdfs: any[] = [];

  ngOnInit() {
    //have to come from service
    this.modules = [
      {
        name: "module1",
        content: "<h1>Ciao</h1>"
      }
    ]

    /* this.modules.forEach(e => {
      var pdfContent = {
        name: e.name,
        src: "../../../../pdfs/" + e.name + ".pdf"
      }

      this.pdfs.push(pdfContent) */

      /* this.generatePdf(e.content, pdfContent.src) */

      /* htmlPDF.convertHTMLString(e.content, "../../../../pdfs/" + e.name + ".pdf",
        function (error : any, success : any) {
          if (error) {
            console.log('Oh noes! Errorz!');
            console.log(error);
          } else {
            console.log('Woot! Success!');
            console.log(success);
          }
        }
      ); *//* 
    }); */
  }

  generatePdf(content : string, path : string) {
    /* var dom : HTMLElement | any  = document.createElement('div');
	  dom.innerHTML = content; */
    /* var dom : HTMLElement | any = document.getElementById('toPrint');
    html2canvas(dom, {scale : 2}).then((canvas : any) => {
      console.log('save')
      const pdf = new jsPDF();
      pdf.save(path);
    }).catch((e : any) => {
      console.log('errorZZZZZ', e)
    }); */
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  print(): any {
    this.dialogRef.close(true);
  }
}
