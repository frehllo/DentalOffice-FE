import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { ModuleCardComponent } from "../../../components/standalones/module-card/module-card.component";
import { ModuleService } from '../../../services/moduleservice/module.service';
import { FormlyCommonModule } from '../../../modules/formly-common-module.module';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../components/standalones/loading/loading.component';

@Component({
  selector: 'app-modules-list',
  standalone: true,
  templateUrl: './modules-list.component.html',
  styleUrl: './modules-list.component.scss',
  imports: [MatIconModule, MatButtonModule, ModuleCardComponent, FormlyCommonModule, CommonModule, MatNativeDateModule, LoadingComponent]
})
export class ModulesListComponent implements OnInit {
  personalDataForm: any;
  list: any[] = [];
  isLoading: boolean = false;

  constructor(public dialog: MatDialog, public service: ModuleService) { };

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getList().subscribe({
      next: res => {
        this.list = res as any[];
      },
      error: e => {
        console.log('error getting modules', e);
        this.isLoading = false;
      }
    });
    this.isLoading = true;
    this.service.getConfiguration().subscribe({
      next: (res: any) => {
        this.personalDataForm = res.personalDataForm;
      },
      error: (e: any) => {
        console.log('error getting modules configuration', e);
        this.isLoading = false;
      }
    });
    this.isLoading = false;
  }

  data(): void {
    var fieldsToSend : FormlyFieldConfig[] = [];

    this.personalDataForm.forEach((element : FormlyFieldConfig )=> {
        if(element.fieldGroup) {
          element.fieldGroup.forEach(element => {
            if(element.type != 'section-line'){
              fieldsToSend.push(element);
            }
          });
        }
    });

    const dialogRef = this.dialog.open(DataModalComponent, {
      data: { title: 'Add', fields: fieldsToSend }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.isLoading = true;
        this.service.insert(result.model).subscribe({
          next: r => {
            this.service.getList().subscribe({
              next: res => {
                this.list = res as any[];
              },
              error: e => {
                console.log('error getting modules', e);
                this.isLoading = false;
              }
            });
          },
          error: e => {
            console.log('error getting modules', e);
            this.isLoading = false;
          }
        });
        this.isLoading = false;
      }
    });
  }
}
