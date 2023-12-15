import { Button,   Segment } from "semantic-ui-react";
import {  useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link,  useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { Formik,Form   } from "formik";
import  * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";




export default observer(function ActivityForm() {


  const { activityStore } = useStore();
  const {   loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  })


  const validationSchema = Yup.object({
      title : Yup.string().required('the activity title is requiered'),
      description : Yup.string().required('tdescription is  is requiered'),
      category : Yup.string().required(),
      date : Yup.string().required(),
      venue : Yup.string().required(),
      city : Yup.string().required()


  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])


  if (loadingInitial) return <LoadingComponent content='Loading Activity..' />

  return (
    <Segment clearing>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={activity} 
      onSubmit={values => console.log(values)}>
        {({  handleSubmit }) => (
        
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
             <MyTextInput name = 'title' placeholder='title'/>
            <MyTextArea rows = {3} placeholder='description' name='description' />
            <MySelectInput options={categoryOptions} placeholder='category' name='category'  />
            <MyTextInput placeholder='date' name='date' />
            <MyTextInput placeholder='city' name='city' />
            <MyTextInput placeholder='venue' name='venue'/>
            <Button floated='right' positive type='submit' content='submit' loading={loading} />
            <Button as={Link} to='/activities' floated='right' positive type='button' content='Cancel' />
          </Form>
        )}

      </Formik>



    </Segment>
  )
}
) 