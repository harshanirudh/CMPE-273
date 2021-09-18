import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useRef } from 'react'
import {S3config} from './../SharedComponents/UploadS3'
import S3FileUpload from 'react-s3';
function DisheFormComponent(props) {
    let imgbtntype=props.type==='add'?'Add':'Add/Edit';
    let submitBtnType=props.type=='add'?'Save':'Edit'; 
    let imgSrc = props.intialValues.dimg != undefined ? props.intialValues.dimg:'/dish.png'
    let fileInput=useRef();
    let handleAddButton=()=>{
        fileInput.current.click();
        console.log(fileInput)
    }
    let sendFormDetails=(values)=>{
        let img=fileInput.current.files[0]
        S3FileUpload.uploadFile(img,S3config).then((res)=>{
            values.dimag=res.location;
            props.onFormSubmit(values)
        })
        
    }
    console.log("props:",props)
    return (
        <Formik initialValues={props.intialValues} onSubmit={(values)=>{sendFormDetails(values)}}>

            <div className="container">
               
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <label className="mb-0">Dish Image</label>
                        </div>
                        <div className="col-sm-3 text-secondary">
                            <div className="text-center">
                                <input className="form-control-sm" type='file'  ref={fileInput} accept="image/png, image/gif, image/jpeg" onClick={handleAddButton} />
                            </div>
                            {/* <ErrorMessage name="dname" className="text-danger" component="div"></ErrorMessage> */}
                        </div>
                        <div className="col-sm-6 text-secondary card-columns">
                            <div className="card ">
                                <img src={imgSrc} className="float-right card-img-top" ></img>
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
                                <option value="" ></option>
                                <option value="appetizer" >Appetizer</option>
                                <option value="salads" >Salads</option>
                                <option value="maincourse" >Main Course</option>
                                <option value="desserts" >Desserts</option>
                                <option value="beverages" >Beverages</option>
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
                                <option value="veg" >Veg</option>
                                <option value="vegan" >Vegan</option>
                                <option value="nonveg" >Non Veg</option>
                            </Field>
                            <ErrorMessage name="dtype" className="text-danger" component="div"></ErrorMessage>
                        </div>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary text-center">{submitBtnType}</button>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}

export default DisheFormComponent
