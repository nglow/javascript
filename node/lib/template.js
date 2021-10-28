module.exports = {
  html: (idList, titleList) => {
    let list = '<ol>';
    for (let i in titleList) {
      list += `<li><a href="/?id=${idList[i]}">` + titleList[i] + '</a></li>'
    }
    list += '</ol>';

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <h1><a href="/">Web</a></h1>
        </head>
        <body>
        ${list}
        `;
  }
}
