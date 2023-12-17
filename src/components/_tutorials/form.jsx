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

//2

// import { useState } from 'react';

// const Form = () => {
//   const [inputs, setInputs] = useState({
    // name:'',
    // email:'',
    // });

//   const handleChange = (e) => {
//     setInputs((inputs)=> ({...inputs, [e.target.name]: e.target.value}));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(inputs);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name='name'
//         value={inputs.name}
//         onChange={handleChange}
//         type='text'
//       />

//       <input
//         name = 'email'
//         value={inputs.email}
//         onChange={handleChange}
//         type='text'
//       />

//       <button>submit</button>
//     </form>
//   );
// };

// export default Form;




//1

// import { useState } from 'react';

// const Form = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const [nameError, setNameError] = useState('');
//   const [emailError, setEmailError] = useState('');

//   const [nameBlur, setNameBlur] = useState(false);
//   const [emailBlur, setEmailBlur] = useState(false);

//   const handleNameChange = (e) => {
//     setNameError(name.length < 2 ? 'must be more than 2' : '');
//     setName(e.target.value);
//   };
//   const handleEmailChange = (e) => {
//     setEmailError(email.length < 2 ? 'must be more than 2' : '');
//     setEmail(e.target.value);
//   };

//   const handleNameBlur = () => setNameBlur(true);
//   const handleEmailBlur = () => setEmailBlur(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ name, email });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={name}
//         onChange={handleNameChange}
//         onBlur={handleNameBlur}
//         type='text'
//       />
//       {!nameBlur && nameError && <div className='text-danger'>{nameError}</div>}

//       <input
//         value={email}
//         onChange={handleEmailChange}
//         onBlur={handleEmailBlur}
//         type='text'
//       />
//       {!emailBlur && emailError && (
//         <div className='text-danger'>{emailError}</div>
//       )}

//       <button>submit</button>
//     </form>
//   );
// };

// export default Form;
