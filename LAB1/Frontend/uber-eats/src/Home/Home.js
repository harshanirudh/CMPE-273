import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import NavComponent from '../SharedComponents/NavComponent';
export class Home extends Component {
    images = [
        {
            "original": "https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/WBC_7095.jpg?format=2500w"
        },
        {
            "original": "https://www.gfs.com/sites/default/files/styles/hero_image_modern_/public/hero-modern/foodscape-issue1-hero.jpg?itok=r_mKc_-X"
        }

    ]
    render() {
        return (
            <div>

                <NavComponent view="unknown"></NavComponent>
                <ImageGallery ref={i => this.imageGallery = i}
                    items={this.images} showIndex={true}
                />
            </div>
        )
    }
}

export default Home
