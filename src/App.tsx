
import './App.css';
import { Greet } from './components/props/Greet';
import { Heading } from './components/props/Heading';
import { Oscar } from './components/props/Oscar';
import { Person } from './components/props/Person';
import { PersonList } from './components/props/PersonList';
import { Status } from './components/props/Status';
import { Button } from './components/props/Button';
import { Input } from './components/props/Input';
import { Container } from 'react-bootstrap';
import { User } from './components/state/User';
import { Counter } from './components/state/Counter';
import { ThemeContextProvider } from './components/context/ThemeContext';
import { Box } from './components/context/Box';
import { UserContextProvider } from './components/context/UserContext';
import { UserC } from './components/context/UserC';
import { DomeRef } from './components/ref/DomRef';
import { MutableRef } from './components/ref/MutableRef';
import { Counter as ClassCounter } from './components/class/Counter';
import { Private } from './components/auth/Private'
import { Profile } from './components/auth/Profile'
import { List } from './components/generics/List';

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
      <Container style={{ border: '1px solid black', padding: '1rem' }} /> {/* You can add more styles as you please */}
      <User />
      <Counter />
      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>
      <UserContextProvider>
        <UserC />
      </UserContextProvider>
      <div><DomeRef /></div>
      <div><MutableRef /></div>
      <ClassCounter message='The count value is:'/>
      <Private isLoggedIn={true} component={Profile} />
      <div className='list'>
        {/* <List 
          items={['Batman', 'Aquaman', 'Spiderman']}
          onClick={(item) => console.log(item)}
        />
        <List items={[1, 2, 3]} onClick={(item) => console.log(item)} /> */}
        <List 
          items={[
            {
              id: 1,
              first: 'Paul',
              last: 'Logan'
            },
            {
              id: 2,
              first: 'Noah',
              last: 'Jackson'
            },
            {
              id: 3,
              first: 'Noah',
              last: 'Jackson'
            }
          ]}
          onClick={item => console.log(item)}
        />
      </div>
    </div>
  );
}

export default App;
