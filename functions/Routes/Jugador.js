var Jugadores = require('../staticLogs/jugador.json');
var mode = require('../staticLogs/Dificultades.json');


module.exports = function (app) {

  app.get('/jugadores', function(req, res) {
    res.send(Jugadores);
  })

  app.get('/jugador/:id', function(req, res) {
    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Jugadores.filter(x => x.ID_JUGADOR == id).length >= 1) {
        var item = Jugadores.filter(x => x.ID_JUGADOR == id);
        res.send(item);

      }else {
        res.send(" id ("+id+") doesn't exist");
      }

    }else {
      res.send(catchNulls(id,names));

    }

  })

  app.delete('/jugador/:id', function(req, res) {
    var { id } = req.params;
    var names="id";

    if (nullParameters(id)) {
      if (Jugadores.filter(x => x.ID_JUGADOR == id).length >= 1) {

        var item = Jugadores.filter(x => x.ID_JUGADOR == id);
        Jugadores = Jugadores.filter(x => x.ID_JUGADOR != id)
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


  app.post('/jugador', function (req, res) {

    var { usuario, puntos, dificultad} = req.body;

    var params= [usuario, puntos, dificultad];
    var names=["usuario","puntos","dificultad"];
    var lastID=(Jugadores[Jugadores.length-1].ID_JUGADOR)+1;

    var model = {
      "ID_JUGADOR": lastID,
      "USUARIO": usuario.toUpperCase(),
      "PUNTOS": puntos,
      "DIFICULTAD": dificultad.toUpperCase()
    }

    if (nullParameters(params)) {
      if (nullParameters(mode.filter(x => x.DIFICULTAD == dificultad.toUpperCase())[0]) ) {
        if (Jugadores.filter(x => x.USUARIO == usuario.toUpperCase() && x.DIFICULTAD == dificultad.toUpperCase()).length == 0)  {
            Jugadores.push(model);
            res.send(model);
        }else {
          res.send(usuario +" already exist")
        }
      }else {
        res.send({"game_mode_not_found": dificultad});
      }

    }else {
      res.send(catchNulls(params,names));
    }
  })




  app.put('/jugador/:id', function (req, res) {
    var { id } = req.params;
    var { usuario, puntos, dificultad } = req.body;

    var params= [usuario, puntos, dificultad];
    var names=["usuario","puntos","dificultad"];

    var model = {
      "ID_JUGADOR": id,
      "USUARIO": usuario.toUpperCase(),
      "PUNTOS": puntos.toUpperCase(),
      "DIFICULTAD": dificultad.toUpperCase()
    }

    if (nullParameters(params)) {
      if (!(Jugadores.filter(x => x.ID_JUGADOR == id  ).length < 1) ) {

      if (Jugadores.filter(x => x.USUARIO == usuario.toUpperCase() && x != Jugadores[Jugadores.findIndex(x => x.ID_JUGADOR==id)] ).length == 0 )  {

        if (nullParameters(mode.filter(x => x.DIFICULTAD == dificultad.toUpperCase())[0]) ) {

          Jugadores[Jugadores.findIndex(x => x.ID_JUGADOR==id)] = model;

          res.send(model);
        }else {
          res.send({"game_mode_not_found": dificultad});
        }
      }else {
        res.send(usuario +" already exist")
      }
    }else {
      res.send(" id ("+id+") doesn't exist")
    }

    }else {
      res.send(catchNulls(params,names));
    }
  })





} //------ end module exports



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
