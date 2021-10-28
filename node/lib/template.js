module.exports = {
  html: (fileList) => {
    let list = '<ol>';
    for (let file of fileList) {
      list += '<li>' + file + '</li>'
    }
    list += '</ol>';

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <h1>Web</h1>
        </head>
        <body>
        ${list}
        `;
  }
}
