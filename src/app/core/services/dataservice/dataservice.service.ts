import { Injectable } from '@angular/core';
import * as dentalStudiosData from './jsons/dental-studios.json';
import * as materialsMetalData from './jsons/materials-metal.json';
import * as materialsDentinData from './jsons/materials-dentin.json';
import * as materialsEnamelData from './jsons/materials-enamel.json';
import * as materialsResinData from './jsons/materials-resin.json';
import * as materialsDisksData from './jsons/materials-disks.json';
import * as colorsData from './jsons/colors.json';
import * as semiproductsData from './jsons/semiproducts.json';
import * as risksData from './jsons/risks.json';
import * as modulesData from './jsons/modules.json';
import * as stagesData from './jsons/stages.json';
import * as lotsMetalData from './jsons/lots-metal.json';
import * as lotsDentinData from './jsons/lots-dentin.json';
import * as lotsEnamelData from './jsons/lots-enamel.json';
import * as lotsResinData from './jsons/lots-resin.json';
import * as lotsDisksData from './jsons/lots-disks.json';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  getDataByRoute(route: string): any[] {
    switch (route) {
      case '/dental-studios':
        return dentalStudiosData.data;
      case '/materials-metal':
        return materialsMetalData.data;
      case '/materials-dentin':
        return materialsDentinData.data;
      case '/materials-enamel':
        return materialsEnamelData.data;
      case '/materials-resin':
        return materialsResinData.data;
      case '/materials-disks':
        return materialsDisksData.data;
      case '/colors':
        return colorsData.data;
      case '/semiproducts':
        return semiproductsData.data;
      case '/risks':
        return risksData.data;
      case '/modules':
        return modulesData.data;
      case '/stages':
        return stagesData.data;
      case '/lots-metal':
        return lotsMetalData.data;
      case '/lots-dentin':
        return lotsDentinData.data;
      case '/lots-enamel':
        return lotsEnamelData.data;
      case '/lots-resin':
        return lotsResinData.data;
      case '/lots-disks':
        return lotsDisksData.data;
      default:
        console.error(`Route ${route} not recognized`);
        return [];
    }
  }
}
