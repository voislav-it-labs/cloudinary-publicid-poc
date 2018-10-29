process.env.CLOUDINARY_URL = 'cloudinary://745589236511972:plw6ol1mswqDb84a5Dy9uJoOO-4@itlabs';

const cloudinary = require('cloudinary');

function uploadImage(publicId, folder, useFilename, uniqueFilename, context) {
    const options = {};
    if (!!publicId) {
        options.public_id = publicId;
    }
    if (typeof folder === 'string') {
        options.folder = folder;
    }
    if (typeof useFilename === 'boolean') {
        options.use_filename = useFilename;
    }
    if (typeof uniqueFilename === 'boolean') {
        options.unique_filename = uniqueFilename;
    }

    if (context) {
        options.context = context;
    }

    cloudinary.uploader.upload('sample.jpg', function(result) {
        console.log('Request parameters:');
        console.log('public id:', publicId);
        console.log('folder:', folder);
        console.log('use filename:', useFilename);
        console.log('unique filename:', uniqueFilename);
        console.log('Response public id:', result.public_id);
        console.log('\r\n=======================\r\n');
    }, options);
}

let randomPublicId = () => 'new-image-public-id-' + Math.round(Math.random() * 1000);

uploadImage(null, null, false, false);
uploadImage(randomPublicId(), null, false, false);
uploadImage(null, null, true, false);
uploadImage(null, null, true, true);
uploadImage(null, 'folderOne/folderTwo', false, false);
uploadImage(null, 'folderOne/folderTwo', true, false);
uploadImage(null, 'folderOne/folderTwo', true, true);


function uploadAndTagFolderName(folderName, callback) {
    cloudinary.uploader.upload('sample.jpg', callback, {context: `folder=${folderName}`, use_filename: true, unique_filename: true})
}

function findImagesInFolder(folderName, callback) {
    cloudinary.v2.search
        .expression(`context.folder=${folderName}`)
        .execute()
        .then(result => {
            console.log(result);
            callback && callback(result);
        });
}

const folderName = 'hsbc/shared-images';

uploadAndTagFolderName(folderName, function(result) {
    console.log('image uploaded to folder', folderName, result);
    setTimeout(() => findImagesInFolder(folderName), 1000);
});