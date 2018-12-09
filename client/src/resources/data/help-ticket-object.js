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

    //get all help tickets --eventually for a specific user
    async getHelpTickets(userObj) {
        console.log('getting all help tickets');
        let url = this.HELP_TICKET_SERVICE;
        if (userObj.role == 'user') {
            url += '/user/' + userObj._id;
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

    //get all content records to show
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

    //save both ticket and content (for both insert and update)
    async saveHelpticketAndContent(helpticket) {
        console.log("inside tsave ticket and content");
        let serverResponse;
        if (helpticket) {
            if (helpticket.helpTicket._id) {
                console.log('put update')
                serverResponse = await this.data.put(helpticket, this.HELP_TICKET_SERVICE);
            } else {
                console.log('post insert')
                serverResponse = await this.data.post(helpticket, this.HELP_TICKET_SERVICE);
            };
            return serverResponse;
        };
    };

    //delete
    async deleteHelpticket(inhelpticket) {
        console.log("delete help tickets and contents ");
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