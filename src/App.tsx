
import './App.css';
import { Greet } from './components/props/Greet';
import { Heading } from './components/props/Heading';
import { Oscar } from './components/props/Oscar';
import { Person } from './components/props/Person';
import { PersonList } from './components/props/PersonList';
import { Status } from './components/props/Status';
import { Button } from './components/props/Button';
import { Input } from './components/props/Input';

function App() {

  const personName = {
    firstName: 'John',
    lastName: 'Doe'
  }

  const nameList = [
    {
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe'
    },
    {
      firstName: 'Son',
      lastName: 'Doe'
    }
  ]

  return (
    <div className="App">
      <Heading>Placeholder text</Heading>
      <Oscar>
        <Heading>Oscar goes to Lupita Ngonyo</Heading>
      </Oscar>
      <Greet name={'Home'} isLoggedIn={false} />
      <Person name={personName} />
      <PersonList names={nameList} />
      <Status status={'success'} />
      <Button 
        handleClick={(event, id) => {
          console.log('Button clicked', event, id)
        }}
      />
      <Input value='' handleChange={(event) => console.log(event)} />
    </div>
  );
}

export default App;
