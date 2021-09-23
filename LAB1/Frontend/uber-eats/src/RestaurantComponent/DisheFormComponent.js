import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useRef,Component, createRef } from 'react'
import {uploadDishImages} from './../SharedComponents/UploadS3'
import S3FileUpload from 'react-s3';

class DisheFormComponent extends Component {
    constructor(props) {
        super(props)
        this.fileInput=createRef();
        this.state = {
            //  imgSrc:this.props.intialValues.dimg.length>0 ? this.props.intialValues.dimg:'/dish.png',
             imageUpload:false
        }
    }
    
     imgbtntype=this.props.type==='add'?'Add':'Add/Edit';
     submitBtnType=this.props.type=='add'?'Save':'Edit'; 
    //  imgSrc =this.props.intialValues.dimg ? this.props.intialValues.dimg:'/dish.png'
     
     handleAddButton=(e)=>{
        let img=e.target.form[0].files[0];
        if(img){
        let [filename, ext] = img.name.split(".")
        let newname = filename + new Date().valueOf() + "." + ext;
        let newFile = new File([img], newname)
        console.log(newFile)  
            uploadDishImages(newFile).then((res)=>{
                   console.log(res.location)
                   this.props.intialValues.dimg=res.location;
                   this.setState((prevState)=>({
                       imageUpload:!prevState.imageUpload
                   }))
               })
        }
        
    }
     sendFormDetails=(values)=>{
         console.log(values)
         values.dimg=this.props.intialValues.dimg.length>0 ? this.props.intialValues.dimg:'/dish.png'
         this.props.onFormSubmit(values)

    }
    setProfilePic(){
        if(this.props.intialValues.dimg?.length>0)
            return this.props.intialValues.dimg
        else
            return "/dish.png";
    }
    render(){
    return (
        <Formik initialValues={this.props.intialValues} onSubmit={(values)=>{this.sendFormDetails(values)}}>

            <div className="container">
            <Form>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Image</label>
                        </div>
                        <div className="col-sm-2 text-secondary">
                            <div className="text-center">
                                <input className="form-control-sm" type='file'   accept="image/png, image/gif, image/jpeg"  />
                                
                            </div>
                            {/* <ErrorMessage name="dname" className="text-danger" component="div"></ErrorMessage> */}
                        </div>
                        <div className="col-sm-3">
                        <button className="btn btn-primary" type="button" onClick={(e)=>this.handleAddButton(e)}>Upload</button>
                        </div>
                        <div className="col-sm-4 text-secondary card-columns">
                            <div className="card ">
                                {/* <img src={this.state.imgSrc} className="float-right card-img-top" ></img> */}
                                <img src={this.setProfilePic()} className="float-right card-img-top" ></img>
                            </div>
                        </div>
                    </div>
                   
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Name</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field type="text" className="form-control" name="dname" />
                            <ErrorMessage name="dname" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Main Ingrediants</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field type="text" className="form-control" name="ingre" />
                            <ErrorMessage name="ingre" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish price</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field type="text" className="form-control" name="dprice" />
                            <ErrorMessage name="dprice" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Desc</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field type="textarea" className="form-control" name="ddesc" component="textarea" />
                            <ErrorMessage name="ddesc" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Category</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field as="select" className="form-control" name="dcat" >
                                {}
                                <option value="" ></option>
                                <option value="1" >Appetizer</option>
                                <option value="2" >Salads</option>
                                <option value="3" >Main Course</option>
                                <option value="4" >Desserts</option>
                                <option value="5" >Beverages</option>
                            </Field>
                            <ErrorMessage name="dcat" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Type</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <Field as="select" className="form-control" name="dtype" >
                                <option value="" ></option>
                                <option value="1" >Veg</option>
                                <option value="2" >Vegan</option>
                                <option value="3" >Non Veg</option>
                            </Field>
                            <ErrorMessage name="dtype" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary text-center">{this.submitBtnType}</button>
                    </div>
                </Form>
            </div>
        </Formik>
    )
    }
}

export default DisheFormComponent
