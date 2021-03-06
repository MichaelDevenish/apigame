module.exports = function(app) {
  var Game = require('../controllers/controller');

  app.get('/', (req, res) => {
          //testing if files have been added to the docker correctly
          var contents = fs.readFileSync('src/test.txt','utf8');
          //testing id generation
          var id = intformat(idgen1.next(),'hex');
         // res.send('Your unique API key is:' + id + ' Ctest:'+contents );
          res.render('index',{id: id, contents: contents});
          //show a help page
  });

  app.get('/:tagId/:tag1/:tag2', function(req, res) {
  		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
          var a = req.params.tagId;
          var items = [req.params.tag1,req.params.tag2];
          var json = req.query.json;
          if(json != 'true'){
              res.render('other',{contents: a});
          }else{
          	var obj = new Object();
  	        obj.APIkey = a;
  	        obj.input = b;
  	        obj.command = c;
  	        res.json(obj);
          }
  });

  app.get('/:tagId/:tag1', function(req, res) {
  		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test
          var a = req.params.tagId;
          var b = [req.params.tag1];
          var json = req.query.json;
          if(json != 'true'){
               res.render('other',{contents: JSON.stringify(weaponz.generateWeapon())});
          }else{
              var obj = new Object();
  	        obj.APIkey = a;
  	        obj.input = b;
  	        res.json(obj);
          }
  });

  // todoList Routes
  app.route('/test')
    .get(Game.list_test)
    .post(Game.save_test);
}
