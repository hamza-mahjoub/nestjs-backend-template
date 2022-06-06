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
        <li><a href="#testing-tools">Testing tools</a></li>
        <li><a href="#containerization-solution">Containerization Solution</a></li>
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
    <li><a href="#ci-cd-pipeline">CI/CD pipeline</a></li>
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

### Testing Tools
* [JEST](https://jestjs.io/fr/)
* [Cypress](https://www.cypress.io/)

### Containerization Solution
* [Docker](https://www.docker.com/)

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
 **Or**  
 
 1. make sure you have docker installed.
 2. pull the image : 
 ``` sh
 docker pull hamzamahjoub/nestjs-template
 ```
 3. run the following docker run command:  
  ```
 docker pull hamzamahjoub/nestjs-template
 ``` sh
 sudo docker run -d -p 3000:3000 --name nestjs-template hamzamahjoub/nestjs-template
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
## Tests
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
#### Example of mocking the user.service.ts
```ts
const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        createUser: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
        getAll: jest
          .fn()
          .mockResolvedValue([userStub(USER_STUB_ID, USER_STUB_EMAIL)]),
        get: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
        deleteById: jest.fn().mockResolvedValue({ deletedCount: 1 }),
        updateUser: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, 'FlenBenFelten')),
        updatePassword: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
      }),
    };
```
user stub represents a **user** instance.

### Integration Testing
This test focuses on the behaviour between different component, assuming that unit tests were done in a good manner, any error in this level will generate from the relation between a component and its external dependencies.  
in our case we tested the relation between **user.component**,**user.service** and the **mongodb** database.  
#### Using the nestjs integrated client
``` ts
  const apiClient = () => {
    return supertest(app.getHttpServer());
  };
```
### End to End testing
it aims to test the functionalities and performance in this application. In this test we used the [Cypress](https://www.cypress.io/) which is a fast and easy to learn end to end testing framework.  
Run this command to open **cypress** interface then choose the corresponding test.
```sh
   npm run cypress:open
   ```
 ![image](https://user-images.githubusercontent.com/60366675/172248981-13fadc53-0757-479d-8bf1-8b7e0736b4da.png)

### User acceptance test
As the name suggests, this test is conducted by the user to verify wether the developed functionalities meets the requirements or not and finally accepting it or not. It represents the final test phase.
!!File to be uploaded


<p align="right">(<a href="#top">back to top</a>)</p>

## CI/CD pipeline
The project pipeline code can be found under `.github/workflows` and its structure is as follows  
![image](https://user-images.githubusercontent.com/60366675/172243779-f30071f0-844f-4ea3-9c46-0d3b3f67236f.png)

### First phase
At first two jobs will run in parrallel:  
- One will take care of [eslint](https://eslint.org/) to make sure that code is clean and homogeneous.
- The other will run the tests via commande `npm run test`.
``` yaml
eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: stefanoeb/eslint-action@1.0.2
        with:
          files: src/
  Test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - name: 'Create .env file'
        run: |
          touch .env
          echo CONNECTION_STRING="${{ secrets.MONGO_DB_CONNECTION_STRING }}" >> .env
      - run: npm install
      - run: npm test
```
### Second phase
This part of the pipeline is **packaging** and depends on the two other tests via this code snippet:  
```yaml
  needs:
     - Test
     - eslint
```
We will build our poject, create a [Docker](https://www.docker.com/) image then login to our docker hub and push the image.

### Third phase
This part of the pipeline is **deploiement** and depends on the packaging phase. The project is deployed on an [Amazon](https://aws.amazon.com/) Ec2 instance.  
It follows these steps:  
1- Login to the instance via **ssh**.  
2- Shut down the running container.  
3- Pull the new released image.  
4- Launch a new container via `docker run` commande with port and name of the container specification.  

In order to acces the site a **security group** must be configured to let access on port **3000**(default nestjs port).  
You can view the backend via the following link : http://13.125.232.134:3000/

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


