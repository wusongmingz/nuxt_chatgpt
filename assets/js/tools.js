const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return decodeURI(pair[1]);
    }
  }
  return (false);
}

const isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') != -1
}

const getAssetsFile = (url = '') => {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}
const judgeClient = () => {
  let client = '';
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
    client = 'ios';
  } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
    client = 'android';
  } else {
    client = 'pc';
  }
  return client;
}

const getFileType = (filename) => {
  //根据文件名返回对应文件类型
  let type = "unknown";
  if (!filename) return type;
  let index = filename.lastIndexOf(".");
  let extension = filename.substr(index + 1);
  extension = extension.split('?')[0];
  extension = extension.toLowerCase();
  // console.log('2',extension)
  // const typeMap = {
  //   img: ["gif", "jpg", "jpeg", "png", "bmp", "webp", "ico", 'psd', 'svg', 'tiff'],
  //   video: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv", "VIDEO"],
  //   audio: ["mp3", "wav", "wma", "ogg", "aac", "flac"],
  //   doc: ["doc", "txt", "docx", "pages", "epub", "numbers", "keynote", 'km'],
  //   //document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
  //   ppt: ["ppt", "pptx"],
  //   xls: ["csv", "xls", "xlsx"],
  //   pdf: ["pdf"],
  //   mind: ['km', 'mm', 'mmap', 'xmind'],
  //   zip: ["rar", "zip", "7z", "jar", "gz"]
  // };
  // Object.keys(typeMap).forEach(_type => {
  //   const extensions = typeMap[_type];
  //   if (extensions.indexOf(extension) > -1) {
  //     type = _type;
  //     return type;
  //   }
  // });
  return extension;
}

const getfilesize = (size) => {
  if (!size)
    return 0;
  let num = 1024.00; //byte
  if (size < num)
    return size + "B";
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(2) + "K"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

export {
  getQueryVariable,
  getAssetsFile,
  judgeClient,
  getFileType,
  getfilesize,
  isWeixin
}