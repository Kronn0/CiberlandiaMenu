# Ciberlandia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Ciberlandia Project
Este proyecto cuenta con un frontend y un backend. A continuación, se explican los pasos necesarios para ejecutarlos correctamente.
## **Requisitos Previos**
1. Tener instalado **Node.js** en tu sistema. Puedes descargarlo aquí: [https://nodejs.org/](https://nodejs.org/).
2. Un navegador web para visualizar la aplicación.
3. Opcional: Servidor de producción instalado localmente, como `serve`, que se puede instalar con `npm`:
``` bash
   npm install -g serve
```
## **Ejecución del Backend**
1. Accede al directorio donde se encuentra el backend:
``` bash
   cd backend
```
2. Ejecuta el siguiente comando para iniciar el servidor:
``` bash
   node server.js
```
3. El backend estará escuchando en la dirección:
``` 
   http://ip-local:3000
```
Este será el punto de conexión para todas las API utilizadas en el proyecto.
## **Ejecución del Frontend**

1. Buildeamos la aplicación

``` bash
   ng build --configuration production
```

2. Accede al directorio donde se encuentra el proyecto construido (el directorio `/dist/ciberlandia`):
``` bash
   cd dist/ciberlandia
```
3. Inicia un servidor de producción con el siguiente comando:
``` bash
   serve -s -l 8080
```
4. Abre tu navegador y visita:
``` 
   http://localhost:8080
   
   http://ip-local:8080

