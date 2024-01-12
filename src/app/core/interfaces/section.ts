export interface Section {
  title: string;
  route: string;
  iconName: string;
  tableHeaderFields?: TableHeaderField[];
}

export interface SubSection {
  title: string;
  tableHeaderFields: TableHeaderField[];
}

export interface TableHeaderField {
  field: string;
}
