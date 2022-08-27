# Angular Dynamic Env

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0. \
It provides a service to dynamically load and get `.env` file after build. 

## Installation

Install via npm 

```cmd
npm install angular-dynamic-env
```

Importing

```js
import { EnvService } from 'angular-dynamic-env';
```

## Usage

First of all you need to dockerize your app. Then import the library into your `app.module.ts` file and call `loadConfig` method on app initialization, see the example below :point_down:

```ts
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EnvService } from 'angular-dynamic-env';

export class AppModule {

function appInitializerFactory(envService: EnvService) {
  return async () => {
    envService.loadConfig();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    HttpClientModule,
  ],
  providers: [
    ...
    EnvService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [EnvService],
    }
  ],
  bootstrap: [AppComponent],
})

}

export class AppModule {}
```
Then put your `.env` file into `assets` folder and create a Docker Volume in `docker-compose.yml` 

```yml
...
volumes:
      - ./src/assets/.env:path/to/your/project/in/container/assets/.env
```

Now all you need is to get the config file where it's needed by calling `getConfig` method, see the example below :point_down:

```ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'angular-dynamic-env';

@Injectable()
export class ExampleService {
  constructor(private httpClient: HttpClient, private envService: EnvService) {}

  exampleAPICall(): Observable<any> {
    return this.httpClient.get(`${this.envService.getConfig().SOME_PROPERTY_IN_YOUR_ENV}`);
  }
}

```
If everything is setup correct you'll have a dynamically changing `env` file after build.

## Contributing

**Email**: <petrosyanartur78@gmail.com> \
**Website**: <https://stayyourself.art/> \
**GitHub**: <https://github.com/ArturPetrosyan003>

## License

Uses MIT licensed code

MIT License

Copyright (c) 2022 Artur Petrosyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.