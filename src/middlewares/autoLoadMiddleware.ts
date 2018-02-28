import * as express from "express";
//et consing = require("consign");
import * as consign from 'consign';

class AutoLoadMiddleware {
    public express: express.Application;

    constructor(_express: express.Application) {
        this.express = _express;
    }

    private loadMiddleware(): void {
        
    }




}