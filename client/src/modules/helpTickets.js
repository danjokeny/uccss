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
        this.helpticket = "";
        helptickets.helpticketscontentArray = [];
        this.helpticket = {
            Title: "",
            PersonID: this.userObj,
            // OwnerID: "",
            Status: 'new'
        };

        this.helpticketcontent = {
            PersonID: ""
        };
        helptickets.helpticketscontentArray.push(this.helpticketcontent)
        this.showEditForm();
    };

    newContent () {
        console.log('how do i add to content?')
    };


    //Show the edit form, and set focus on title
    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#Title").focus(); }, 500);
    };

    //go back to the grid 
    back() {
        helptickets.helpticketscontentArray = [];
        this.showHelpTicketEditForm = false;
    };

    //edit a ticket from the grid
    async editHelpTicket(helpticket) {
        console.log('trying to edit a ticket row')
        this.helpticket = helpticket;
        this.HelpTicketContent = {
            personId: this.userObj._id,
            content: "enter comments/content here"
        };

        await this.helptickets.getHelpTicketsContents(helpticket._id)
        this.showEditForm();
    };

    //save either a insert, or an update
    async save() {
        console.log('trying to save both content and ticket')
        console.log(' this.helpticket Title=' + this.helpticket.Title)
        console.log(' this.helpticket status=' + this.helpticket.Status)
        console.log(' this.helpticket person=' + this.helpticket.PersonID)
        console.log(' this.helpticket owner=' + this.helpticket.OwnerID)
        console.log(' this.helpticketcontent.content=' + this.helpticketcontent.Content)
        console.log(' this.helpticketcontent person=' + this.helpticketcontent.PersonID)


        if (this.helpticket && this.helpticket.Title
            && this.helpticketcontent && this.helpticketcontent.Content
        ) {
            if (this.userObj.role !== 'user') {
                console.log('set owner id')
                this.helpticket.ownerId = this.userObj._id;
            };
            //let helpTicket = this.helpticket;
            let helpTicket = { helpTicket: this.helpticket, content: this.helpticketcontent };

            await this.helptickets.saveHelpticket(helpTicket);
            await this.helptickets.getHelpTickets(this.userObj);
            this.back();
        };
        console.log('end of save')
    };

    //Delete help ticket and contents too
    async delete() {
        if (this.helpticket && this.helpticket._id) {
            await this.helptickets.deleteHelpticket(this.helpticket._id);
            await this.helptickets.getHelpTickets(this.userObj);
            this.back();
        };
    };

    //lifecycle method for loading icon
    attached() {
        feather.replace()
    };

};