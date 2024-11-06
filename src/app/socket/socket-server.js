const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
const clients = new Map();
server.on('connection', socket => {
  const id = Math.random().toString(36).substr(2, 9);
  clients.set(socket, id);
  socket.on('message', message => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'offer':
      case 'answer':
      case 'candidate':
        for (const [client, clientId] of clients.entries()) {
          if (client !== socket) {
            client.send(JSON.stringify(data));
          }
        }
        break;
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});

