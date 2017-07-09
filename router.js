//req represents the incoming http req, include req data
//res represents the response we'll format and return back
//next is mostly for err handling
module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send(['water', 'phone', 'paper']);
  });
}
