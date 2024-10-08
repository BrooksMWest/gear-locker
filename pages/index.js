import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import WelcomeButtons from '../components/welcomePageButtons';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        color: 'white',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div className="page-header-text">
        <h2>Hello {user.displayName}!</h2>
        <h1>Welcome to the Gear Locker</h1>
        <WelcomeButtons />
      </div>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
