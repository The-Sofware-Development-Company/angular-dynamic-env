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
**Website**: <https://portfolio-925d4.web.app/> \
**GitHub**: <https://github.com/ArturPetrosyan003>