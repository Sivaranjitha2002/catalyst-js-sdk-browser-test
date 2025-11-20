# Catalyst JS SDK Browser Testing Dashboard

A comprehensive React-based testing application for the Zoho Catalyst JavaScript SDK. This dashboard provides a user-friendly interface to test and explore all major Catalyst SDK functionalities including authentication, database operations, file storage, search, push notifications, and serverless functions.

## 🚀 Features

### 🔐 Authentication Methods
- **Hosted Login**: Redirect-based authentication using Catalyst's hosted login page
- **Embedded Login**: In-app authentication with embedded login forms
- **Third Party Login**: JWT-based authentication with external providers
- **Sign Up**: New user registration
- **Public Sign Up**: Public user registration without admin approval
- **Change Password**: Password management functionality

### 📊 SDK Testing Modules
- **ZCQL (Zoho Catalyst Query Language)**: Execute database queries
- **Datastore**: Complete CRUD operations on database tables
- **Stratus (File Storage)**: File upload, download, and management
- **Search**: Full-text search capabilities
- **Push Notifications**: Mobile push notification setup
- **Functions**: Serverless function execution

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Responses**: API responses displayed in organized panels
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Comprehensive error display and handling
- **Two-Panel Layout**: Controls on the left, responses on the right

## 📁 Project Structure

```
catalyst-js-sdk-browser-test/
├── public/
│   ├── index.html
│   ├── login.html
│   └── manifest.json
├── src/
│   ├── App.js              # Main app with authentication flows
│   ├── App.css             # Authentication page styling
│   ├── login.js            # SDK testing dashboard
│   ├── Login.css           # Dashboard styling
│   ├── index.js            # React app entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🛠 Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Zoho Catalyst project setup

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd catalyst-js-sdk-browser-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Catalyst**
   - Ensure your Catalyst project is properly configured
   - Update the JWT token and client_id in `App.js` if using third-party login
   - Configure your database tables and file buckets as needed

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Dependencies

### Catalyst SDK Packages
```json
{
  "@zcatalyst/auth": "^0.0.3",
  "@zcatalyst/auth-client": "^0.0.3", 
  "@zcatalyst/datastore": "^0.0.3",
  "@zcatalyst/functions": "^0.0.3",
  "@zcatalyst/push-notification": "^0.0.3",
  "@zcatalyst/search": "^0.0.3",
  "@zcatalyst/stratus": "^0.0.3",
  "@zcatalyst/transport": "^0.0.3",
  "@zcatalyst/zcql": "^0.0.3"
}
```

### React Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.9.5",
  "react-scripts": "5.0.1"
}
```

## 🔧 Configuration

### Authentication Setup
1. **Hosted Login**: Configure redirect URLs in your Catalyst admin console
2. **Embedded Login**: Set up embedded authentication in your project settings
3. **Third Party Login**: Update the JWT token and scopes in the `getCustomTokenCallback` function

### Database Setup
Ensure you have a table named `sample` with columns `a` and `b` for testing datastore operations.

### File Storage Setup
Create a bucket named `web-js-sdk-test` for testing Stratus file operations.

## 🎯 Usage Guide

### Authentication Flow
1. **Visit Home Page**: View authentication status and available login methods
2. **Choose Login Method**: Select from hosted, embedded, or third-party login
3. **Account Management**: Sign up new users or change passwords
4. **Dashboard Access**: Navigate to the SDK testing dashboard after authentication

### SDK Testing
1. **Select a Category**: Choose from ZCQL, Datastore, Stratus, Search, etc.
2. **Execute Operations**: Click buttons to test various SDK functionalities
3. **View Responses**: Real-time API responses appear in the right panel
4. **Clear Results**: Use the "Clear All" button to reset the response panel

### Response Monitoring
- ✅ **Green Border**: Successful API responses
- ❌ **Red Border**: Error responses
- 🔄 **Loading Indicator**: Operations in progress
- 📊 **JSON Display**: Formatted response data with timestamps

## 📱 Responsive Design

### Desktop (1200px+)
- Side-by-side panels for optimal workflow
- Grid layout for multiple buttons per row
- Sticky response panel for easy viewing

### Tablet (768px - 1024px)
- Stacked layout with fixed response height
- Optimized button sizing
- Scrollable content areas

### Mobile (320px - 768px)
- Single-column layout
- Touch-friendly button sizes
- Collapsible sections

## 🎨 Styling Features

### Color Coding
- **🔵 Blue**: Hosted Login, ZCQL operations
- **🟢 Green**: Embedded Login, Datastore operations
- **🟡 Yellow**: Third Party Login, Functions
- **🔵 Cyan**: Sign Up, Stratus operations
- **🟣 Purple**: Change Password
- **🟢 Teal**: Public Sign Up, Search operations

### Interactive Elements
- Hover effects with elevation
- Loading states and disabled buttons
- Smooth transitions and animations
- Visual feedback for user actions

## 🔍 API Testing Examples

### ZCQL Query
```javascript
const zcql = new ZCQL();
zcql.executeZCQLQuery('select * from sample');
```

### Datastore Operations
```javascript
const datastore = new Datastore();
datastore.table('sample').insertRow({a: 'value1', b: 'value2'});
```

### File Upload
```javascript
const stratus = new Stratus();
stratus.bucket('web-js-sdk-test').putObject('/path/file.txt', 'content');
```

### Search Query
```javascript
const search = new Search();
search.executeSearchQuery({
  search: "a*",
  search_table_columns: { sample: ["b"] }
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Fails**
   - Check your Catalyst project configuration
   - Verify redirect URLs are properly set
   - Ensure JWT tokens are valid and not expired

2. **Database Operations Fail**
   - Confirm the `sample` table exists with columns `a` and `b`
   - Check table permissions and user access rights
   - Verify ZCQL query syntax

3. **File Operations Fail**
   - Ensure the `web-js-sdk-test` bucket exists
   - Check file permissions and access rights
   - Verify file paths and naming conventions

4. **Network Errors**
   - Check internet connectivity
   - Verify Catalyst service availability
   - Review browser console for detailed error messages

### Debug Mode
Enable detailed logging by opening browser developer tools and monitoring the console for:
- API request/response details
- Authentication flow steps
- SDK operation results
- Error messages and stack traces

## 📚 Additional Resources

- [Zoho Catalyst Documentation](https://catalyst.zoho.com/help/)
- [Catalyst JavaScript SDK Reference](https://catalyst.zoho.com/help/sdks/javascript/)
- [React Documentation](https://reactjs.org/docs/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 📄 License

This project is intended for testing and educational purposes. Please refer to Zoho Catalyst terms of service for SDK usage guidelines.

## 🔖 Version History

- **v0.1.0**: Initial release with basic authentication and SDK testing
- Current version includes all major Catalyst SDK modules with responsive UI

---

Built with ❤️ for testing Zoho Catalyst SDK functionality
