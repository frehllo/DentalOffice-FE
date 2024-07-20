import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions
} from '@ngx-formly/core';
import { ModuleService } from '../../../services/moduleservice/module.service';
import { DotMenuComponent } from '../../../components/standalones/dot-menu/dot-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AGActionIconComponent } from '../../../components/ag/ag-action-icon/ag-action-icon.component';
import { ConfirmModalComponent } from '../../../components/standalones/modals/confirm-modal/confirm-modal.component';
import { FormlyCommonModule } from '../../../modules/formly-common-module.module';
import { ModulePreviewModalComponent } from '../../../components/standalones/modals/module-preview-modal/module-preview-modal.component';
import { LoadingComponent } from '../../../components/standalones/loading/loading.component';
import * as moment from 'moment';
import { AGColoredCircle } from '../../../components/ag/ag-colored-circle/ag-colored-circle.component';
import { AGType } from '../../../components/ag/AGType';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-write-module',
  standalone: true,
  templateUrl: './write-module.component.html',
  styleUrl: './write-module.component.scss',
  imports: [
    AgGridModule,
    FormlyCommonModule,
    DotMenuComponent,
    MatButtonModule,
    MatIconModule,
    AGActionIconComponent,
    LoadingComponent
  ],
})
export class WriteModuleComponent implements OnInit {
  constructor(private service: ModuleService, public dialog: MatDialog) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  personalDataForm = new FormGroup({});
  processesForm = new FormGroup({});
  title: string = 'NO TITLE';
  model: any = {};
  personalDataFields: FormlyFieldConfig[] = [];
  processesFields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  gridApi: any | null = null;
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  isLoading: boolean = false;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  actionHeaders: ColDef[] = [
    {
      field: 'Edit',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'edit',
      },
      onCellClicked: (event) => this.openProcess(event),
      resizable: false,
    },
    {
      field: 'Delete',
      cellRenderer: /* eval(" */AGActionIconComponent/* ") */, //CAUTION - Da tenere a mente questo codice!!!!!!!!
      cellRendererParams: {
        iconName: 'delete',
      },
      onCellClicked: (event) => this.deleteProcess(event),
      resizable: false
    },
  ];

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      const moduleId = history.state.id;
      this.service.getConfiguration().subscribe({
        next: (res: any) => {
          this.personalDataFields = res.personalDataForm;
          this.processesFields = res.processesForm;
          this.colDefs =
            res.grid.map((_: any) => ({
              field: _.field,
              cellRenderer: _.cellRenderer == AGType[0] ? AGColoredCircle : null,
            })) ?? [];

          this.actionHeaders.forEach(element => {
            this.colDefs.push(element)
          });
        },
        error: (e: any) => {
          console.log('error getting modules configuration', e);
          this.isLoading = false;
        }
      });

      this.service.get(moduleId).subscribe({
        next: (res: any) => {
          this.model = res;

          if (res.deliveryDate != null) {
            this.model.deliveryDate = moment.utc(res.deliveryDate).local().format('YYYY-MM-DD');
          }

          if (res.prescriptionDate != null) {
            this.model.prescriptionDate = moment.utc(res.prescriptionDate).local().format('YYYY-MM-DD');
          }

          this.rowData = res.processes;
        },
        error: (e: any) => {
          console.log('error getting module', e);
          this.isLoading = false;
        }
      })

      this.setAction();
    }, 500)

    this.isLoading = false;
  }

  setAction() {
    this.actionHeaders.forEach((element: ColDef) => {
      this.colDefs.push(element);
    });
  }

  save() {
    this.isLoading = true;

    this.personalDataForm.markAllAsTouched();

    if (this.personalDataForm.valid) {
      const moduleId = history.state.id;

      var module: any = this.model;
      var processToSave: any[] = this.rowData;
      processToSave.forEach((element: any) => {
        element.color = null;
        element.dentinMaterial = null;
        element.metalMaterial = null;
        element.moduleId = moduleId;
      });

      module["processes"] = processToSave;

      this.service.update(moduleId, module).subscribe({
        next: (res: any) => {
          this.model = res;
        },
        error: (e: any) => {
          console.log('error saving module', e);
          this.isLoading = false;
        }
      });
    }

    this.isLoading = false;
  }

  reset() {
    this.model = null;
    if (this.model != null) {
      this.personalDataForm.reset();
    }
  }

  print() {
    //TODO DA CAPIPRE COME SALVARE CORRETTAMENTE I PROCESSES
    //this.save();
    if (this.personalDataForm.valid) {
      const dialogPreviewRef = this.dialog.open(ModulePreviewModalComponent, {
        data: this.model['id']
      });
      dialogPreviewRef.afterClosed().subscribe((result: any) => {
        if (result && result.success && result.toPrint) {

          console.log("data", result.toPrint)

          var doc = pdfMake.createPdf();

          result.ToPrint.forEach(element => {
            
          });

          /* var wrapper = document.createElement('div');
          wrapper.style.width = "100%";
          wrapper.style.height = "100%";
          wrapper.innerHTML = result.toPrint[0].content;

          html2canvas(wrapper), ({
            onrender: (canvas: any) => {
              console.log("canvas",canvas)
              const contentDataURL: string = canvas.toDataURL('image/png')
              let pdf = new jsPDF()
              pdf.addImage(contentDataURL, "PNG", 0, 0, 100, 100, "MEDIUM", "MEDIUM", 0)
              pdf.save('form.pdf')
            }
          }); */

          /* html2canvas(result.toPrint[0].content).then(function (canvas: any) {
            const contentDataURL: string = canvas.toDataURL('image/png')
            let pdf = new jsPDF()
            pdf.addImage(contentDataURL, "PNG", 0, 0, 100, 100, "MEDIUM", "MEDIUM", 0)
            pdf.save('form.pdf')
          }); */

          /* console.log('toPrint', result.toPrint)

          var wrapper = document.createElement('div');
          wrapper.style.width = "100%";
          wrapper.style.height = "100%";
          wrapper.innerHTML = result.toPrint[0].content;
          var div = wrapper.firstChild as HTMLElement;

          doc.html(div, {
            callback: function (doc) {
              doc.save('a.pdf')
            }
          }); */

          /* doc.html(result.toPrint[0].content, {
            callback: function (doc) {
              doc.save('tableToPdf.pdf');
            } */

          /* result.toPrint.forEach((element : any) => {
            console.log('aoooo')
            doc.addPage('a5', 'p');
            doc.html(element.content, {
              callback: function (doc) {
                doc.save('tableToPdf.pdf');
              }
           })
          }); */
        }
      });
    }
  }

  openProcess(event?: any) {
    const dialogRef = this.dialog.open(DataModalComponent, {
      data:
      {
        title: event != null ? 'Edit' : 'Add',
        fields: this.processesFields,
        model: event != null ? event.data : null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.isLoading = true;
      if (result && result.success == true && result.model != null && event == null) {
        const moduleId = history.state.id;
        result.model['moduleId'] = moduleId;
        this.service.addProcess(result.model).subscribe({
          next: (res: any) => {
            this.rowData.push(res);
            this.gridApi.updateGridOptions({ rowData: this.rowData });
          },
          error: (e: any) => {
            console.log('error adding process', e);
            this.isLoading = false;
          }
        });
      } else if (result && result.success == true && result.model != null && event != null && event['data'] != null && event['data']['id'] != null) {
        this.service.updateProcess(event['data']['id'], result.model).subscribe({
          next: (res: any) => {
            var toEditIndex: number = this.rowData.findIndex(e => e['id'] == event['id'])

            if (toEditIndex > -1) {
              this.rowData[toEditIndex] = res;
              this.gridApi.updateGridOptions({ rowData: this.rowData });
            }
          },
          error: (e: any) => {
            console.log('error saving process', e);
            this.isLoading = false;
          }
        });
      }

      this.isLoading = false;
    });
  }

  deleteProcess(event: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Delete?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.isLoading = true;
      if (result == true && event.data != null && event.data["id"] != null) {
        var i: number = -1;

        if (event.data['id'] != null) {
          i = this.rowData!.findIndex(item => item.id == event.data["id"]);
          this.service.removeProcess(event.data['id']).subscribe();
        }

        if (i > -1) {
          const newArray = this.rowData!.slice(0, i).concat(this.rowData!.slice(i + 1));
          this.rowData = newArray;

          this.gridApi.updateGridOptions({ rowData: this.rowData });
        }
      }
      this.isLoading = false;
    });
  }
}
