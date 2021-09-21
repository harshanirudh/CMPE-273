import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useRef,Component, createRef } from 'react'
import {S3config} from './../SharedComponents/UploadS3'
import S3FileUpload from 'react-s3';

class DisheFormComponent extends Component {
    constructor(props) {
        super(props)
        this.fileInput=createRef();
        this.state = {
             
        }
    }
    
     imgbtntype=this.props.type==='add'?'Add':'Add/Edit';
     submitBtnType=this.props.type=='add'?'Save':'Edit'; 
     imgSrc =this. props.intialValues.dimg != undefined ? this.props.intialValues.dimg:'/dish.png'
     
     handleAddButton=()=>{
        this.fileInput.current.click();
        console.log(this.fileInput)
    }
     sendFormDetails=(values)=>{
         console.log(values)
        let img=this.fileInput.current.files[0]
        if(img){
        S3FileUpload.uploadFile(img,S3config).then((res)=>{
            values.dimag=res.location;
            this.props.onFormSubmit(values)
        })
    }
    }
    render(){
    return (
        <Formik initialValues={this.props.intialValues} onSubmit={(values)=>{this.sendFormDetails(values)}}>

            <div className="container">
               
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Image</label>
                        </div>
                        <div className="col-sm-3 text-secondary">
                            <div className="text-center">
                                <input className="form-control-sm" type='file'  ref={this.fileInput} accept="image/png, image/gif, image/jpeg" onClick={this.handleAddButton} />
                            </div>
                            {/* <ErrorMessage name="dname" className="text-danger" component="div"></ErrorMessage> */}
                        </div>
                        <div className="col-sm-6 text-secondary card-columns">
                            <div className="card ">
                                <img src={this.imgSrc} className="float-right card-img-top" ></img>
                            </div>
                        </div>
                    </div>
                    <Form>
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
