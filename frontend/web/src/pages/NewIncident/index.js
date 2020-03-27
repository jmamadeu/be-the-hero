import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import './styles.css';

export default function NewIncident() {
  const formRef = useRef(null);
  const ong = JSON.parse(localStorage.getItem('ong'));

  async function handleSubmit(data, { reset }) {
    try {
      const response = await api.post('/incidents', data, {
        headers: {
          Authorization: ong.id
        }
      });

      alert(response.data.messages[0]);

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
            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para
              resolver isso.
            </p>
            <Link to='/profile' className='back-link'>
              <FiArrowLeft size={16} color='#E02041' />
              Voltar para home
            </Link>
          </section>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name='title' placeholder='Título' />
            <Input
              id='msg'
              name='description'
              type='textarea'
              placeholder='Descrição'
            />
            <Input name='value' type='number' placeholder='Valor em Kzs' />

            <button type='submit' className='button'>
              Cadastrar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
