import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ColoredCircleComponent } from '../../../../components/standalones/colored-circle/colored-circle.component';

@Component({
  selector: 'app-dental-studios',
  standalone: true,
  imports: [ AgGridModule, ColoredCircleComponent],
  templateUrl: './dental-studios.component.html',
  styleUrl: './dental-studios.component.scss',
})
export class DentalStudiosComponent implements OnInit {
  
  colDefs : ColDef[] = [];

  rowData: any = [
    {
      mission: 'Voyager',
      company: 'NASA',
      location: 'Cape Canaveral',
      date: '1977-09-05',
      rocket: 'Titan-Centaur ',
      price: 86580000,
      successful: true,
    },
    {
      mission: 'Apollo 13',
      company: 'NASA',
      location: 'Kennedy Space Center',
      date: '1970-04-11',
      rocket: 'Saturn V',
      price: 3750000,
      successful: false,
    },
    {
      mission: 'Falcon 9',
      company: 'SpaceX',
      location: 'Cape Canaveral',
      date: '2015-12-22',
      rocket: 'Falcon 9',
      price: 9750000,
      successful: true,
    },
  ];

  ngOnInit() {
    //GET DATA FROM SERVICE
    this.colDefs = [
      { field: 'mission' },
      { field: 'company' },
      { field: 'location' },
      { field: 'date' },
      { field: 'price' },
      { field: 'successful' },
      { field: 'rocket' },
    ]; 
  }

  

  
}
