import { Fragment, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Dropdown } from 'react-bootstrap';

export default function HomePage() {
    return (
        <Fragment>
            <Helmet>
                <title>Notepad | Home</title>
            </Helmet>
            <div className="row justify-content-center">
                <Card className="text-white bg-dark">
                    
                </Card>
            </div>
        </Fragment>
    );
}