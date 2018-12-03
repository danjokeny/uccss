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
        this.helpticket = {
            Title: "Title",
            PersonID: this.userObj._id,
            OwnerID: "o2o2o2o2o2o2o2o2o2o2o2o2o2",
            Status: 'new'
        };
       /* this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };*/
        this.showEditForm();
    };

    showEditForm() {
        this.showHelpTicketEditForm  = true;
        //setTimeout(() => { $("#Title").focus(); }, 500);
    };

    back() {
        this.showHelpTicketEditForm = false;
      };


    async editHelpTicket(helpTicket) {
        console.log('trying to edit a ticket row')
        console.log('helpTicket =' + helpTicket)
        console.log('this.helpticket =' + this.helpticket)
        this.helpTicket = helpTicket;
/*        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpticket._id)*/
        this.showEditForm();
    };

    async save() {
        console.log('trying to insert save')
        console.log('this.helpticket =' + this.helpticket)
        console.log('this.helpticket.title =' + this.helpticket.title)
        if (this.helpticket && this.helpticket.title 
            //&& this.helpTicketContent && this.helpTicketContent.content
            ) {
            if (this.userObj.role !== 'user') {
                this.helpticket.ownerId = this.userObj._id;
            };
            let helpTicket = { helpTicket: this.helpticket, content: this.helpticketContent };
            await this.helpTickets.saveHelpTicket(this.helpticket);
            await this.getHelpTickets();
            this.back();
        };
    };

  //lifecycle method for loading icon
  attached() {
    feather.replace()
  };

};