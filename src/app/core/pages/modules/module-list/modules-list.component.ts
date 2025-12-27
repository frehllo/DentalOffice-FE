import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessario per ngModel
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { ModuleCardComponent } from "../../../components/standalones/module-card/module-card.component";
import { ModuleService } from '../../../services/moduleservice/module.service';
import { FormlyCommonModule } from '../../../modules/formly-common-module.module';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingComponent } from '../../../components/standalones/loading/loading.component';

@Component({
  selector: 'app-modules-list',
  standalone: true,
  templateUrl: './modules-list.component.html',
  styleUrl: './modules-list.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ModuleCardComponent,
    FormlyCommonModule,
    MatNativeDateModule,
    LoadingComponent
  ]
})
export class ModulesListComponent implements OnInit {
  personalDataForm: any;
  list: any[] = [];
  isLoading: boolean = false;

  // Filtri e Paginazione
  filters = {
    filter: '',
    pageIndex: 1,
    perPage: 10
  };
  totalCount: number = 0;

  constructor(public dialog: MatDialog, public service: ModuleService) { };

  ngOnInit(): void {
    this.loadConfiguration();
    this.loadModules();
  }

  // Caricamento dati dal Service
  loadModules(resetPage: boolean = false, deleteFilters: boolean = false): void {
    if (resetPage) {
      this.filters.pageIndex = 1;
    }

    if(deleteFilters) {
      this.filters.filter = '';
      this.filters.pageIndex = 1;
      this.filters.perPage = 10;
    }

    this.isLoading = true;
    this.service.getList(this.filters).subscribe({
      next: (res: any) => {
        // Supporta sia il ritorno di una lista semplice che l'oggetto ModuleListModel
        this.list = res.modules || res;
        this.totalCount = res.modules.length || 0;
        this.isLoading = false;
      },
      error: e => {
        console.error('error getting modules', e);
        this.isLoading = false;
      }
    });
  }

  loadConfiguration(): void {
    this.service.getConfiguration().subscribe({
      next: (res: any) => {
        this.personalDataForm = res.personalDataForm;
      },
      error: (e: any) => {
        console.error('error getting modules configuration', e);
      }
    });
  }

  // Gestione Paginazione
  onPageChange(event: PageEvent): void {
    this.filters.pageIndex = event.pageIndex + 1;
    this.filters.perPage = event.pageSize;
    this.loadModules();
  }

  // Logica aggiunta nuovo modulo
  data(): void {
    if (!this.personalDataForm) return;

    const fieldsToSend: FormlyFieldConfig[] = [];
    this.personalDataForm.forEach((element: FormlyFieldConfig) => {
      if (element.fieldGroup) {
        element.fieldGroup.forEach(field => {
          if (field.type !== 'section-line') {
            fieldsToSend.push(field);
          }
        });
      }
    });

    const dialogRef = this.dialog.open(DataModalComponent, {
      data: { title: 'Add', fields: fieldsToSend }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.success) {
        this.isLoading = true;
        this.service.insert(result.model).subscribe({
          next: () => this.loadModules(true),
          error: e => {
            console.error('error inserting module', e);
            this.isLoading = false;
          }
        });
      }
    });
  }
}