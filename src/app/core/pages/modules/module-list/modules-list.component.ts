import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DataModalComponent } from '../../../components/standalones/modals/data-modal/data-modal.component';
import { ModuleCardComponent } from "../../../components/standalones/module-card/module-card.component";

@Component({
  selector: 'app-modules-list',
  standalone: true,
  templateUrl: './modules-list.component.html',
  styleUrl: './modules-list.component.scss',
  imports: [MatIconModule, MatButtonModule, ModuleCardComponent]
})
export class ModulesListComponent implements OnInit {
  list: any[] = [];

  constructor(public dialog: MatDialog) { };

  ngOnInit(): void {
    //get the list from service
    for (let i = 0; i < 25; i++) {
      this.list.push(
        {
          id: 1,
          clientName: 'Luca Lombardo',
          prescriptionDate: '12/01/2024',
          deliveryDate: '23/02/2024',
          dentalStudioId: 1,
          dentalStudio: {
            name: "Studio 1",
            color: 'red'
          },
          description: '1 Elemento in metalceramica su 46 +1 elemento in metalceramica su impianto su 47',
          insertDate: '13/01/2024',
          lastUpdateDate: '14/01/2024',
          state: {
            code: 'to-do',
            description: 'Da completare'
          }
        }
      )
    }
  }

  data(): void {
    const dialogRef = this.dialog.open(DataModalComponent, {
      data: { title: 'Delete?' }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      //service to add modules
    });
  }
}
