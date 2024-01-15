export interface Section {
  title: string;
  route: string;
  iconName?: string;
  tableHeaderFields?: TableHeaderField[];
  subSections?: SubSection[];
  apiString?: string;
}

export interface SubSection {
  title: string;
  iconName?: string;
  tableHeaderFields?: TableHeaderField[];
  subSections?: Section[];
  apiString?: string;
}

//nel server passerò tutte le chiavi della proprietà dell'entità
//per disegnare la tabella
export interface TableHeaderField {
  field: string;
}
