import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyColorPickerComponent } from './core/components/formly/formly-color-picker/formly-color-picker.component';
import { FormlySectionLineComponent } from './core/components/formly/formly-section-line/formly-section-line.component';
import { FormlyWrapperPanel } from './core/components/formly/wrappers/formly-wrapper/formly-wrapper.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom([
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
      wrappers: [
        { name: 'formly-wrapper-panel', component: FormlyWrapperPanel },
      ],
      types: [
        { name: 'color', component: FormlyColorPickerComponent },
        { name: 'section-line', component: FormlySectionLineComponent },
        { name: 'input', wrappers: ['formly-wrapper-panel']},
      ],
    }),
  ])]
};
