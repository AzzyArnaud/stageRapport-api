const Upload = require("../Upload");
const path = require('path');
const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS");

class ArticlesUpload extends Upload
{
          constructor() {
                    super()
                    this.destinationPath = path.resolve('./') + path.sep + 'public' + IMAGES_DESTINATIONS.aticles
          }
}
module.exports = ArticlesUpload