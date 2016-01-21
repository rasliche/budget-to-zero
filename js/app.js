// Database Setup
var transactionsdb = new PouchDB('transactions');
var budgetdb = new PouchDB('budget');
PouchDB.debug.enable('*'); // enables debugging
// PouchDB.debug.disable(); // Disables debugging

// Vue.config
Vue.config.debug = true;
