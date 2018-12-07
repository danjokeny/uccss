import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)

export class Landing {
    constructor(router) {
        this.router = router;
        this.message = 'HelpMe - Ticket Application Website!';
        this.message2 = 'Please log in';
    };

};
