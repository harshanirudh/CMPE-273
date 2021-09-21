import S3FileUpload from 'react-s3';

export let S3config = {
    bucketName: 'ubereats-harsha',
    dirName: 'profilePics', /* optional */
    region: 'us-west-1',
    accessKeyId: 'AKIAVDV7U5IG5A5TDZS4',
    secretAccessKey: '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',
}


export let uploadProfilePics = (file) => {
    
    return S3FileUpload.uploadFile(file, S3config);
        
}
