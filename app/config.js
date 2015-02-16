/**
 * config.js
 * ---------
 * Main configuration file
 */
 
module.exports = {
    //notes config
    Notes: {
        endPoint: 'http://modulapp.dev/notes'
    },

    //contacts config
    Contacts: {
        endPoint: 'http://modulapp.dev/contacts',
        filterDelay: 250 //contact filter delay in ms
    },

    //notitifer config
    Notifier: {
        position: 'bottom' //"bottom" or "top"
    }
};