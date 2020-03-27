import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Input from '../../components/Input';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './styles.css';

function Logon() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      const response = await api.post('/sessions', {
        id: data.id
      });

      const ong = JSON.stringify(response.data.data);

      localStorage.setItem('ong', ong);

      history.push('/profile');
    } catch (err) {
      alert(err.response.data.messages[0]);
    }
  }
  return (
    <>
      <div className='logon-container'>
        <section className='form'>
          <img src={logoImg} alt='Be The Hero' />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name='id' placeholder='Sua ID' />

            <button className='button' type='submit'>
              Entrar
            </button>

            <Link to='/register' className='back-link'>
              <FiLogIn size={16} color='#E02041' />
              Não tenho Cadastro
            </Link>
          </Form>
        </section>
        <img src={heroesImg} alt='Heroes' />
      </div>
    </>
  );
}

export default Logon;
