import S3FileUpload from 'react-s3';

let config = {
    bucketName: 'ubereats-harsha',
    dirName: 'profilePics', /* optional */
    region: 'us-west-1',
    accessKeyId: 'AKIAVDV7U5IG5A5TDZS4',
    secretAccessKey: 'k3aaWVT0uDDpTwZVjkRB8YZtL7GagnQG2ckfl6BC',
}

/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */


export let uploadProfilePics = (file) => {
    S3FileUpload
        .uploadFile(file, config)
        .then(data => {
            console.log(data)
            return data.location;
        })
        .catch(err => console.error(err))
}