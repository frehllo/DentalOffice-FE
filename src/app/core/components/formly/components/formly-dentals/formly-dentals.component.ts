import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Fondamentale per *ngFor
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-dentals',
  standalone: true, // Rende il componente autonomo
  imports: [CommonModule, ReactiveFormsModule, FormlyModule], // Importa le direttive base
  template: `
    <div class="dental-container mb-4">
      <label class="d-block mb-3"><strong>{{ props.label }}</strong></label>
      
      <div class="arch upper">
        <div class="quadrant">
          <button *ngFor="let d of quadrant1" type="button" 
                  [class.selected]="isSelected(d)" (click)="toggleDente(d)">{{ d }}</button>
        </div>
        <div class="quadrant">
          <button *ngFor="let d of quadrant2" type="button" 
                  [class.selected]="isSelected(d)" (click)="toggleDente(d)">{{ d }}</button>
        </div>
      </div>

      <div class="divider"></div>

      <div class="arch lower">
        <div class="quadrant">
          <button *ngFor="let d of quadrant4" type="button" 
                  [class.selected]="isSelected(d)" (click)="toggleDente(d)">{{ d }}</button>
        </div>
        <div class="quadrant">
          <button *ngFor="let d of quadrant3" type="button" 
                  [class.selected]="isSelected(d)" (click)="toggleDente(d)">{{ d }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dental-container { text-align: center; font-family: sans-serif; padding: 10px; border: 1px solid #eee; border-radius: 8px; }
    .arch { display: flex; justify-content: center; gap: 20px; margin-bottom: 10px; flex-wrap: wrap; }
    .quadrant { display: flex; gap: 4px; }
    .divider { height: 2px; background: #eee; margin: 15px 0; width: 100%; }
    button { 
      width: 32px; height: 32px; border: 1px solid #ddd; background: white; 
      font-size: 11px; cursor: pointer; border-radius: 4px; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center;
    }
    button:hover { background: #f0f0f0; border-color: #bbb; }
    button.selected { background: #007bff; color: white; border-color: #0056b3; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
  `]
})
export class FormlyDentalComponent extends FieldType<FieldTypeConfig> {
  // Notazione ISO/FDI
  quadrant1 = [18, 17, 16, 15, 14, 13, 12, 11];
  quadrant2 = [21, 22, 23, 24, 25, 26, 27, 28];
  quadrant3 = [31, 32, 33, 34, 35, 36, 37, 38];
  quadrant4 = [41, 42, 43, 44, 45, 46, 47, 48]; // Corretto l'ordine per specchiar immagine

  isSelected(dente: number): boolean {
    return this.formControl.value ? this.formControl.value.includes(dente) : false;
  }

  toggleDente(dente: number) {
    const currentValues = Array.isArray(this.formControl.value) ? [...this.formControl.value] : [];
    const index = currentValues.indexOf(dente);
    
    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(dente);
    }
    
    this.formControl.setValue(currentValues);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }
}