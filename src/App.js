import logo from './logo.svg';
import './App.css';
import { zcAuth } from '@zcatalyst/auth';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './login';


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const checkAuthStatus = async () => {
    try {
      // Check if user is already authenticated instead of forcing signin
      const authStatus = await zcAuth.isUserAuthenticated();
      setIsAuthenticated(authStatus);
      
      // Only trigger signin if user is not authenticated
      if (!authStatus) {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setIsAuthenticated(false);
    }
  }

  // Hosted Login Handler
  const handleHostedLogin = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.hostedSignIn('/login');
      console.log('Hosted login initiated');
    } catch (error) {
      console.error('Hosted login error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Embedded Login Handler  
  const handleEmbeddedLogin = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.signIn('embedded', { redirectUrl: '/login' });
      console.log('Embedded login initiated');
    } catch (error) {
      console.error('Embedded login error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const getCustomTokenCallback = async () => {
    // Simulate an API call to fetch a custom JWT token
    return new Promise((resolve) => {
      resolve({
          jwt_token: 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzYzNjE5NTMyLCJpc3MiOiJaT0hPQ0FUQUxZU1QiLCJleHAiOjE3NjM2MjAxMzIsInRva2VuX2V4cGlyeSI6NjAwMDAwLCJpYXQiOjE3NjM2MTk1MzIsImVtYWlsIjoicGVyaWxpNDkyM0BhZ2VucmEuY29tIiwianRpIjoicGVyaWxpNDkyM0BhZ2VucmEuY29tIn0.6Q0XFt6kmqwbszrzUtopI3DIEWg0T6jL0J3UBLp8YkU',
          client_id: '50035989438.C27CRCMW4FZA7HZQIGPCDZB6A638FH',
          scopes: [
            'ZohoCatalyst.zcql.CREATE',
            'ZohoCatalyst.files.READ',
            'ZohoCatalyst.tables.columns.READ',
            'ZohoCatalyst.tables.rows.CREATE',
            'ZohoCatalyst.projects.users.READ',
            'ZohoCatalyst.files.CREATE',
            'ZohoCatalyst.tables.rows.UPDATE',
            'ZohoCatalyst.tables.READ',
            'ZohoCatalyst.cache.READ',
            'ZohoCatalyst.tables.rows.READ',
            'ZohoCatalyst.tables.rows.DELETE',
            'ZohoCatalyst.mltools.READ',
            'ZohoCatalyst.projects.users.CREATE',
            'ZohoCatalyst.functions.execute.CUSTOM',
            'ZohoCatalyst.files.DELETE',
            'ZohoCatalyst.catalyst.search.READ',
            'ZohoCatalyst.folders.READ',
            'ZohoCatalyst.projects.config.READ',
            'Stratus.fileop.ALL',
            'ZohoCatalyst.buckets.objects.ALL',
            'ZohoCatalyst.notifications.mobile.register.CUSTOM',
            'AaaServer.profile.READ'
          ]
        });
      })
  }

  // Third Party Login Handler
  const handleThirdPartyLogin = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.signinWithJwt(getCustomTokenCallback);
      console.log('Third party login initiated');
    } catch (error) {
      console.error('Third party login error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Signup Handler
  const handleSignup = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.signUp({ redirectUrl: '/login' });
      console.log('Signup initiated');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Public Signup Handler
  const handlePublicSignup = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.publicSignup();
      console.log('Public signup initiated');
    } catch (error) {
      console.error('Public signup error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Change Password Handler
  const handleChangePassword = async () => {
    try {
      setAuthLoading(true);
      await zcAuth.changePassword('Catalyst@3', 'Catalyst@4');
      console.log('Change password initiated');
    } catch (error) {
      console.error('Change password error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div id="embedded">
          <div className="home-container">
      <div className="auth-status">
        <h2>Authentication Status</h2>
        <p id="auth" className={`auth-indicator ${isAuthenticated ? 'authenticated' : 'not-authenticated'}`}>
          {isAuthenticated ? '✅ Welcome! You are signed in.' : '❌ You are not signed in.'}
        </p>
      </div>

      {!isAuthenticated && (
        <div className="login-options">
          <h2>Choose Login Method</h2>
          <div className="login-buttons">
            <button 
              className="login-btn hosted-login" 
              onClick={handleHostedLogin}
              disabled={authLoading}
            >
              🌐 Hosted Login
              <span className="login-desc">Redirect to Catalyst hosted login page</span>
            </button>
            
            <button 
              className="login-btn embedded-login" 
              onClick={handleEmbeddedLogin}
              disabled={authLoading}
            >
              📱 Embedded Login
              <span className="login-desc">Login form embedded in the app</span>
            </button>
            
            <button 
              className="login-btn thirdparty-login" 
              onClick={handleThirdPartyLogin}
              disabled={authLoading}
            >
              🔗 Third Party Login
              <span className="login-desc">Login with external providers</span>
            </button>
          </div>
          
          <div className="auth-actions">
            <h3>Account Management</h3>
            <div className="action-buttons">
              <button 
                className="action-btn signup-btn" 
                onClick={handleSignup}
                disabled={authLoading}
              >
                📝 Sign Up
                <span className="action-desc">Create a new account</span>
              </button>
              
              <button 
                className="action-btn public-signup-btn" 
                onClick={handlePublicSignup}
                disabled={authLoading}
              >
                🌐 Public Sign Up
                <span className="action-desc">Create account with public registration</span>
              </button>
              
              <button 
                className="action-btn change-password-btn" 
                onClick={handleChangePassword}
                disabled={authLoading}
              >
                🔒 Change Password
                <span className="action-desc">Reset your password</span>
              </button>
            </div>
          </div>
          
          {authLoading && (
            <div className="loading-message">
              <p>🔄 Processing request...</p>
            </div>
          )}
        </div>
      )}

      {isAuthenticated && (
        <div className="authenticated-content">
          <h2>Welcome to Catalyst Dashboard</h2>
          <p>You are successfully authenticated. Navigate to the testing page to try SDK features.</p>
          <div className="authenticated-actions">
            <Link to="/login" className="dashboard-link">Go to SDK Testing Dashboard →</Link>
            <button 
              className="action-btn change-password-btn authenticated" 
              onClick={handleChangePassword}
              disabled={authLoading}
            >
              🔒 Change Password
            </button>
          </div>
          
          {authLoading && (
            <div className="loading-message">
              <p>🔄 Processing password change...</p>
            </div>
          )}
        </div>
      )}
    </div>
    </div>

  );
}

function App() {
    return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
