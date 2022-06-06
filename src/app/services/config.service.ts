import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _api: string;

  static set(property: string, value: string) {
    this['_' + property] = value;
  }

  static get(property: any) {
    return this['_' + property];
  }
}
