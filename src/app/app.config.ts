import { FormlyMultiSelectComponent } from './core/components/formly/components/formly-multi-select/formly-multi-select/formly-multi-select.component';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyColorPickerComponent } from './core/components/formly/components/formly-color-picker/formly-color-picker.component';
import { FormlySectionLineComponent } from './core/components/formly/components/formly-section-line/formly-section-line.component';
import { FormlyAgGridComponent } from './core/components/formly/components/formly-ag-grid/formly-ag-grid.component';
import { provideHttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom([
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
        types: [
          { name: 'color', component: FormlyColorPickerComponent },
          { name: 'section-line', component: FormlySectionLineComponent },
          { name: 'multi-select', component: FormlyMultiSelectComponent },
          {
            name: 'grid',
            component: FormlyAgGridComponent,
            defaultOptions: {
              props: {
                width: '100%',
                height: '100%',
              },
            },
          },
        ],
      }),
      MatNativeDateModule
    ]),
  ],
};
