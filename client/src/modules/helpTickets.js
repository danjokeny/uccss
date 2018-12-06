import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Helpticket } from '../resources/data/help-ticket-object'

@inject(Router, Helpticket)
export class helptickets {
    constructor(router, helptickets) {
        this.router = router;
        this.helptickets = helptickets;
        this.message = 'Help Tickets';
        this.showHelpTicketEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    };

    //get help tickets upon loading the page
    async activate() {
        await this.helptickets.getHelpTickets(this.userObj);
    };

    //pre-populate form for adding a new help ticket
    newHelpTicket() {
        console.log('loading a new editForm')
        this.helpticket = {
            Title: "Summarize Help Issue here",
            PersonID: this.userObj,
            // OwnerID: "",
            Status: 'new'
        };

        /* this.helpTicketContent = {
             personId: this.userObj._id,
             content: ""
         };*/
        this.showEditForm();
    };


    //Show the edit form, and set focus on title
    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#Title").focus(); }, 500);
    };

    //go back to the grid 
    back() {
        this.showHelpTicketEditForm = false;
    };

    //edit a ticket from the grid
    async editHelpTicket(helpticket) {
        console.log('trying to edit a ticket row')
        this.helpticket = helpticket;
        /*        this.helpTicketContent = {
                    personId: this.userObj._id,
                    content: ""
                };
                await this.helpTickets.getHelpTicketsContents(helpticket._id)*/
        this.showEditForm();
    };

    //save either a insert, or an update
    async save() {
        console.log('trying to save')
        console.log(' this.helpticket Title=' + this.helpticket.Title)
        console.log(' this.helpticket status=' + this.helpticket.Status)
        console.log(' this.helpticket person=' + this.helpticket.PersonID)
        console.log(' this.helpticket owner=' + this.helpticket.OwnerID)

        if (this.helpticket && this.helpticket.Title
            //&& this.helpTicketContent && this.helpTicketContent.content
        ) {
            if (this.userObj.role !== 'user') {
                console.log('set owner id')
                this.helpticket.ownerId = this.userObj._id;
            };
            let helpTicket = this.helpticket;
            //let helpTicket = { helpTicket: this.helpticket, content: this.helpticketContent };

            await this.helptickets.saveHelpticket(this.helpticket);
            await this.helptickets.getHelpTickets(this.userObj);
            this.back();
        };
        console.log('end of save')
    };

    //Delete help ticket and contents too.
    async delete() {
        if (this.helpticket && this.helpticket.Title
            && this.helpticketContent && this.helpticketContent.content
        ) {
            let helpTicket = { helpTicket: this.helpticket, content: this.helpticketContent };
            await this.helptickets.deleteHelpticket(helpTicket);
            await this.helptickets.getHelpTickets(this.userObj);
            this.back();
        };
    };

    //lifecycle method for loading icon
    attached() {
        feather.replace()
    };

};