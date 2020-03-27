import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const ong = JSON.parse(localStorage.getItem('ong'));
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  async function getIncidents() {
    const response = await api.get('/incidents', {
      headers: {
        Authorization: ong.id
      }
    });

    setIncidents(response.data.data);
  }

  useEffect(() => {
    try {
      getIncidents();
    } catch (err) {
      alert(err.response.data.messages[0]);
    }
  });

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function handleDelete(id) {
    try {
      const response = await api.delete(`/incidents/${id}`, {
        headers: { Authorization: ong.id }
      });
      alert(response.data.messages[0]);

      getIncidents();
    } catch (err) {
      alert(err.response.data.messages[0]);
    }
  }

  return (
    <>
      <div className='profile-container'>
        <header>
          <img src={logo} alt='Be The Hero' />
          <span>
            Bem Vinda, <strong> {ong.name}</strong>
          </span>

          <Link className='button' to='/incidents/new'>
            Cadastrar novo caso
          </Link>

          <button onClick={() => handleLogout()}>
            <FiPower size={18} color='#E02041' />
          </button>
        </header>
        <h1>Casos Cadastrados</h1>

        <ul>
          {incidents.length > 0 ? (
            incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÂO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR</strong>
                <p>
                  {Intl.NumberFormat('pt-Br', {
                    style: 'currency',
                    currency: 'AKZ'
                  }).format(incident.value)}
                </p>

                <button onClick={() => handleDelete(incident.id)}>
                  {' '}
                  <FiTrash2 size={20} color='#a8a8b3' />{' '}
                </button>
              </li>
            ))
          ) : (
            <h4>Não possue casos cadastrados</h4>
          )}
        </ul>
      </div>
    </>
  );
}
