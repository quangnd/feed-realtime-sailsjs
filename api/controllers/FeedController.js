/**
 * FeedController
 *
 * @description :: Server-side logic for managing feeds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe: function(req, res) {
		if (!req.isSocket) {
			return res.badRequest();
		}

		sails.sockets.join(req.socket, 'feed');
		return res.ok();
  },

  helloSocket: function(req, res) {
    if (req.isSocket) {
      return res.json({
        WebSocketId: sails.sockets.getId(req),
        hello: 'socket'
      })
    }

    return res.json({
      hello: 'world'
    })
  }
};

