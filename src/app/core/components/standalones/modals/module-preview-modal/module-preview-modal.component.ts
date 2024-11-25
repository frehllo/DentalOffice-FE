import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, ElementRef, Inject, OnInit, ViewChild, SimpleChange } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export interface DocumentConfig {
  name: string;
  content: string;
}

@Component({
  selector: 'app-module-preview-modal',
  standalone: true,
  templateUrl: './module-preview-modal.component.html',
  styleUrl: './module-preview-modal.component.scss',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatStepperModule, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogModule, ToTrustedHtmlPipe, MatCheckboxModule, CommonModule, LoadingComponent]
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
          this.docs = this.docs.map(doc => ({
            ...doc,
            copyCount: doc.copyCount ?? 1, // Imposta 1 se è null o undefined
          }));
          this.checkedDocs = [...res];

          res.forEach(element => {
            var doc = pdfMake.createPdf(JSON.parse(element.content));
            var f: any | null = document.getElementsByClassName(element.name.replace(/\s/g, "-"));
            var callback = function (url: string) { f[0].setAttribute('src', url + '#toolbar=0'); }
            doc.getDataUrl(callback);
            this.isLoading = false;
          });
        },
        error: (e: any) => {
          console.log('error getting docs', e);
          this.isLoading = false;
        }
      });
    }, 1000);
  }

  checkDoc(change: MatCheckboxChange, doc: any) {
    if (change.checked) {
      if (!this.checkedDocs.find(d => d.id === doc.id)) {
        this.checkedDocs.push(doc);
      }
    } else {
      const index = this.checkedDocs.findIndex(d => d.id === doc.id);
      if (index !== -1) {
        this.checkedDocs.splice(index, 1);
      }
    }
  }

  changeDocCount(change: SimpleChange, docId: number) {
    const docIndex = this.checkedDocs.findIndex(doc => doc.id === docId);

    // Verifica se il documento esiste
    if (docIndex !== -1) {
      // Aggiorna la proprietà "copyCount" con il nuovo valore
      this.checkedDocs[docIndex].copyCount = change ?? 0;

      // Debug: Log per conferma
      console.log('Updated Document:', this.docs[docIndex]);
    } else {
      console.error(`Documento con id ${docId} non trovato.`);
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  async print() {
    this.dialogRef.close({ success: true, toPrint: this.checkedDocs });
  }
}
