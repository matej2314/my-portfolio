const path = require('path');

 exports.extractScreenName = (file) =>  {
    if (!file || !file.filename) {
        throw new Error('Invalid file object');
    }
    const fileWithoutExtension = path.parse(file.filename).name;
    return fileWithoutExtension.replace(/-.+$/, '');
};

