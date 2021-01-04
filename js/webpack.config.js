const path = require("path")
module.exported={
    mode:'development',
    entry:"../src/index.js",
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,'dist')
    }
}