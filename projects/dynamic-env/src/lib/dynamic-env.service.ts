import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {
  constructor(private httpClient: HttpClient) {}

  config: any;

  loadConfig() {
    return this.httpClient
      .get('assets/.env', { responseType: 'text' })
      .subscribe((config) => {
        const configArray = config
          .split(' ')[0]
          .replace('\r\n', ',')
          .split(',');

        configArray.forEach((item) => {
          this.config = {
            ...this.config,
            [item.split('=')[0]]:
              item.split('=')[1] !== 'true' && item.split('=')[1] !== 'false'
                ? item.split('=')[1]
                : item.split('=')[1] === 'true',
          };
        });
      });
  }

  getConfig() {
    return this.config;
  }
}
