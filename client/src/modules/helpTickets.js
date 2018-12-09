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

    //pre-populate form for adding a new help ticket and a new content row
    newHelpTicket() {
        //intialize
        this.helpticket = "";

        //prepopulate helpticket
        this.helpticket = {
            Title: "",
            PersonID: this.userObj,
            OwnerID: this.userObj,
            Status: 'new'
        };

        //prepopulate content
        this.helpticketcontent = {
            Content: "",
            PersonID: "",
            helpTicketId: "",
            file: {
                FileName: "",
                OriginalFileName: ""
            }
        };

        //dispaly the form
        this.showEditForm();
    };

    //Show the edit form, and set focus on title
    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#Title").focus(); }, 500);
    };

    //go back to the grid, clean up the file arrays
    back() {
        this.filesToUpload = new Array();
        this.files = new Array();
        this.showHelpTicketEditForm = false;
    };

    //edit a ticket from the grid
    async editHelpTicket(helpticket) {
        //set the ticket to row
        this.helpticket = "";
        this.helpticket = helpticket;

        //set the content to blank (to allow add new content)
        /*this.HelpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };*/

        this.helpticketcontent = {
            Content: "",
            PersonID: "",
            helpTicketId: "",
            file: {
                FileName: "",
                OriginalFileName: ""
            }
        };

        //get all the existing contents to display as browse
        await this.helptickets.getHelpTicketsContents(helpticket._id);

        //display the form
        this.showEditForm();
    };

    //save either a insert, or an update
    async save() {
        //check if both ticket and content should be saved
        if (this.helpticket && this.helpticket.Title
            && this.helpticketcontent && this.helpticketcontent.Content) {
            //check if person editing is admin/staff, if so, set owner id
            if (this.userObj.role !== 'user') {
                console.log('set owner id')
                this.helpticket.OwnerID = this.userObj._id;
            };
            //combine ticket and content            
            let helpTicket = { helpTicket: this.helpticket, content: this.helpticketcontent };
            //save help ticket & content both
            let serverResponse = await this.helptickets.saveHelpticketAndContent(helpTicket);
            if (this.filesToUpload && this.filesToUpload.length > 0) {
                this.helptickets.uploadFile(this.filesToUpload, serverResponse.contentID);
            }
            
            //await this.helptickets.getHelpTickets(this.userObj);
            this.back();

        };

        //Get all tickets for grid
        await this.helptickets.getHelpTickets(this.userObj);

        //go back to grid from the edit form
        this.back();
    };

    //Delete help ticket and contents too
    async delete() {
        if (this.helpticket && this.helpticket._id) {
            await this.helptickets.deleteHelpticket(this.helpticket._id);
            await this.helptickets.getHelpTickets(this.userObj);
            this.back();
        };
    };

    //builds the list of files to add to content 
    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }


    //lifecycle method for loading icon
    attached() {
        feather.replace()
    };

};