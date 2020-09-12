# Mini Project Management System (Spring boot & Angular 9 )

[![N|Solid](https://i55.servimg.com/u/f55/13/79/70/03/main10.png)](https://i55.servimg.com/u/f55/13/79/70/03/main10.png)

> Angular and SpringBoot both have way too much of magic, if you are one who like to be in controll of their code, then you are in right place :)
> hope you find this project helpfull for you learning purpose.

In this project, Im going to build a Spring Boot Rest Api project that supports Token based Authentication with JWT and angular 9 . You’ll know:

  - Appropriate Flow for User Signup & User Login with JWT Authentication.
  - Spring Boot Application Architecture with Spring Security.
  - How to configure Spring Security to work with JWT.
  - Way to use Spring Data JPA to interact with PostgreSQL.
  - How to use genircs class repository and service.
  - How to organize and structure your work environment and folders (like in companies).

### Technology Stack
Component         | Technology
---               | ---
Frontend          | [Angular 9](https://github.com/angular/angular)
Backend (REST)    | [SpringBoot](https://projects.spring.io/spring-boot) (Java)
Security          | Token Based (Spring Security and [JWT](https://github.com/auth0/java-jwt) )
REST Documentation| [Swagger UI / Springfox](https://github.com/springfox/springfox)
DataBase      | [PostgreSQL 9.4](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) 
Persistence       | JPA (Using Spring Data)
Client Build Tools| [angular-cli](https://github.com/angular/angular-cli), Webpack, npm
Client Test| [Postman](https://www.postman.com/)/[Insomnia](https://insomnia.rest/)
Server Build Tools| Maven(Java) or Gradle

# Folder Structure

[![N|Solid](https://i55.servimg.com/u/f55/13/79/70/03/011.png)](https://i55.servimg.com/u/f55/13/79/70/03/011.png)

## Prerequisites
Ensure you have this installed before proceeding further
- Java 8
- Maven 3.3.9+ or Gradle 3.3
- Node.js 12 or above,  
- npm 6 or above,   
- Angular-cli 9.1.4

## About
This is an RESTfull implementation of an Mini Project Management System, using
spring boot rest pai as beck-end and angular as front-end.
The goal of the project is to 
- Highlight techniques of making and securing a REST full app using [SpringBoot](https://projects.spring.io/spring-boot)
- How to consume an RESTfull service and make an HTML5 based Single Page App using [Angular 9+](https://github.com/angular/angular)
- How to use an admin template [AdminLte 2](https://github.com/ColorlibHQ/AdminLTE/releases/tag/v2.4.18) and intgrated with Angular

### Features of the Project
* Backend
  * Token Based Security (using Spring security).
  * API documentation and Live Try-out links with Swagger .
  * PostgreSQL DataBase Configuration.
  * Using JPA to talk to relational database.
  * How to request and respond for paginated data .

* Frontend
  * Organizing Components, Modules, Services, Directives, Pages , routing etc in an Angular App.
  * How to chain RxJS Observables.
  * Techniques to Lazy load Data.
  * Techniques to load large data set in a data-table but still keeping DOM footprint less.
  * Routing and guarding pages that needs authentication.
  * Basic visulaization.
  * Pagination with jquery integred in Admin template.

* Build
  * How to build all in one app that includes (database, sample data, RESTfull API, Auto generated API Docs, frontend and security).
  
### Build Frontend

```bash
# Navigate to PROJECT_FOLDER/webui (should contain package.json )
npm install
# build the project (this will put the files under dist folder)
ng build --prod --aot=true
# to strat
ng server 
# Or
npm start
```

### Build Backend (SpringBoot Java)
 This project is packaged as a war which has Tomcat 8 embedded. No Tomcat or JBoss installation is necessary. You run it using the `java -jar` command.
 - Clone this repository
 - Make sure you are using JDK 1.8 and Maven 3.x
 - You can build the project and run the tests by running `mvn clean package`
 - Once successfully built, you can run the service by one of these two methods:

```bash
# Maven Build : Navigate to the root folder where pom.xml is present 
mvn clean install

#OR

# Gradle Build : Navigate to the root folder where build.gradle is present 
gradle build
```



### Accessing Application
Cpmponent         | URL                                      | Credentials
---               | ---                                      | ---
Backtend          |  http://localhost:8080                   | `register new user`
Frontend          |  http://localhost:4200                   | ``register new user``
Swagger (API Ref) |  http://localhost:8080/swagger-ui.html  | ``email & password if Ask`` 
Swagger Spec      |  http://localhost:8080/v2/api-docs          |``Nada``

### Screenshots
#### Login
![Login](https://i55.servimg.com/u/f55/13/79/70/03/112.png)

#### Dashboard
![Dashboard](https://i55.servimg.com/u/f55/13/79/70/03/210.png)

#### User List 
![User_List](https://i55.servimg.com/u/f55/13/79/70/03/310.png)

#### Project List 
![Project_List](https://i55.servimg.com/u/f55/13/79/70/03/410.png)

#### Notice List 
![Notice_List](https://i55.servimg.com/u/f55/13/79/70/03/510.png)

#### API Docs - With Live Tryout
![Api_Doc](https://i55.servimg.com/u/f55/13/79/70/03/610.png)

#### API Docs - With Live Tryout
![Api_Doc](https://i55.servimg.com/u/f55/13/79/70/03/710.png)

#### API Docs - With Live (Category API)
![Api_category](https://i55.servimg.com/u/f55/13/79/70/03/910.png)

#### API Docs - With Live (Category Entity)
![Api_category](https://i55.servimg.com/u/f55/13/79/70/03/1010.png)

**Thnak You For Purchasing My Software, That Help Me Alot :)**