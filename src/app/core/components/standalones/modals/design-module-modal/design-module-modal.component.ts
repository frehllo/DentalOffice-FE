import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { Designer } from '@pdfme/ui';
import { ModuleService } from '../../../../services/moduleservice/module.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormlyCommonModule } from '../../../../modules/formly-common-module.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-design-module-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule, FormlyCommonModule, MatIconModule, MatNativeDateModule],
  template: `<div style="width: 1000px;" class="h-100"><div #designerContainer></div><button (click)="generatePdf()">Genera PDF</button></div>`,
  styleUrl: './design-module-modal.component.scss'
})
export class DesignModuleModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DesignModuleModalComponent>,
    public moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  @ViewChild('designerContainer', { static: true }) designerContainer!: ElementRef;
  designer!: Designer;
  template!: Template;

  ngAfterViewInit(): void {
    this.template = {
      schemas: [], // Puoi aggiungere qui gli schemi dinamici
      basePdf: '', // Verrà impostato dal file PDF caricato
    };

    // Carica il file PDF dalla directory locale
    this.http.get('../../../../../../assets/base.pdf', { responseType: 'arraybuffer' }).subscribe(
      (pdfData) => {
        this.template.basePdf = pdfData;  // Imposta il file PDF come basePdf
        this.designer = new Designer({
          domContainer: this.designerContainer.nativeElement,
          template: this.template,
        });
      },
      (error) => {
        console.error('Errore durante il caricamento del PDF:', error);
      }
    );
  }

  generatePdf(): void {
    // Ottieni il template generato dal designer
    const generatedTemplate = this.designer.getTemplate();

    // Puoi modificare i dati di input come necessario o passare dati dinamici
    const inputs : any = {};

    // Genera il PDF utilizzando il template creato
    generate({ template: generatedTemplate, inputs }).then((pdf) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  }

}
