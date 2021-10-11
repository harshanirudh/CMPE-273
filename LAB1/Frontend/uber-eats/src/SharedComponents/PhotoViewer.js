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
        this.setState({images:[...images]})

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
                let obj={
                    original:imgLocation,
                    thumbnail:imgLocation
                }
                let newArr;
                if(this.state.imagesArr.length==0){
                    newArr=obj;
                }else{
                    newArr=[...this.state.imagesArr,obj]
                }
                // this.setState((prevState) => ({
                //     imageToggle: !prevState.imageToggle,
                //     imagesArr: newArr
                // }))
                this.setState({imagesArr:newArr})
                window.location.reload();
                console.log(`state :${this.state.imageToggle}`)
            }).catch((err) => {
                console.log(err)
            })

        }

    }
    async getAllImages() {
        let url = `${baseUrl}/restaurant/images/${this.props.restId}`;
        return await axios.get(url);

    }
    componentDidMount() {
        console.log('Calling get images from didmount')
        this.getAllImages().then((res => {
            images = [] //make array empty
            res.data.map((imageObj) => {
                images.push({
                    "REST_ID": imageObj.REST_ID,
                    "IMAGE_ID": imageObj.IMAGE_ID,
                    "original": imageObj.IMAGE,
                    "thumbnail": imageObj.IMAGE
                })
            })
            this.setState({ imagesArr: images })
        }))
    }
    componentDidUpdate() {
        console.log('Calling get images from didupdate')
        this.getAllImages().then((res => {
            images = []
            res.data.map((imageObj) => {
                images.push({
                    "REST_ID": imageObj.REST_ID,
                    "IMAGE_ID": imageObj.IMAGE_ID,
                    "original": imageObj.IMAGE,
                    "thumbnail": imageObj.IMAGE
                })
            })
            // this.setState({images:images})
        }))
    }
    
    render() {
        // whne there are no restaurant images
        if (images.length === 0) {
            return (
                this.props.viewBy === 'customer' ? (
                    //View for Customer 
                    <div className="jumbotron jumbotron-fluid " style={{marginTop:"75px"}}>
                        <div className="container ">
                            <h1 className="display-4 text-center">No Restaurant Images</h1>
                            <p className="lead text-center" >Restaurant Has not Uploaded any images</p>
                        </div>
                    </div>
                ) : (
                    // View for Restaurant user
                    <div className="container-fluid"  style={{marginTop:"75px"}}>
                        {/* <h2 className="text-center mb-4">Images</h2> */}
                        <br></br>
                        <div className="row mb-3">
                            <div className="col-md-6 text-center">
                                <input type='file' ref={this.fileInput} accept="image/png, image/gif, image/jpeg"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <button className="btn btn-primary " onClick={() => this.handleAddButton()}>Add Image</button>

                            </div>
                        </div>
                    </div>
                )
            )
        }
        return (
            //When images are peresent
            <div className="container-fluid " style={{marginTop:"75px"}}>
                {/* <h2 className="text-center mb-4">Images</h2> */}
                <ImageGallery ref={i => this.imageGallery = i}
                    items={this.state.imagesArr} showIndex={true}
                    onClick={(e) => this.setState(this.handleClickEVent(e))} />
                <br></br>
                {this.props.viewBy === 'customer' ? '' : (
                    // View for restuarant user
                    <div>
                        <div className="row mb-3">
                            <div className="col-md-6 text-center">
                                <input type='file' ref={this.fileInput} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <button className="btn btn-primary " onClick={() => this.handleAddButton()}>Add Image</button>
                            </div>
                            {/* <div className="col-md-6 text-center">
                                <button className="btn btn-danger" onClick={this.handleDeleteButton}>Delete Image</button>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default PhotoViewer