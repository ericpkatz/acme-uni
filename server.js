const { syncAndSeed } = require('./db');
const app = require('./app');

const port = process.env.PORT || 3000;

const init = async()=> {
  try {
    app.listen(port, ()=> console.log(`listening on port ${port}`));
    await syncAndSeed();
  }
  catch(ex){
    console.log(ex);
  }
}

init();
