<h1 align="center">
  <br>Blockbuster Online API REST
</h1>

<h4 align="center">Backend for a mock retro website with node.js</h4>

<br>
<p align="center">
  <a href="#about">About</a> •
  <a href="#usage">Usage</a> •
  <a href="#environment">Environment variables summary</a> •
  <a href="#dependencies">Dependencies</a> •
  <a href="#features">Features</a>
</p>

---

## About

<table>
<tr>
<td>
<br>

**Blockbuster Online's RESTful API** acts as a back-end for the Blockbuster Online website; a mockup of what Blockbuster's site would have looked like if they had embraced digitalization back in the 2000s. Three resources are available through the API: Users, Films and Orders. On Film creation, film data is queried to [The Movie Database (TMDb)](https://developers.themoviedb.org/3).

The API is built on <b>Node.js</b> with the <b>Express</b> library, connected to a <b>MongoDB</b> database through <b>Mongoose</b>. User authentication is done through <b>JWT</b>.

This project was created for educational purposes at <a href="https://geekshubsacademy.com/">GeeksHubs Academy</a>'s Full Stack Developer Bootcamp by Federico Báez in Valencia, Spain on 2021-2-22 to 2021-2-24.


</td>
</tr>
</table>

## Usage

[Click here to view the API documentation](https://documenter.getpostman.com/view/14551874/TWDamvEW) or

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7f9353d74295a14e43d7)

The API is deployed at https://blockbuster-online.herokuapp.com/ and its database is stored on the <b>MongoDB Atlas cloud</b>.

Alternatively, the project may be downloaded from <a href="https://github.com/fbgoode/blockbuster-online-b/archive/main.zip">this link</a>. You're welcome to borrow my code.

<br>

<div id="environment"></div>

## Environment variables summary

* NODE_ENV: development/production - Changes default settings (default: development)
* PORT: Port for server to listen on (default: 3000)
* JWT_SECRET: Secret for JWT signing (required)
* JWT_EXPIREIN: Expiration time for JWT tokens (required)
* TMDB_APIURL: URL for TMDb API (default: 'https://api.themoviedb.org/3/movie/')
* TMDB_APIKEY: API KEY for TMDb (default: 'cac61624997edd865edf5c5c8caec2a2')
* MONGO_PRE: mongodb:// or mongodb+srv:// (default: 'mongodb://')
* MONGO_HOST: Database url (default: 'localhost')
* MONGO_PORT: Database port - not necessary if host is domain (default: '27017')
* MONGO_DBNAME: Database name (default: 'test')
* MONGO_USER: Database user (default: null)
* MONGO_PASSWORD: Database password (default: null)
* MONGO_QUERY: Query parameters appended to database url (default: '')

<br>

## Dependencies

* express (server, endpoints and middleware)
* mongoose (ODM for MongoDB)
* bcryptjs (password encryption)
* jsonwebtoken (authentication)
* axios (better http requests)
* validator (input type validation)
* dotenv (optional - easy environment variables)

<br>

## Features

* RESTful architecture
* User, Film and Order resources
* Resources on "relational" database with MongoDB
    * Order resource _belongsto_ User & _hasmany_ Films
    * User _hasmany_ Orders
* Admin and Customer user roles with different permissions
* Log in & authentication over JWT
* Film info population through The Movie Database (TMDb)
* Various search and filter options to locate resources
* Inventory system for films
* Multi-item orders of different types (purchase/rental)

<br>