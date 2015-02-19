/**
 * config.js
 * ---------
 * Main configuration file
 */
 
module.exports = {
    debug: true, //log debug messages

    //notes config
    Notes: {
        endPoint: 'http://localhost:5000/notes'
    },

    //contacts config
    Contacts: {
        endPoint: 'http://localhost:5000/contacts',
        filterDelay: 250 //contact filter delay in ms
    },

    //notifier config
    Notifier: {
        position: 'bottom' //"bottom" or "top"
    }
};