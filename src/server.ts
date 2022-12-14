import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;


  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;

    if (!image_url) {
      return res.status(422).send({ message: 'The image url is required.' });
    }

    try {
      console.log("filter image begin:" + image_url);
      let imagePath: string = await filterImageFromURL(image_url);
      console.log("filter image end:" + imagePath);
      return res.status(200).sendFile(imagePath, () => { deleteLocalFiles([imagePath]) });
    }
    catch
    {
      return res.status(500).send("Failed to filter image from URL.");
    }
   
  })

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("Hey, this is Kevin, try GET /filteredimage?image_url={{}} ");
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();