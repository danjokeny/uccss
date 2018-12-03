import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)

export class Landing {
    constructor(router) {
        this.router = router;
        this.message = 'This is my Landing page';
    };

};
