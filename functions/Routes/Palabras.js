var Palabras = require('../staticLogs/Palabras.json');
var Categorias = require('../staticLogs/Categorias.json');

module.exports= function (app) {


  app.get('/palabras', function(req, res) {
    res.send(Palabras);
  })
  // validar si el elemento existe

  app.get('/palabra/:id', function(req, res) {

    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Palabras.filter(x => x.ID_PALABRAS == id).length >= 1) {
        var item = Palabras.filter(x => x.ID_PALABRAS == id);
        res.send(item);

      }else {
        res.send(" id ("+id+") doesn't exist");
      }

    }else {
      res.send(catchNulls(id,names));

    }

  })
// validar si el elemento existe
  app.delete('/palabra/:id', function (req, res) {

    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Palabras.filter(x => x.ID_PALABRAS == id).length >= 1) {

        var item = Palabras.filter(x => x.ID_PALABRAS == id);
        Palabras = Palabras.filter(x => x.ID_PALABRAS != id)
        var model = {
          "Elementos Eliminados" : item[0]
        }
        res.send(model);

      }else {
        res.send(" id ("+id+") doesn't exist");
      }

    }else {
      res.send(catchNulls(id,names));
    }

  })



  app.post('/palabra', function (req, res) {

    var { palabra, categoria, pista} = req.body;

    var params= [palabra, categoria, pista];
    var names=["palabra","categoria","pista"];
    var lastID=(Palabras[Palabras.length-1].ID_PALABRAS)+1;
    var model = {
      "ID_PALABRAS": lastID,
      "NO_CARACTERES": palabra.length,
      "PALABRA": palabra.toUpperCase(),
      "CATEGORIA": categoria.toUpperCase(),
      "PISTA": pista.toUpperCase()
    }
    if (nullParameters(params)) {
      if (Palabras.filter(x => x.PALABRA == palabra.toUpperCase()).length == 0)  {

        if (nullParameters(Categorias.filter(x => x.categoria == categoria.toUpperCase())[0]) ) {
          Palabras.push(model);
          res.send(model);
        }else {
          res.send({"category-not-found": categoria});
        }
      }else {
        res.send(palabra +" already exist")
      }

    }else {
      res.send(catchNulls(params,names));
    }
  })



  app.put('/palabra/:id', function (req, res) {
    var { id } = req.params;
    var { palabra, categoria, pista} = req.body;

    var params= [ palabra, categoria, pista];
    var names=["palabra","categoria","pista"];

    var model = {
      "ID_PALABRAS": id,
      "NO_CARACTERES": palabra.length,
      "PALABRA": palabra.toUpperCase(),
      "CATEGORIA": categoria.toUpperCase(),
      "PISTA": pista.toUpperCase()
    }

    if (nullParameters(params)) {
      if (!(Palabras.filter(x => x.ID_PALABRAS == id  ).length < 1) ) {

      if (Palabras.filter(x => x.PALABRA == palabra.toUpperCase() && x != Palabras[Palabras.findIndex(x => x.ID_PALABRAS==id)] ).length == 0 )  {

        if (nullParameters(Categorias.filter(x => x.categoria == categoria.toUpperCase())[0]) ) {

          Palabras[Palabras.findIndex(x => x.ID_PALABRAS==id)]= model;

          res.send(model);
        }else {
          res.send({"category-not-found": categoria});
        }
      }else {
        res.send(palabra +" already exist")
      }
    }else {
      res.send(" id ("+id+") doesn't exist")
    }

    }else {
      res.send(catchNulls(params,names));
    }
  })

} //----------- end module exports

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
