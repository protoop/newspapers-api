# Newspapers API

**Newspapers API** is a RESTful JSON API to get newspapers and articles data from the database created by [Newspapers Scraper](https://github.com/protoop/newspapers-scraper).

## Setup

To start the server :

1) Install all the `npm` packages :

    $ npm install
    
Info : the `npm` packages that will be installed are listed in the `package.json` file.

For ensuring that the node server will run continuously, you should then install the `npm` package `forever`, globally :

    $ npm install forever -g

2) Run the server :

To run the server simply run :

    $ nohup forever newspapers-api-server.js

The `nohup` ensures the server won't stop if you close your SSH session and is fully optional.

That's all.

## FAQ

Q. What are the prerequisites ?

A. You should have both `nodejs` and `npm` installed on your system.

## Overview

* `package.json` : the usual npm [package.json](https://docs.npmjs.com/files/package.json)
* `newspapers-api-server.js` : (node.js) API server
* `app/config.js` : config
* `app/sqlite3db.js` : db connection

## License

Copyright (c) 2015, protoop. All rights reserved.