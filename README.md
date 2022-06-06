# NestJs Backend Template 
<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#tests">Tests</a></li>
    <li><a href="#pipeline">CI/CD pipeline</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The project

This repository contains implemented functionalities that can be reused and extended as required.
<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [NestJs](https://nestjs.com/), the progressive Node.js framework for building server-side applications.
* [MongoDB](https://www.mongodb.com/fr-fr), the no SQL database.
* [NPM](https://www.npmjs.com/) as package manager.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

In order to run this project and extend its functionalities you need to follow some few steps : 

### Prerequisites

* Make sure that Node.js (>= 10.13.0, except for v13) is installed on your operating system. ( [Download Here](https://nodejs.org/en/download/))
* NestJs CLI (Command Line Interface)
  ```sh
  npm i -g @nestjs/cli
  ```
* Any API platform for building and using APIs, i used [Postman](https://www.postman.com/).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hamza-mahjoub/nestjs-backend-template.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add a **.env** file
   ```sh
   CONNECTION_STRING="MongoDb connection string"
   APPLICATION_PORT = 3000  // port is 3000 by default.
   MORGAN_ENV = "dev"
   ```
   
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
- Run the project using 
```sh
   npm run start:dev
   ```
Examples will be provided to showcase some features of this project.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Tests EXAMPLES -->
## Usage
- you can run all the tests at once using 
```sh
   npm run test
   ```
or select the file test  
```sh
   npm run test -- testfile.spec.ts
   ```
![image](https://user-images.githubusercontent.com/60366675/172180800-990ed042-01d3-43de-8f5c-4b9e063abafe.png)
   
The user module is subject to **two test types** under `src/user/test/`:
### Unit Testing
This test focuses on the component, so a **mocking** is required whenever there is a call to another component/service to focus on the tested code and not its behaviour with its external dependencies.  
For the `user.controller`, we mocked the service call using data stubs located under `__mocks__`.  
For the `user.service`,which uses calls to the database, we mocked these calls by creating our own **mongoose**-like service. 

### Integration Testing
This test focuses on the behaviour between different component, assuming that unit tests were done in a good manner, any error in this level will generate from the relation between a component and its external dependencies.  
in our case we tested the relation between **user.component**,**user.service** and the **mongodb** database.  

### End to End testing
it aims to test the functionalities and performance in this application. In this test we used the [Cypress](https://www.cypress.io/) which is a fast and easy to learn end to end testing framework.  
Run this command to open **cypress** interface then choose the corresponding test.
```sh
   npm run cypress:open
   ```
### User acceptance test
As the name suggests, this test is conducted by the user to verify wether the developed functionalities meets the requirements or not and finally accepting it or not. It represents the final test phase.
!!File to be uploaded


<p align="right">(<a href="#top">back to top</a>)</p>

## CI/CD pipeline
<p align="right">(<a href="#top">back to top</a>)</p>
## Roadmap

- ✅ [Morgan middleware](https://www.npmjs.com/package/morgan)
- ✅ Setting up Configuration **.env** .
- ✅ Setting up **MongoDB** Database.
- ✅ User Module
    - ✅ User model.
    - ✅ CRUD **(Create,Read,Update,Delete)**
- 🔲 [Swagger](https://swagger.io/).
- 🔲 Authentification Module.
- 🔲 Mailing Service.
- 🔲 RBAC **(Role Based Access Control)**
  
<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Hamza Mahjoub - mahjoubhamza036@gmail.com

Project Link: [https://github.com/hamza-mahjoub/nestjs-backend-template.git](https://github.com/hamza-mahjoub/nestjs-backend-template.git)

<p align="right">(<a href="#top">back to top</a>)</p>


