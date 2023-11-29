# Tests "End to End" con Cypress
![image](https://github.com/uqbar-project/eg-tareas-cypress/assets/1235066/ae87bcdc-ed3c-4abc-80de-c50e3977a118)

## Introduccion
Ya conocemos los primeros dos tipos de tests:
 - **Test unitario:**  busca probar una pequeña funcionalidad específica y aislada.
- **Test de integración:** busca probar la comunicación e interacción entre dos o más módulos del sistema.


La idea fundamental detrás de cualquier test que diseñemos consiste en establecer unas condiciones iniciales y verificar el cumplimiento de unas condiciones finales luego de realizar una cierta acción.

![image](https://github.com/uqbar-project/eg-tareas-cypress/assets/1235066/2ea8702b-245b-4026-9876-61178d7d04e8)


## Testeo end to end
Los test **end to end** (_e2e_) buscan testear la funcionalidad completa del sistema desde el punto de vista del usuario, simulando las acciones de entrada de más alto nivel ignorando prácticamente todos los detalles de implementación.

Una forma de lograr este objetivo es realizar una ejecución manual, lo cual de más está decir es muy poco escalable y fiable, es por eso que para llevar a cabo las pruebas E2E existen frameworks y soluciones para automatizar esta tarea. 

![image](https://github.com/uqbar-project/eg-tareas-cypress/assets/1235066/b5309380-b460-4404-8c10-57b809721d1f)

Ventajas de este tipo de tests incluye:

* Prueban la comunicación entre aplicaciones, que solo habíamos simulado previamente.
* Los tests se escriben de forma más cercana a la experiencia del usuario.
* Se pueden incluir tests de integración junto a ellos.

Mientras que algunas de sus contras son que:

* Son los tests más lentos de ejecutar
* Son costosos de construir y frágiles, por lo que cuesta mantenerlos
* Es muy fácil que se vuelvan flaky (inconsistentes)

## ¿Qué es Cypress?
[Cypress](https://www.cypress.io/) es un framework en **Javascript** utilizado para automatizar pruebas de tipo e2e sobre aplicaciones web. Para conseguirlo genera una instancia de un navegador y permite, de forma programática, interactuar con la página simulando las acciones de una persona.

Es _framework-agnostic_, lo que significa que no depende de un framework o lenguaje determinado para la aplicación a testear. Mientras cargue en un navegador, debería poder testearlo. Sí está limitado en el lenguaje a usar para escribir sus tests, debido a que hace uso de un navegador real, queda limitado a escribir tests en Javascript.

### Algunas herramientas de utilidad en Cypress:

* **Time Travel:** Podemos ver el estado del test paso a paso.
* **Hot Reload:** Recarga un test inmediatamente después de que lo hayamos retocado.
* **Espera Automática _(Automatic Waiting)_**: 
  - Podemos esperar a que se ejecute cierta acción (petición HTTP) o se cumpla un assert.
  - Por defecto espera 4 segundos a que se cumpla antes de fallar, pero se puede configurar.
* **Control del tráfico de red _(Network Traffic Control)_**: Permite testear flujos de funcionalidades dependientes de respuestas en el servidor, o tiempos de espera sin modificar el backend.
* **Videos y capturas de pantalla**: Incluso al correr en modo headless, podemos obtener feedback visual respecto a cómo se ejecutaron los tests que fallaron (o todos).

### Algunas contras a considerar:

* Como mencionamos más arriba, los tests corren en el navegador; debido a esto, solo se pueden escribir los tests con JavaScript.
* El otro limitante es que (por diseño) cada test se encuentra atado a un único orígen.
  - Cypress no permite visitar dos dominios de orígenes distintos, o usar dos browsers distintos al correr un mismo test.
  - Ejemplo 1: 
    - Mi test involucra hacer click a un botón que abre un popup
    - Puedo testear que el destino sea correcto con (por ej.) el atributo target de la redirección.
    - No puedo testear la pestaña que se abre -> Estaríamos testeando funcionalidad del navegador.
  - Ejemplo 2: 
    - Hago cy.visit() a mi frontend en React
    - Hago acciones que tienen efecto en el backend
    - En el mismo test quiero hacer  **cy.visit()**  a mi frontend en Angular, para ver que los cambios se reflejen allá.
    - Ese comando "visit()" falla, Cypress no va a permitir que se realice.

## ¿Como empiezo?

En una carpeta nueva en blanco (o en la de su proyecto existente) pueden instalar Cypress via npm, usando el comando

```bash
npm install cypress --save-dev
```

o, alternativamente

```bash
npm i -D cypress
```

Una vez hecho esto, se podrá abrir Cypress usando el comando npx desde la raíz del proyecto:

```bash
npx cypress open
```

Al ejecutar por primera vez, se generaran una serie de carpetas y archivos. Algunos de los más importantes para nosotros serán:

* **cypress.config.json**: El archivo principal de configuración.
  * Aquí podremos hacer cosas como setear la propiedad "baseUrl", para no tener que repetir en todo nuestro codigo la ruta principal de nuestro servidor frontend.
  * También podemos, de ser necesario, activar algunas funcionalidades para saltarnos validación de CORS. Pero en principio no debería ser necesario.
  * [Más info sobre la configuración del framework aquí.](https://docs.cypress.io/guides/references/configuration#__docusaurus_skipToContent_fallback)https://docs.cypress.io/guides/references/configuration#__docusaurus_skipToContent_fallback
* **cypress/e2e:** Aquí almacenaremos nuestros tests.
* **cypress/fixtures:** Aquí podemos guardar archivos json/yml/xml para simular respuestas del backend, en caso que querramos hacer un test con comportamiento mas predecible (similar a los spy/mock/stubs que usamos en el front).
* **cypress/support:** Aquí podemos crear comandos personalizados en el archivo **"commands.js"**, o aplicar configuraciones globales (tales como importar esos comandos que creamos) para todos nuestros tests, mediante el archivo **"e2e.js"**.

## Buenisimo ¿Y cómo escribo un test?
os tests de cypress se escriben en javascript. Para aclararle al editor que estemos usando que nos autocomplete con sugerencias de cypress tenemos que agregar

```js
/// <reference types="cypress" />
```
al principio del archivo.

### Ej 1: Tests de muestra, autogenerados por Cypress

### Ej 2: Tests contra nuestro ejemplo de "Tareas de Desarrollo"

Para recordar, utilizabamos:

* Angular en el [frontend](https://github.com/uqbar-project/eg-tareas-angular), levantado en el puerto 4200 de localhost.
* Spring Boot en el [backend](https://github.com/uqbar-project/eg-tareas-springboot-kotlin)), levantado en el puerto 9000 de localhost.

[TODO]

## Ver más

* [**Ejemplo anterior de Cypress, hecho en 2021:**](https://github.com/uqbar-project/eg-cypress-tareas-2021) La mayoría de la teoría aplica, pero la sintaxis cambió y mejoró un poco en 3-4 años hasta llegar a la versión actual.
