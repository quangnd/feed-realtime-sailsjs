/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  joinChat: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, 'chatRoom1');
    var clientId = sails.sockets.getId(req);
    console.log(clientId + ' joined');

    return res.ok();
  },


  create: function (req, res) {
    Chat.create({
      message: req.param('message'),
      sender: req.param('userId')
    }).exec(function(err, createdChat) {
      if (err) {
        return res.negotiate(err);
      }

      User.findOne({
        id: req.param('userId')
      }).exec(function(err, foundUser) {
        if (err) {
          return res.negotiate(err);
        }
        if (!foundUser) {
          return res.notFound();
        }
        var data = {
          message: req.param('message'),
          username: foundUser.username,
          created: 'Just now'
        };
        sails.sockets.broadcast('chatRoom1', 'chat', data);

        return res.ok(data);
      })
    })
  }
};

