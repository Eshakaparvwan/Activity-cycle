import { Router } from "express";

export class Route {
    constructor(
        public path: string,
        public router: Router
    ) { }
};

export interface IExclude {
    path: string,
    method: string
};