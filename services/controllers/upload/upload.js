const path = require('path');
const fs = require('fs');

const upload = (ctx) => {
  console.log(JSON.stringify(ctx.request, null, ''));
  let remoteFilePath = null;

  if (ctx.request.file['file']) {
    console.log(1)
  }
}

module.exports = upload;
