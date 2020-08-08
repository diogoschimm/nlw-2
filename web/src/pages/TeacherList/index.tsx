import React, { useState, FormEvent } from 'react'; 

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';
 
function TeacherList() {

  const [subject, setSubject ] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data); 
  }

  return (
    <div id="page-teacher-list" className="container">
        <PageHeader title="Estes são os proffys disponíveis.">
            <form id="search-teachers" onSubmit={handleSearchTeachers}>    
              <Select 
                label="Matéria" 
                name="subject" 
                value={subject}
                onChange={e=>setSubject(e.target.value)}
                options={[
                  { value: 'Artes', label: 'Artes'},
                  { value: 'Biologia', label: 'Biologia'},
                  { value: 'Matemática', label: 'Matemática'},
                  { value: 'Português', label: 'Português'},
                  { value: 'História', label: 'História'},
                  { value: 'Educação Física', label: 'Educação Física'},
                ]}
              />
              <Select 
                label="Dia da Semana" 
                name="week_day" 
                value={week_day}
                onChange={e=>setWeekday(e.target.value)}
                options={[
                  { value: '0', label: 'Domingo'},
                  { value: '1', label: 'Segunda'},
                  { value: '2', label: 'Terça'},
                  { value: '3', label: 'Quarta'},
                  { value: '4', label: 'Quinta'},
                  { value: '5', label: 'Sexta'},
                  { value: '6', label: 'Sábado'},
                ]}
              /> 
              <Input 
                type="time" 
                label="Hora" 
                name="time" 
                value={time}
                onChange={e=>setTime(e.target.value)}/> 
                <button type="submit">
                  Buscar
                </button>
            </form>
        </PageHeader>
        
        <main>
          {teachers.map((teacher: Teacher)  => {
            return <TeacherItem key={teacher.id} teacher={teacher} />
          })}            
        </main>
    </div>
  )
}

export default TeacherList;