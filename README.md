# WODSS Project Management Frontend: Group 2
[![Build Status](https://travis-ci.com/kelvinlouis/fhnw-wodss-frontend.svg?branch=master)](https://travis-ci.com/kelvinlouis/fhnw-wodss-frontend)

This repository contains the source code of the frontend client of group 2.
The corresponding [backend](https://gitlab.fhnw.ch/christoph.christen/wodss-backend) is hosted on Gitlab.
You might need privileges to access the repository. Please contact _Christoph Christen_ if you need access.

The project is part of the [WODSS](https://www.fhnw.ch/de/studium/module/6008109) module
at the University of Applied Sciences and Arts Northwestern Switzerland (FHNW).

This documentation functions as a guide. It lists all prerequisites that are needed to start developing and building
the application for a production or similar environment. 

## Prerequisites
In order to start developing or building the client, the following tools are required:
- **Node.js**: v10.x.x
- **Yarn**: v1.15.2 or
- **npm**: v6.x.x

We use _Yarn_ as our package manager. Using _npm_ instead should not be a problem.

## Getting started

### Installation
After all necessary tools are installed (see previous chapter), you can run the following commands to install the
client:

```
git clone https://github.com/kelvinlouis/fhnw-wodss-frontend.git
cd fhnw-wodss-frontend
yarn
```

It will clone/download the repository and install all the necessary dependencies.

### Development
Before starting developing, please ensure that you installed all prerequisites and configured the client correctly.
Please refer to the [configuration](#configuration).

```
# Starting the development server: http://localhost:1234/
yarn start

# Linting TypeScript
yarn lint

# Linting SCSS
yarn lint-scss
```

If you experience issues running any of the comments above, please refer to [Known Issues](#known-issues).

### Build
If you want to build a production build, ensure you configured the client correctly beforehand. Please refer to the [configuration](#configuration).

The first command `yarn build` will create all the necessary files to host the client on any server.
```
# Creates a production build in dist/
yarn build

# Testing the build
cd dist
python -m SimpleHTTPServer 8000
```

## Configuration 
In order to run the development server or build for production, you have to prepare your environmental files.
They contain variables that the client will use during build and runtime.
You can copy the provided `.env.template`, rename and change it accordingly.
- For development (local) you will have to rename it to: `.env`
- In case of building for production you will have to rename it to: `.env.production` 

### Options
The following options are required:
- `BACKEND_URL`: The url to the running backend server. Ensure that the port is set correctly and it does not contain a trailing slash!
Example: `BACKEND_URL=http://localhost:8080`
- `BACKEND_JWT_TOKEN_TTL`: Specifies how long the JWT token provided by the backend is valid.
It acts as a fallback, if the token does not contain the `exp` attribute.
Example: `BACKEND_JWT_TOKEN_TTL=3600` expects it to be valid for 1 hour (60 * 60seconds).

The following options are optional:
- `PARCEL_MAX_CONCURRENT_CALLS`: This option is used during build time (`yarn start` or `yarn build`) and limits the number of concurrent calls the parcel
bundler is allowed to do. We experienced issues on Windows and had to limit it. Example: `PARCEL_MAX_CONCURRENT_CALLS=3`

## Known Issues
- **After running `yarn start` the build gets stuck**: Check if your `.env` file has the following property set `PARCEL_MAX_CONCURRENT_CALLS=3`.
We experienced difficulties building on Windows.
- **The client does not connect to the backend server**: Ensure that you have set `BACKEND_URL` correctly and that the URL does not contain a trailing slash at the end.

## Change Log
### Version 1.0.0 (2019-04-28)
- First version of the application.

## Links
- [Backend](https://gitlab.fhnw.ch/christoph.christen/wodss-backend)
- [API](https://github.com/swaechter/fhnw-wodss-spec)
- [Hyperapp](https://github.com/jorgebucaran/hyperapp)

## Contributors
- Sandra Amport
- Christoph Christen
- Nicola Cocquio
- Kelvin Louis
