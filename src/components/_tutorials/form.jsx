import { useState } from 'react';

const useForm = ({ initialValue = {}, onSubmit = () => {} }) => {
  const [inputs, setInputs] = useState(initialValue);

  const handleInputs = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return {
    handleInputs,
    handleSubmit,
    inputs,
  };
};

const Form = () => {
  const form = useForm({
    initialValue: { name: '', email: '' },
    onSubmit(value) {
      console.log(value);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name='name'
        value={form.inputs.name}
        onChange={form.handleInputs}
        type='text'
      />

      <input
        name='email'
        value={form.inputs.email}
        onChange={form.handleInputs}
        type='text'
      />

      <button>submit</button>
    </form>
  );
};
export default Form;