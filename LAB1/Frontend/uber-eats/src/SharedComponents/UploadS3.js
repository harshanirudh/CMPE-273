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
export let uploadDishImages=(file)=>{
    let dishConfig={}
    Object.assign(dishConfig,S3config)
    dishConfig.dirName="dishes/"
    return S3FileUpload.uploadFile(file,dishConfig);
}
export let uploadRestImages=(file)=>{
    let restConfig={}
    Object.assign(restConfig,S3config)
    restConfig.dirName="restImages/"
    return S3FileUpload.uploadFile(file,restConfig);
}
