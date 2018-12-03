import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/help-ticket-object'


@inject(Router, HelpTicket)
export class helptickets {
    constructor(router, helpTickets) {
        this.router = router;
        this.helpTickets = helpTickets;
        this.message = 'All help tickets page';
        this.showHelpTicketEditForm  = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    };

    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    };                         

    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personId: "p1p1p1p1p1p1p1p1p1p1p1p1",
            ownerId: "o2o2o2o2o2o2o2o2o2o2o2o2o2",
            status: 'new'
        };
        this.helpTicketContent = {
            personId: "p1p1p1p1p1p1p1p1p1p1p1p1",
            content: ""
        };
        this.showEditForm();
    };

    showEditForm() {
        //this.helpTickets = helpTickets;
        this.showHelpTicketEditForm  = true;
        //setTimeout(() => { $("#Title").focus(); }, 500);
    };

    back() {
        this.showHelpTicketEditForm = false;
      };

    /*
    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    };

    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            };
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent };
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        };
    };*/


  //lifecycle method for loading icon
  attached() {
    feather.replace()
  };

};