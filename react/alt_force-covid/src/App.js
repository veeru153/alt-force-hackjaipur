import React from 'react';
import './App.css';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={Register} exact/>
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
