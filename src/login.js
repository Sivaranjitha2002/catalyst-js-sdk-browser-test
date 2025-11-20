import { ZCQL } from '@zcatalyst/zcql';
import { zcAuth } from '@zcatalyst/auth';
import { Datastore } from '@zcatalyst/datastore';
import { Stratus, TransferManager } from '@zcatalyst/stratus';
import { Search } from '@zcatalyst/search';
import { PushNotification } from '@zcatalyst/push-notification';
import { Functions } from '@zcatalyst/functions';
import { UserManagement } from '@zcatalyst/auth';
import { useState } from 'react';
import './Login.css';

function Login() {
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState({});

    const updateResponse = (operation, data, isError = false) => {
        setResponses(prev => ({
            ...prev,
            [operation]: {
                data,
                isError,
                timestamp: new Date().toLocaleTimeString()
            }
        }));
        setLoading(prev => ({ ...prev, [operation]: false }));
    };

    const setOperationLoading = (operation) => {
        setLoading(prev => ({ ...prev, [operation]: true }));
        setResponses(prev => ({ ...prev, [operation]: null }));
    };

    const clearAllResponses = () => {
        setResponses({});
        setLoading({});
    };

    // ZCQL Operations
    const handleZCQL = (e) => {
        e.preventDefault();
        setOperationLoading('zcql');
        const zcql = new ZCQL();
        zcql.executeZCQLQuery('select * from sample').then((data) => {
            updateResponse('zcql', data);
        }).catch((err) => {
            updateResponse('zcql', err.message || 'An error occurred', true);
        });
    };

    // Stratus Operations
    const handleHeadObject = (e) => {
        e.preventDefault();
        setOperationLoading('stratus-head');
        const stratus = new Stratus();
        stratus.bucket('web-js-sdk-test').headObject('sam/sample.txt').then((data) => {
            updateResponse('stratus-head', data);
        }).catch((err) => {
            updateResponse('stratus-head', err.message || 'An error occurred', true);
        });
    };

    const handleUploadObject = (e) => {
        e.preventDefault();
        setOperationLoading('stratus-upload');
        const stratus = new Stratus();
        stratus.bucket('web-js-sdk-test').putObject('sa/s2.txt','Hi from sample.txt').then((data) => {
            updateResponse('stratus-upload', data);
        }).catch((err) => {
            updateResponse('stratus-upload', err.message || 'An error occurred', true);
        });
    };

    const handleDownloadObject = (e) => {
        e.preventDefault();
        setOperationLoading('stratus-download');
        const stratus = new Stratus();
        stratus.bucket('web-js-sdk-test').getObject('sa/s2.txt').then(async (data) => {
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sample.txt';   // download attribute triggers save dialog
            a.click();
            updateResponse('stratus-download', data);
        }).catch((err) => {
            updateResponse('stratus-download', err.message || 'An error occurred', true);
        });
    };

    const handleDeleteObject = (e) => {
        e.preventDefault();
        setOperationLoading('stratus-delete');
        const stratus = new Stratus();
        stratus.bucket('web-js-sdk-test').deleteObject('sam/sample.txt').then((data) => {
            updateResponse('stratus-delete', data);
        }).catch((err) => {
            updateResponse('stratus-delete', err.message || 'An error occurred', true);
        });
    };

    const handleUploadObjectAsParts = (e) => {
        e.preventDefault();
        setOperationLoading('stratus-upload-parts');
        const stratus = new Stratus();
        const bucket = stratus.bucket('web-js-sdk-test');
        const transferManager = new TransferManager(bucket);
        transferManager.putObjectAsParts('sam/sample.txt','Hi from sample.txt', 1).then((data) => {
            updateResponse('stratus-upload-parts', data);
        }).catch((err) => {
            updateResponse('stratus-upload-parts', err.message || 'An error occurred', true);
        });
    };

    // Datastore Operations
    const handleDatastoreGetAllTables = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-tables');
        const datastore = new Datastore();
        datastore.getAllTables().then((data) => {
            updateResponse('datastore-tables', data);
        }).catch((err) => {
            updateResponse('datastore-tables', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreInsertRow = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-insert');
        const datastore = new Datastore();
        datastore.table('sample').insertRow({
            a: 'value1',
            b: 'value2'
        }).then((data) => {
            updateResponse('datastore-insert', data);
        }).catch((err) => {
            updateResponse('datastore-insert', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreGetTableDetails = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-table-details');
        const datastore = new Datastore();
        datastore.getTableDetails('sample').then((data) => {
            updateResponse('datastore-table-details', data);
        }).catch((err) => {
            updateResponse('datastore-table-details', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreGetColumnDetails = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-column-details');
        const datastore = new Datastore();
        datastore.table('sample').getColumnDetails('a').then((data) => {
            updateResponse('datastore-column-details', data);
        }).catch((err) => {
            updateResponse('datastore-column-details', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreUpdateRow = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-update');
        const datastore = new Datastore();
        datastore.table('sample').updateRow({
            ROWID: '21256000000052786',
            a: 'value1',
            b: 'value2'
        }).then((data) => {
            updateResponse('datastore-update', data);
        }).catch((err) => {
            updateResponse('datastore-update', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreGetRow = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-get-row');
        const datastore = new Datastore();
        datastore.table('sample').getRow('21256000000052786').then((data) => {
            updateResponse('datastore-get-row', data);
        }).catch((err) => {
            updateResponse('datastore-get-row', err.message || 'An error occurred', true);
        });
    };

    const handleDatastoreDeleteRow = (e) => {
        e.preventDefault();
        setOperationLoading('datastore-delete-row');
        const datastore = new Datastore();
        datastore.table('sample').deleteRow('21256000000052786').then((data) => {
            updateResponse('datastore-delete-row', data);
        }).catch((err) => {
            updateResponse('datastore-delete-row', err.message || 'An error occurred', true);
        });
    };

    // Search Operations
    const handleSearch = (e) => {
        e.preventDefault();
        setOperationLoading('search');
        const search = new Search();
        search.executeSearchQuery({
          "search": "a*",
          "search_table_columns": {
            "sample" : ["b"],
          }
        }).then((data) => {
            updateResponse('search', data);
        }).catch((err) => {
            updateResponse('search', err.message || 'An error occurred', true);
        });
    };

    const testFunc = () => {  
      console.log('Test function executed');
    }

    // Push Notification Operations
    const handlePushNotification = async () => {
        try {
            setOperationLoading('push-notification');
            const pushNotification = new PushNotification();
            const permission = await pushNotification.enableNotification();
            pushNotification.messageHandler = (message) => {
              console.log('Received notification:', message);
              testFunc();
            };
            updateResponse('push-notification', { permission, status: 'Notifications enabled' });
        } catch (error) {
            updateResponse('push-notification', error.message || 'An error occurred', true);
        }
    }

    // Functions Operations
    const handleFunction = (e) => {
        e.preventDefault();
        setOperationLoading('functions');
        const functions = new Functions();
        functions.execute('web-js-sdk-test').then((data) => {
            updateResponse('functions', data);
        }).catch((err) => {
            updateResponse('functions', err.message || 'An error occurred', true);
        });
    };

    // User Management Operations
    const handleGetUserDetails = (e) => {
        e.preventDefault();
        setOperationLoading('user-details');
        const userManagement = new UserManagement();
        userManagement.getCurrentUser().then((data) => {
            updateResponse('user-details', data);
        }).catch((err) => {
            updateResponse('user-details', err.message || 'An error occurred', true);
        });
    };

    const handleResetUserPassword = (e) => {
        e.preventDefault();
        setOperationLoading('reset-password');
        const userManagement = new UserManagement();
        userManagement.resetPassword('sivaranjitha9843@gmail.com', { platform_type: 'web'}).then((data) => {
            updateResponse('reset-password', data);
        }).catch((err) => {
            updateResponse('reset-password', err.message || 'An error occurred', true);
        });
    };

    // Authentication Operations
    const handleLogout = async () => {
        try {
            await zcAuth.signOut('/');
            console.log('Successfully signed out and redirecting');
        } catch (error) {
            console.error('Signout error:', error);
        }
    };

    return (
    <div className="login-container">
      <div className="header">
        <h1>Catalyst SDK Testing Dashboard</h1>
        <p>Test various Catalyst SDK functionalities</p>
      </div>
      
      <div className="main-content">
        {/* Left Panel - Controls */}
        <div className="left-panel">
          {/* ZCQL Section */}
          <div className="section">
            <h2>ZCQL Operations</h2>
            <div className="button-group">
              <button className="test-button zcql" onClick={handleZCQL}>Execute ZCQL Query</button>
            </div>
          </div>

          {/* Datastore Section */}
          <div className="section">
            <h2>Datastore Operations</h2>
            <div className="button-grid">
              <button className="test-button datastore" onClick={handleDatastoreGetAllTables}>Get All Tables</button>
              <button className="test-button datastore" onClick={handleDatastoreGetTableDetails}>Get Table Details</button>
              <button className="test-button datastore" onClick={handleDatastoreGetColumnDetails}>Get Column Details</button>
              <button className="test-button datastore" onClick={handleDatastoreInsertRow}>Insert Row</button>
              <button className="test-button datastore" onClick={handleDatastoreUpdateRow}>Update Row</button>
              <button className="test-button datastore" onClick={handleDatastoreGetRow}>Get Row</button>
              <button className="test-button datastore" onClick={handleDatastoreDeleteRow}>Delete Row</button>
            </div>
          </div>

          {/* Stratus Section */}
          <div className="section">
            <h2>Stratus (File Storage) Operations</h2>
            <div className="button-grid">
              <button className="test-button stratus" onClick={handleHeadObject}>Head Object</button>
              <button className="test-button stratus" onClick={handleUploadObject}>Upload Object</button>
              <button className="test-button stratus" onClick={handleDownloadObject}>Download Object</button>
              <button className="test-button stratus" onClick={handleDeleteObject}>Delete Object</button>
              <button className="test-button stratus" onClick={handleUploadObjectAsParts}>Upload as Parts</button>
            </div>
          </div>

          {/* Search Section */}
          <div className="section">
            <h2>Search Operations</h2>
            <div className="button-group">
              <button className="test-button search" onClick={handleSearch}>Execute Search</button>
            </div>
          </div>

          {/* Push Notification Section */}
          <div className="section">
            <h2>Push Notification</h2>
            <div className="button-group">
              <button className="test-button notification" onClick={handlePushNotification}>Enable Push Notifications</button>
            </div>
          </div>

          {/* Functions Section */}
          <div className="section">
            <h2>Functions Operations</h2>
            <div className="button-group">
              <button className="test-button functions" onClick={handleFunction}>Execute Function</button>
            </div>
          </div>

          {/* User Management Section */}
          <div className="section">
            <h2>User Management Operations</h2>
            <div className="button-grid">
              <button className="test-button user-mgmt" onClick={handleGetUserDetails}>Get Current User</button>
              <button className="test-button user-mgmt" onClick={handleResetUserPassword}>Reset Password</button>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="section auth-section">
            <h2>Authentication</h2>
            <div className="button-group">
              <button className="test-button logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        {/* Right Panel - Response Display */}
        <div className="right-panel">
          <div className="response-section">
            <div className="response-header-bar">
              <h2>API Responses</h2>
              <button className="clear-button" onClick={clearAllResponses} disabled={Object.keys(responses).length === 0}>
                🗑️ Clear All
              </button>
            </div>
            <div className="responses-container">
              {Object.keys(responses).length === 0 ? (
                <div className="no-responses">
                  <p>No API calls made yet.</p>
                  <p>Click any button on the left to see responses here.</p>
                </div>
              ) : (
                Object.entries(responses).map(([operation, response]) => (
                  <div key={operation} className={`response-item ${response?.isError ? 'error' : 'success'}`}>
                    <div className="response-header">
                      <h3>{operation.replace('-', ' ').toUpperCase()}</h3>
                      <span className="timestamp">{response?.timestamp}</span>
                    </div>
                    <div className="response-content">
                      <pre>{JSON.stringify(response?.data, null, 2)}</pre>
                    </div>
                  </div>
                ))
              )}
              {Object.keys(loading).some(key => loading[key]) && (
                <div className="loading-indicator">
                  <p>🔄 Processing API request...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;