import { Component, ElementRef, Inject, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ToTrustedHtmlPipe } from '../../../../pipes/html-trusted.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ModuleService } from '../../../../services/moduleservice/module.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LoadingComponent } from '../../../standalones/loading/loading.component';
import { CommonModule } from '@angular/common';

export interface DocumentConfig {
  name: string;
  content: string;
}

@Component({
    selector: 'app-module-preview-modal',
    standalone: true,
    templateUrl: './module-preview-modal.component.html',
    styleUrl: './module-preview-modal.component.scss',
    imports: [MatStepperModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogModule, ToTrustedHtmlPipe, MatCheckboxModule, CommonModule, LoadingComponent]
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
  isLoading: boolean = false

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.service.getDocumentsPrintPreviews(this.data).subscribe({
        next: (res: any[]) => {
          this.docs = res;
          this.checkedDocs = res;

          res.forEach(element => {
            var doc = pdfMake.createPdf(JSON.parse(element.content));
            var f: any | null = document.getElementsByClassName(element.name.replace(/\s/g, "-"));
            var callback = function (url: string) { f[0].setAttribute('src', url + '#toolbar=0'); }
            doc.getDataUrl(callback);
          });
        },
        error: (e: any) => {
          console.log('error getting docs', e);
        }
      });
    }, 1000);
    this.isLoading = false;
  }

  checkDoc(change: MatCheckboxChange, doc: any) {
    if (change.checked) {
      this.checkedDocs.push(doc)
    } else {
      console.log(this.docs)
      var toRemove: number = this.checkedDocs.findIndex(_ => _.id == doc.id);
      this.checkedDocs = this.checkedDocs.splice(toRemove, 1);
      console.log(this.docs)
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  async print() {
    this.dialogRef.close({ success: true, toPrint: this.checkedDocs });
  }
}
