import { FormlyFieldConfig } from '@ngx-formly/core';
import { ColDef } from 'ag-grid-community';

export interface Section {
  title: string;
  route: string;
  iconName?: string;
  configuration? : SectionConfiguration,
  subSections?: Section[];
  apiString?: string;
  
}

interface SectionConfiguration {
  tableHeaderFields?: ColDef[];
  formConfiguration? : FormlyFieldConfig[];
  iconName? : string;
}
/* export interface SubSection {
  title: string;
  iconName?: string;
  tableHeaderFields?: ColDef[];
  subSections?: Section[];
  apiString?: string;
} */

//nel server passerò tutte le chiavi della proprietà dell'entità
//per disegnare la tabella
/* export interface ColDef {
  field: string;
  cellRenderer?: Component;
} */
