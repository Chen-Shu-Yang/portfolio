const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const serveStatic = require('serve-static');
const enforce = require('express-sslify');

// set hostname and portnumber
const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.path);
  console.log(req.query.id);

  if (req.method !== 'GET') {
    res.type('.html');
    const msg = '<html><body>This server only serves web pages with GET!</body></html>';
    res.end(msg);
  } else {
    next();
  }
});

// go to homepage
app.get('/', (req, res) => {
  res.sendFile('/public/html/home.html', { root: __dirname });
});

app.get('/projects', (req, res) => {
  res.sendFile('/public/html/projects.html', { root: __dirname });
});

app.get('/projectdtl', (req, res) => {
  res.sendFile('/public/html/projectDtl.html', { root: __dirname });
});

app.get('/downloadcv', (req, res) => {
  res.sendFile('/public/docs/myResume.pdf', { root: __dirname });
});

app.get('/downloadrefletter', (req, res) => {
  res.sendFile('/public/docs/OBS_Ref_Letter.pdf', { root: __dirname });
});

// retrieve from public folder
app.use(serveStatic(`${__dirname}/public`));

app.listen(port, hostname, () => {
  console.log(`Server hosted at http://${hostname}:${port}`);
});
