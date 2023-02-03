import { useFormik } from 'formik';
import React from 'react';
import { uploadProductForm } from '../../types/props';

const AdminSettings: React.FC = (props) => {
  const uploadProductForm = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    onSubmit: (values: uploadProductForm) => {},
  });

  return (
    <div>
      <form onSubmit={uploadProductForm.handleSubmit}>
        <p>ID:</p>
        <p>Product name:</p>
        <input id="name" name="name" type="text" value={uploadProductForm.values.name} onChange={uploadProductForm.handleChange} />
        <p>Image:</p>
        <input id="image" name="image" type="file" onChange={uploadProductForm.handleChange} multiple />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminSettings;
