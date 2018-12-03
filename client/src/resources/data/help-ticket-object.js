import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//import { helptickets } from '../../modules/helpTickets';

@inject(DataServices)

export class Helpticket {
    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helptickets';
    };

    async getHelpTickets(userObj) {
        console.log('getting all help tickets');
        let url = this.HELP_TICKET_SERVICE;
        if (userObj.role == 'user') {
            console.log('need a new route here for ' + url + '/user/' + userObj._id);
        //    url += '/user/' + userObj._id;
        };
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpticketsArray = response;
        } else {
            this.helpticketsArray = [];
        };
        console.log('finished getting all help tickets');
    };

    async saveHelpticket(helpticket) {
        console.log("inside the help ticket object.js file")
        let serverResponse;
        if (helpticket) {
            if (helpticket._id) {
                console.log('put update')
                serverResponse = await this.data.put(helpticket, this.HELP_TICKET_SERVICE);
            } else {
                console.log('post insert')
                serverResponse = await this.data.post(helptickets, this.HELP_TICKET_SERVICE);
            };
            return serverResponse;
        };
    };

};