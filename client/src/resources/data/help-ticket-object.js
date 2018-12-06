import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//import { helptickets } from '../../modules/helpTickets';

@inject(DataServices)

export class Helpticket {
    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helptickets';
        this.HELP_TICKETCONTENT_SERVICE = '/HelpTicketContent/helpTicket';
    };

    //get all help tickets --eventually for a specific user
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

    async getHelpTicketsContents(inticketid) {
        console.log('getting all contents for a specific help ticket id');
        let url = this.HELP_TICKETCONTENT_SERVICE + '/' + inticketid;
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpticketscontentArray = response;
        } else {
            this.helpticketscontentArray = [];
        };

        console.log('finished getting all content for  help ticket = ' + inticketid);
    };

    async saveHelpticket(helpticket) {
        console.log("inside the help ticket object.js file");
        let serverResponse;
        if (helpticket) {
            if (helpticket._id) {
                console.log('put update')
                serverResponse = await this.data.put(helpticket, this.HELP_TICKET_SERVICE);
            } else {
                console.log('post insert')
                serverResponse = await this.data.post(helpticket, this.HELP_TICKET_SERVICE);
            };
            return serverResponse;
        };
    };

    async deleteHelpticket(inhelpticket) {
        console.log("delete help tickets and contents ");
        let serverResponse;
        if (inhelpticket) {
            await this.data.delete(this.HELP_TICKET_SERVICE + '/' + inhelpticket)
        };
        return serverResponse;
    };
};