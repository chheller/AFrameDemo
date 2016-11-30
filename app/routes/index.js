var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cubeSchema = new Schema( {
  position : String,
  rotation : String,
  color : String,
  depth : Number,
  width : Number,
  height : Number
}, {collection: 'cubecollection'});
var cube = mongoose.model('cube', cubeSchema);

var sphereSchema = new Schema( {
  position : String,
  rotation : String,
  color : String,
  radius : Number
}, {collection: 'spherecollection'});
var sphere = mongoose.model('sphere', sphereSchema);

var cylinderSchema = new Schema( {
  position : String,
  rotation : String,
  color : String,
  radius : Number,
  height : Number
}, {collection: 'cylindercollection'});
var cylinder = mongoose.model('cylinder', cylinderSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Resume', function(req, res, next) {
  res.render('Resume');
});
router.get('/NGU', function(req, res, next) {
  res.render('WebGL', {data: ['NGU', 'WebGl%20Testing']});
});
router.get('/ABTest', function(req, res, next) {
  res.render('WebGL', {data: ['ABTest%20WebGL', 'ABTest%20WebGL']});
});
router.get('/AFrameDemo', function(req, res, next) {
  res.render('aframe');
});



router.post('/clearcollection', function(req, res, next) {
  var coll = req.body.collection;
  req.app.locals.db.collections[coll].drop(function(err) {
    if (err)
      console.log("There was an error dropping the collection");

    else
      console.log("Collection succesfully dropped");

  });
});

router.post('/showcubes', function(req, res, next) {
  var out = [];
  cube.find({}, function(err, doc) {
      if (err)
        return console.error(err);
      for(var i = 0; i < doc.length; i++) {
        var string = '<a-box position= "'+doc[i].position+'", \
        rotation= "'+doc[i].rotation+'", \
        color= "#'+doc[i].color+'",  \
        depth= '+doc[i].depth+',  \
        width= '+doc[i].width+',  \
        height= '+doc[i].height+' \
      ></a-box>'
        out.push(string);
      }
      res.send(out);
    });
});

router.post('/showspheres', function(req, res, next) {
  var out = [];
  sphere.find({}, function(err, doc) {
      if (err)
        return console.error(err);
      for(var i = 0; i < doc.length; i++) {
        var string = '<a-sphere position= "'+doc[i].position+'", \
        rotation= "'+doc[i].rotation+'", \
        color= "#'+doc[i].color+'",  \
        radius= '+doc[i].radius+'  \
      ></a-sphere>'
        out.push(string);
      }
      res.send(out);
    });
});

router.post('/showcylinders', function(req, res, next) {
  var out = [];
  cylinder.find({}, function(err, doc) {
      if (err)
        return console.error(err);
      for(var i = 0; i < doc.length; i++) {
        var string = '<a-cylinder position= "'+doc[i].position+'", \
        rotation= "'+doc[i].rotation+'", \
        color= "#'+doc[i].color+'",  \
        radius= '+doc[i].radius+'  \
        height= '+doc[i].height+'  \
      ></a-cylinder>'
        out.push(string);
      }
      res.send(out);
    });
});

router.post('/AFrameForm', function(req, res, next) {
  var db = req.db;
  var data = req.body.data;
  var shape = req.body.shape_filter;
  var pos = req.body.posx + " " + req.body.posy + " " + req.body.posz;
  var rot = req.body.rotx + " " + req.body.roty + " " + req.body.rotz;
  if(shape == 0) {
      var out = new cube({position : pos, rotation : rot, color : req.body.color, depth : req.body.depth, width : req.body.width, height : req.body.height});
      out.save(function(err, out) {
        if (err) return console.error(err);
        else {
          console.log(out);
          res.send("Cube successfully saved!")
        }
      });
    }
    else if (shape == 1) {
    var out = new sphere({position : pos, rotation : rot, color : req.body.color,radius : req.body.radius});
    out.save(function(err, out) {
      if (err) return console.error(err);
      else {
        console.log(out);
        res.send("Sphere successfully saved!")
      }
    });
  }
  if(shape == 2) {
    var out = new cylinder({position : pos, rotation : rot, color : req.body.color, radius : req.body.radius, height : req.body.height});
    out.save(function(err, out) {
      if (err) return console.error(err);
      else {
      console.log(out);
      res.send("Cylinder successfully saved!")
      }
    });
  }
});
module.exports = router;
