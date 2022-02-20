import App from './application'

(async function(){ 
  try {
    const app = new App();
    await app.start();
  } catch (error) {
    console.log(error);
    process.exit(1);  
  }
})();

process.on('uncaughtException', error => {
  console.log('uncaughtException', error)
  process.exit(1);
})

process.on('UnhandledPromiseRejectionWarning', error => {
  console.log('uncaughtException', error)
  process.exit(1);
})