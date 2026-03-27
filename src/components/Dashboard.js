import React from 'react';
import Card from './Card.js';
import './Dashboard.css';

function Dashboard(){
    return(
        <div className="dashboard">
            <h2>Dashboard</h2>

            <div>
                <Card title="Tasks"></Card>
                <Card title="Focus-Time"></Card>
                <Card title="Streak"></Card>
            </div>

        </div>
    );
}

export default Dashboard;