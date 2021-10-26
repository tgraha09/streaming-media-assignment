const http = require('http');
const htmlHandler = require('./htmlResponses');
const mediaHandler = require('./mediaResponses');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || process.env.NODE_PORT || process.env.MONGODB_URI|| 3000;
// console.log(index);


const uri = "mongodb+srv://tfire09:Facetime217!@cluster0.qga9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if(err === "Y"){
    console.log(err)
  }
  const collection = client.db("test").collection("devices");
  console.log(collection)
  // perform actions on the collection object
  client.close();
});
const onRequest = (request, response) => {
  const { url } = request;

  console.log(`url: ${request.url}`);
  switch (url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/client2':
      htmlHandler.getIndex2(request, response);
      break;
    case '/client3':
      htmlHandler.getIndex3(request, response);
      break;
    case '/party.mp4':
      mediaHandler.getParty(request, response);
      break;
    case '/bling.mp3':
      mediaHandler.getBling(request, response);
      break;
    case '/bird.mp4':
      mediaHandler.getBird(request, response);

      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
