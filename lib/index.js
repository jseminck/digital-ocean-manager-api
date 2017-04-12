import "babel-polyfill";
import pug from "pug";
import configureApp from 'jseminck-be-server';
import configureRoutes from './routes/';
import dotenv from "dotenv";

dotenv.load();

module.exports = configureApp({
    configureServer: () => {}, // There is no specific server configuration
    configureRoutes: configureRoutes,
    index: pug.renderFile("lib/index.jade"),
    port: 8060
});