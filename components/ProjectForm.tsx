"use client"

import { SessionInterface } from '@/common.type';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import FormField from './FormField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants';
import Button from './Button';
import { createNewProject, fetchTolken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setisSubmitting(true);

    const { token } = await fetchTolken();

    try {
      if(type === 'create'){
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }
    } catch (error){
      console.log(error)
    } finally{
      setisSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.includes('image')) {
      return alert('Please upload an image file');
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image', result);
    }
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setform((prevState) => ({...prevState, [fieldName]: value}))
  }
  
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({
    title:'',
    description:'',
    image:'',
    category:''
  })
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flexStart form'
    >
      <div className='flexStart form_image-container'>
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input 
        id='image' 
        type="file" 
        accept='image/*' 
        required={ type === 'create' }
        className='form_image-input'
        onChange={handleChangeImage}
        />
        {form.image &&(
          <Image 
          src={form?.image}
          className='sm:p-10 object-contain z-20'
          alt='Project poster'
          fill
          />
        )}
      </div>

      <FormField 
        title="Title"
        state={form.title}
        placeholder="Oooh look at meee!!!"
        setState={(value) => handleStateChange('title', value)}
      />

      <FormField 
        title="Description"
        state={form.description}
        placeholder="This pic really matters"
        setState={(value) => handleStateChange('description', value)}
      />

      
      <CustomMenu 
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className='flexStart w-full'>
        <Button
          title={
          isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}`: 
          `${type === 'create' ? 'Create' : 'Edit'}`
        }
          type="submit"
          leftIcon={isSubmitting ? 
          "" : '/plus.svg'}
          isSubmitting={isSubmitting}
        /> 
      </div>

    </form>
  )
}

export default ProjectForm