import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import Input from '../../components/Input';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data, { reset }) {
    try {
      const response = await api.post('/ongs', data);

      alert(` Seu ID de cadastro é ${response.data.data.id}`);
      history.push('/');

      reset();
    } catch (err) {
      alert(err.response.data.messages[0]);
    }
  }
  return (
    <>
      <div className='register-container'>
        <div className='content'>
          <section>
            <img src={logoImg} alt='Be The Hero' />
            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG
            </p>
            <Link to='/' className='back-link'>
              <FiArrowLeft size={16} color='#E02041' />
              Já tenho Cadastro
            </Link>
          </section>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name='name' placeholder='Nome da ONG' />
            <Input name='email' type='email' placeholder='E-mail' />
            <Input name='whatsapp' type='text' placeholder='Whatsapp' />

            <div className='input-group'>
              <Input name='city' placeholder='Cidade' />
              <Input name='uf' placeholder='UF' style={{ width: 80 }} />
            </div>

            <button type='submit' className='button'>
              Cadastrar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
