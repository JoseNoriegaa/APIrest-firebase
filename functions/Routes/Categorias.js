var Categorias = require('../staticLogs/Categorias.json');
var Palabras = require('../staticLogs/Palabras.json');


module.exports = function (app) {

  app.get('/categorias', function(req, res) {
    res.send(Categorias);
  })

  app.get('/categoria/:id', function(req, res) {

    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Categorias.filter(x => x.categoria == id.toUpperCase()).length >= 1) {
        var item = Categorias.filter(x => x.categoria == id.toUpperCase());
        res.send(item);
      }else {
        res.send(" id ("+id+") doesn't exist");
      }

    }else {
      res.send(catchNulls(id,names));

    }

  })

  app.delete('/categoria/:id', function(req, res) {
    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Categorias.filter(x => x.categoria == id.toUpperCase()).length >= 1) {

        var model = {
          "Elementos_Eliminados" : []
        }
        var item = Categorias.filter(x => x.categoria == id.toUpperCase());

        Categorias = Categorias.filter(x => x.categoria != id.toUpperCase())
        model.Elementos_Eliminados.push(item[0]);

        // var counter=0;
        // for (var i = 0; i < Palabras.length; i++) {
        //
        //   if (Palabras[i].CATEGORIA=id.toUpperCase()) {
        //       counter++;
        //       Palabras = Palabras.filter(x => x.CATEGORIA != id.toUpperCase());
        //
        //   }
        //
        // }
        //
        // model.Elementos_Eliminados.push({"Palabras":counter});



        res.send(model);

      }else {
        res.send(" id ("+id+") doesn't exist");
      }

    }else {
      res.send(catchNulls(id,names));
    }

  })


  app.post('/categoria', function (req, res) {

    var { id } = req.body;
    var params = id;
    var names =["id"];

    var model = {
      "categoria": id.toUpperCase(),
    }

    if (nullParameters(params)) {

        if (Categorias.filter(x => x.categoria == id.toUpperCase()).length == 0)  {

            Categorias.push(model);
            res.send(model);
        }else {
          res.send(id +" already exist")
        }

    }else {
      res.send(catchNulls(params,names));
    }

  })




  app.put('/categoria/:id', function (req, res) {

    var currentID = req.params.id;
    var { id } = req.body;

    var params= [id];
    var names=["id"];

    var model = {
      "categoria": id.toUpperCase(),
    }

    if (nullParameters(params)) {

      if (!(Categorias.filter(x => x.categoria == currentID.toUpperCase()).length < 1) ) {

      if (Categorias.filter(x => x.categoria == id.toUpperCase() && x != Categorias[Categorias.findIndex(x => x.categoria == currentID.toUpperCase())] ).length == 0 )  {

          Categorias[Categorias.findIndex(x => x.categoria==currentID.toUpperCase())] = model;

          res.send(model);

      }else {
        res.send(id +" already exist")
      }
    }else {
      res.send(" category ("+currentID+") doesn't exist")
    }

    }else {
      res.send(catchNulls(params,names));
    }
  })


}//-------- end module exports


function nullParameters (items) {

  if (typeof(items)=='object') {
    for (var i = 0; i < items.length; i++) {
      items[i]=items[i].trim();
      if (items[i]==null || items[i]=='' || items[i]=='undefined' ) {
        return false;
      }
    }
  }else {
    items=items.trim();

    if (items==null || items=='' || items=='undefined') {
      return false;
    }
  }

  return true;

}

function catchNulls (items,names) {
  var model= {
    "null_value":[]
  }

  if (typeof(items)=='object') {
    for (var i = 0; i < items.length; i++) {
      items[i]=items[i].trim();
      if (items[i]==null || items[i]=='' || items[i]=='undefined' ) {
        model.null_value.push(names[i]);
      }
    }
    return model;
  }else {
    items=items.trim();

    if (items==null || items=='' || items=='undefined') {
      model.null_value.push(names);
    }
    return model
  }

  return true;
}
