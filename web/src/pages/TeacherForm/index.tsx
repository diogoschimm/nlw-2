import React,  { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';


import './styles.css';

function TeacherForm() {

  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState( [
    { week_day: 0, from: '', to: ''}
    ]);
 
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems, 
      { week_day: 0, from: '', to: ''}
    ])
  }

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  function handleCreateClass(e: FormEvent ) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then((response) => {
      console.log(response.data);
      alert('Cadastro realizado com sucesso');

      history.push("/");

    }).catch(err => {
      console.log(err);
      alert('Erro no cadastro');
    })
  }

  function setScheduleItemValue(position:number, field: string, value: string) {
    const newArray = scheduleItems.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setScheduleItems(newArray);
  }

  return (
    <div id="page-teacher-form" className="container">
        <PageHeader 
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição" 
        />
        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend> 
              <Input label="Nome completo" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
              <Input label="Avatar" name="avatar" value={avatar} onChange={(e)=> setAvatar(e.target.value)}  />
              <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e)=> setWhatsapp(e.target.value)}  />  
              <Textarea name="bio" label="Biografia" value={bio} onChange={(e)=> setBio(e.target.value)}  />
            </fieldset>
            <fieldset>
              <legend>Sobre a aula</legend> 
              <Select 
                label="Matéria" 
                name="subject" 
                options={[
                  { value: 'Artes', label: 'Artes'},
                  { value: 'Biologia', label: 'Biologia'},
                  { value: 'Matemática', label: 'Matemática'},
                  { value: 'Português', label: 'Português'},
                  { value: 'História', label: 'História'},
                  { value: 'Educação Física', label: 'Educação Física'},
                ]}
                value={subject} onChange={(e)=> setSubject(e.target.value)}
              />
              <Input label="Custo da sua hora por aual (em R$)" name="cost" 
              value={cost} onChange={(e)=> setCost(e.target.value)}/>
            </fieldset>

            <fieldset>
              <legend>Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>

              {scheduleItems.map((item, index) => {
                return (
                  <div key={item.week_day} className="schedule-item">
                    <Select 
                      label="Dia da Semana" 
                      name="week_day" 
                      value={item.week_day}
                      onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo'},
                        { value: '1', label: 'Segunda'},
                        { value: '2', label: 'Terça'},
                        { value: '3', label: 'Quarta'},
                        { value: '4', label: 'Quinta'},
                        { value: '5', label: 'Sexta'},
                        { value: '6', label: 'Sábado'},
                      ]} />  
                    <Input 
                      label="Das" 
                      name="from" 
                      type="time"
                      value={item.from}
                      onChange={ e => setScheduleItemValue(index, 'from', e.target.value)} /> 
                    <Input 
                      label="Até" 
                      name="to" 
                      type="time" 
                      value={item.to}
                      onChange={ e => setScheduleItemValue(index, 'to', e.target.value)}/> 
                  </div>  
                );
              })}
            </fieldset>
            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante"/>
                Importante! <br />
                Preencha todos os dados
              </p>
              <button type="submit">Salvar cadastro</button>
            </footer>
          </form>
        </main>
    </div>
  )
}

export default TeacherForm;