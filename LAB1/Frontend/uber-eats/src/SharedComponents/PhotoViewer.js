import React from 'react'
import ImageGallery from 'react-image-gallery';

let images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/1000/600/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/1000/600/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },

];

class PhotoViewer extends React.Component {
    constructor(props) {
        super(props)
        this.imageGallery = React.createRef()
        this.fileInput = React.createRef()
        this.state = {
            imagesArr: images
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
    handleAddButton = () => {
        this.fileInput.current.click();
    }
    renderAddButton =
        <div className="col-md-6 text-center">
            <button className="btn btn-primary " onClick={this.handleAddButton}>Add Image</button>
            <input type='file' ref={this.fileInput} style={{ display: 'none' }} />
        </div>


    render() {
        if (images.length === 0) {
            return (
                <div className="container-fluid">
                    <br></br>
                    <div className="col-md-6 text-center">
                        <button className="btn btn-primary " onClick={this.handleAddButton}>Add Image</button>
                        <input type='file' ref={this.fileInput} style={{ display: 'none' }} />
                    </div>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                <ImageGallery ref={i => this.imageGallery = i}
                    items={images} showIndex={true}
                    onClick={(e) => this.setState(this.handleClickEVent(e))} />
                <br></br>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button className="btn btn-primary " onClick={this.handleAddButton}>Add Image</button>
                        <input type='file' ref={this.fileInput} style={{ display: 'none' }} />
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