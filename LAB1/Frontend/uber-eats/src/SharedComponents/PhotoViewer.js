import axios from 'axios';
import React from 'react'
import ImageGallery from 'react-image-gallery';
import { baseUrl } from '../apiConfig';
import { uploadRestImages } from './UploadS3';

let images = [];

class PhotoViewer extends React.Component {
    constructor(props) {
        super(props)
        this.imageGallery = React.createRef()
        this.fileInput = React.createRef()
        this.state = {
            imagesArr: images,
            imageToggle: false
        }
    }
    handleClickEVent = (e) => {
        // let index = this._imageGallery.getCurrentIndex();
        // console.log('clicked on image', e.target, 'at index', index);

    }
    handleDeleteButton = () => {
        console.log('clicked on image at index', this.imageGallery.getCurrentIndex());
        let index = this.imageGallery.getCurrentIndex();
        images.splice(index, 1);
        this.setState((
            images
        ))

    }
    async handleAddButton() {
        // this.fileInput.current.click();
        let file = this.fileInput.current.files[0]
        if (file) {
            let [filename, ext] = file.name.split(".")
            let newname = filename + new Date().valueOf() + "." + ext;
            let newFile = new File([file], newname)
            let imgLocation = await (await uploadRestImages(newFile)).location
            console.log(imgLocation);
            let url = `${baseUrl}/restaurant/images/${this.props.restId}`
            axios.post(url, { 'img': imgLocation }).then((res) => {
                this.setState((prevState) => ({
                    imageToggle: !prevState.imageToggle,
                    images:images
                }))
            console.log(`state :${this.state.imageToggle}`)
            }).catch((err) => {
                console.log(err)
            })

        }

    }
    async getAllImages(){
        let url = `${baseUrl}/restaurant/images/${this.props.restId}`;
        return await axios.get(url);
        
    }
    componentDidMount(){
        console.log('Calling get images from didmount')
        this.getAllImages().then((res=>{
            images=[] //make array empty
            res.data.map((imageObj)=>{
                images.push({
                    "REST_ID":imageObj.REST_ID,
                    "IMAGE_ID":imageObj.IMAGE_ID,
                    "original":imageObj.IMAGE,
                    "thumbnail":imageObj.IMAGE
                })
            })
            this.setState({images:images})
        }))
    }
    componentDidUpdate(){
        console.log('Calling get images from didupdate')
        this.getAllImages().then((res=>{
            images=[]
            res.data.map((imageObj)=>{
                images.push({
                    "REST_ID":imageObj.REST_ID,
                    "IMAGE_ID":imageObj.IMAGE_ID,
                    "original":imageObj.IMAGE,
                    "thumbnail":imageObj.IMAGE
                })
            })
            // this.setState({images:images})
        }))
    }

    render() {
        if (images.length === 0) {
            return (
                <div className="container-fluid">
                    <h2 className="text-center mb-4">Images</h2>
                    <br></br>
                    <div className="row mb-3">
                        <div className="col-md-6 text-center">
                            <input type='file' ref={this.fileInput} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <button className="btn btn-primary " onClick={() => this.handleAddButton()}>Add Image</button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                <h2 className="text-center mb-4">Images</h2>
                <ImageGallery ref={i => this.imageGallery = i}
                    items={images} showIndex={true}
                    onClick={(e) => this.setState(this.handleClickEVent(e))} />
                <br></br>
                <div className="row mb-3">
                    <div className="col-md-6 text-center">
                        <input type='file' ref={this.fileInput} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <button className="btn btn-primary " onClick={() => this.handleAddButton()}>Add Image</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button className="btn btn-danger" onClick={this.handleDeleteButton}>Delete Image</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotoViewer