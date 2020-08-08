import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';

import './styles.css'

export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: number,
  name: string,
  subject: string,
  whatsapp: string
}

interface TeacherItemProps {
  teacher: Teacher;
}
const TeacherItem: React.FC<TeacherItemProps> = (props) => {

  const {  
    id,
    avatar,
    bio,
    cost,
    name,
    subject,
    whatsapp
  } = props.teacher;

  function handleCreateNewConnection() {
    api.post('connections', {
      user_id: id
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p> {bio} </p>
      <footer>
        <p>
          Preço/hora
        <strong>R$ {cost}</strong>
        </p>
        <a onClick={handleCreateNewConnection} href={`https://wa.me/${whatsapp}`} target="_blank">
          <img src={whatsappIcon} alt="Whatsapp" />
        Entrar em contato
      </a>
      </footer>
    </article>
  );
}

export default TeacherItem;