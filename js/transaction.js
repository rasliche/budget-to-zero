// js/transaction.js
// -----------------
// Transaction ViewModel

var transactionsdb = transactionsdb || {};


// Document "Schema" (Get it? NoSQL doesn't have a schema)
// {
//   "_id": date,
//   "date": date,
//   "flow": float,
//   "target": string,
//   "account": string,
//   "category": string,
//   "memo": memo,
//   "cleared": boolean
// }

new Vue({
  el: '#app',

  data: {
    transaction: null, // used in form
    transactions: null // from db
  },

  ready: function() {
    transactionsdb.allDocs({ include_docs: true })
      .then(function(result) {
        console.log(result);
        this.transactions = result["rows"];
    }).catch(function(err) {
      console.log(err);
    });
  },

  methods: {
    addTransaction: function() {
      var t = this.transaction;
      t.date = this.transaction.date;
      t.target = this.transaction.target;
      t.category = this.transaction.category;
      t.memo = this.transaction.memo;
      t.flow = parseFloat(this.transaction.flow);

      if (t) {
        transactionsdb.put(t, function(err, doc){
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });
        this.transaction = {};
      }
    }
  },

  computed: {
    // balance: function() {
    //   return this.transactions.reduce(function(a, b) {
    //     return (a + b.flow);
    //   }, 0)
    // }
  }
})
