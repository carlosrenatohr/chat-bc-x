// const { supertest } = require("supertest"); 

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: "node",
    transform: {
        // "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
        // 'node-fetch': 'node-fetch/src/index.js',
        // 'supertest': 'supertest/lib/test.js',
        // 'express': 'express/lib/express.js',
        // 'body-parser': 'body-parser/lib/types/json.js',
        // 'body-parser/lib/types/urlencoded': 'body-parser/lib/types/urlencoded.js',
        // 'node:http': 'node:http',
    },
    // transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
  };
  
  module.exports = config;