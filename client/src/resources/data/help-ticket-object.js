import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//import { helptickets } from '../../modules/helpTickets';

@inject(DataServices)

export class Helpticket {
    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helptickets';
        this.HELP_TICKETCONTENT_SERVICE = '/HelpTicketContent/helpTicket';
        this.HELP_FILEUPLOAD_SERVICE = 'HelpTicketContent/helpTicket';
    };

    //get all help tickets 
    async getHelpTickets(userObj) {
        let url = this.HELP_TICKET_SERVICE;
        if (userObj.role == 'user') {
            url += '/user/' + userObj._id;
        };
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpticketsArray = response;
        } else {
            this.helpticketsArray = [];
        };
    };

    //get all content records to show
    async getHelpTicketsContents(inticketid) {
        let url = this.HELP_TICKETCONTENT_SERVICE + '/' + inticketid;
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpticketscontentArray = response;
        } else {
            this.helpticketscontentArray = [];
        };
    };

    //save both ticket and content (for both insert and update)
    async saveHelpticketAndContent(helpticket) {
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

    //delete
    async deleteHelpticket(inhelpticket) {
        let serverResponse;
        if (inhelpticket) {
            await this.data.delete(this.HELP_TICKET_SERVICE + '/' + inhelpticket)
        };
        return serverResponse;
    };

    //upload file
    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.HELP_FILEUPLOAD_SERVICE + "/upload/" + id );
    }
    
};