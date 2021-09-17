import S3FileUpload from 'react-s3';

export let S3config = {
    bucketName: 'ubereats-harsha',
    dirName: 'profilePics', /* optional */
    region: 'us-west-1',
    accessKeyId: 'AKIAVDV7U5IG5A5TDZS4',
    secretAccessKey: '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',
}


export let uploadProfilePics = (file) => {
    S3FileUpload
        .uploadFile(file, S3config)
        .then(data => {
            // console.log(data)
            return data.location;
        })
        .catch(err => console.error(err))
}
