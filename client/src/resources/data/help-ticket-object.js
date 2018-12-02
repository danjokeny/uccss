import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)

export class HelpTicket {
    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets';
    };

    async getHelpTickets(userObj) {
        let url = this.HELP_TICKET_SERVICE;
        console.log('getting all help tickets');
       /* if (userObj.role == 'user') {
            console.log('need a new route here for ' + url + '/user/' + userObj._id);
        //    url += '/user/' + userObj._id;
        };*/
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
        } else {
            this.helpTicketsArray = [];
        };
    };

    async saveHelpTicket(helpTicket) {
        let serverResponse;
        if (helpticket) {
            if (helpticket.helpTicket._id) {
                serverResponse = await this.data.put(helpticket, this.HELP_TICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpticket, this.HELP_TICKET_SERVICE);
            };
            return serverResponse;
        };
    };

};