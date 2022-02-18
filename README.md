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
    <li><a href="#roadmap">Roadmap</a></li>
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

## Roadmap

- ✅ Morgan middleware.
- ✅ Setting up Configuration **.env** .
- ✅ Setting up **MongoDB** Database.
- 🔲 User Module
    - 🔲 User model.
    - 🔲 CRUD **(Create,Read,Update,Delete)**
- 🔲 [Swagger](https://swagger.io/).
- 🔲 Authentification Module.
- 🔲 Mailing Service.
- 🔲 RBAC **(Role Based Access Control)**
  
<p align="right">(<a href="#top">back to top</a>)</p>

