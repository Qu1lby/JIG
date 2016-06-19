/* Handles the socket.IO requests */

module.exports = function(app, database, io) {

  /** **When there is a connection to socket.IO :**/
  io.sockets.on('connection', function(socket) {

    /** **Add an event** */
    socket.on('add_event', function(data) {
      myQuery = "INSERT INTO evenements(libelle) VALUES(" + database.escape(data.lib_event) + ")";
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Évenement ajouté avec succès !"
      });
    });

    /** **Add points** */
    socket.on('add_point', function(data) {
      myQuery = "INSERT INTO points(id_groupe, points) VALUES(" + data.id_groupe + ", " + data.points + ")";
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Points ajoutés avec succès !"
      });
    });

    /** **Add paris** */
    socket.on('add_pari', function(data) {
      myQuery = "INSERT INTO pari VALUES(" + data.id_event + ", " + data.id_groupe + ", " + data.id_groupe_pari + ", " + data.points + ")";
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Pari ajouté avec succès !"
      });
    });

    /** **Delete an event** */
    socket.on('del_pari', function(data) {
      myQuery = "DELETE FROM pari WHERE id = " + data.id_pari;
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Pari supprimé avec succès !"
      });
    });

    /** **Delete an event** */
    socket.on('del_point', function(data) {
      myQuery = "DELETE FROM points WHERE id = " + data.id_point;
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Points supprimés avec succès !"
      });
    });

    /** **Delete an event** */
    socket.on('del_event', function(data) {
      myQuery = "DELETE FROM evenements WHERE id = " + data.id_event;
      database.executeQuery(myQuery);
      socket.emit('end', {
        msg: "Évenement supprimé avec succès !"
      });
    });

    /** **Reset data on DB** */
    socket.on('reset_data', function(data) {
      myQuery1 = "DELETE FROM pari";
      myQuery2 = "DELETE FROM points";
      myQuery3 = "DELETE FROM evenements";
      //database.executeQuery(myQuery1);
      //database.executeQuery(myQuery2);
      //database.executeQuery(myQuery3);
      socket.emit('end', {
        msg: "Base de données réinitialisée !"
      });
    });
  });
}
