import * as dotenv from 'dotenv';
dotenv.config({});

import app from "./app";

const PORT = process.env.PORT || 8080;

const start = async() => {
    app.listen( PORT , () => console.log(`${process.env.NAME} up and running`));
}

start().then().catch(err => console.log(err));
