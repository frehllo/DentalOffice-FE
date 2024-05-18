import { Component, ElementRef, Inject, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ToTrustedHtmlPipe } from '../../../../pipes/html-trusted.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ModuleService } from '../../../../services/moduleservice/module.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import * as content from '../../../../../../../a.json'
/* import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfDocument } from '@ironsoftware/ironpdf'; */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export interface DocumentConfig {
  name: string;
  content: string;
}

@Component({
  selector: 'app-module-preview-modal',
  standalone: true,
  imports: [MatStepperModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogModule, ToTrustedHtmlPipe, MatCheckboxModule],
  templateUrl: './module-preview-modal.component.html',
  styleUrl: './module-preview-modal.component.scss'
})
export class ModulePreviewModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataModalComponent>,
    public service: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  @ViewChild('toPrintContent') toPrintContent!: ElementRef;

  docs: any[] = [];
  pdfs: any[] = [];
  checkedDocs: any[] = [];

  ngOnInit() {
    this.service.getDocumentsPrintPreviews(this.data).subscribe({
      next: (res: any[]) => {
        this.docs = res;
        this.checkedDocs = res;

        res.forEach(element => {
          var doc = pdfMake.createPdf(JSON.parse(element.content));
          //var doc = pdfMake.createPdf(content as any);
          var f: any | null = document.getElementsByClassName(element.name.replace(/\s/g, "-"));
          console.log(f)
          var callback = function (url: string) { f[0].setAttribute('src', url+'#toolbar=0');console.log(url); }
          doc.getDataUrl(callback);
        });
      },
      error: (e: any) => {
        console.log('error getting docs', e);
      }
    });


  }

  checkDoc(change: MatCheckboxChange, doc: any) {
    if (change.checked) {
      this.checkedDocs.push(doc)
    } else {
      var toRemove: number = this.checkedDocs.findIndex(_ => _.id == doc.id);
      this.checkedDocs = this.checkedDocs.splice(toRemove, 1);
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  async print() {
    pdfMake.createPdf(JSON.parse(this.docs[0].content)).open();

    /* var wrapper = document.getElementById('toPrint') as HTMLElement;
    wrapper.style.backgroundColor = "transparent";
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center"; */

    /* html2canvas(wrapper, {backgroundColor : null}).then(function (canvas) {
      console.log("canvas", canvas)
      const contentDataURL: string = canvas.toDataURL("", "high")
      let pdf = new jsPDF()
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, "PNG", 0, 0, width, height, "", "NONE", 0)
      pdf.save('form.pdf')
    }); */

    /* html2canvas(wrapper), ({
      onclone: (canvas: any) => {
        console.log("canvas", canvas)
        const contentDataURL: string = canvas.toDataURL('image/png')
        let pdf = new jsPDF()
        pdf.addImage(contentDataURL, "PNG", 0, 0, 100, 100, "MEDIUM", "MEDIUM", 0)
        pdf.save('form.pdf')
      }
    }); */

    //this.dialogRef.close({ success: true, toPrint: this.checkedDocs });
  }
}
