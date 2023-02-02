import React from 'react';
import ReactDOM from 'react-dom'; 

import {createRoot} from "react-dom/client"
import 'typeface-quicksand';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query' // this is needed for react-query below
import reducer, { initialState } from './Functionality/Reducer';
import { StateProvider } from './Functionality/StateProvider';

const queryClient = new QueryClient() // this is needed for react-query below

const container = document.getElementById("root")
const root = createRoot(container);

// for dev must be localhost for invalid https certs to work 
// https://stackoverflow.com/questions/47700269/google-chrome-localhost-neterr-cert-authority-invalid

// window.ipAddress = { ip: "https://192.168.2.128:8081" };

window.ipAddress = { ip: "https://localhost:8081" }; // for testing locally
// window.ipAddress = { ip: "/api/" }; //  THIS IS FOR PRODUCTION


root.render( 
    <QueryClientProvider client={queryClient} contextSharing={true}> {/* this is for react-query */}
        <StateProvider initialState={initialState} reducer={reducer}>
                <App /> 
        </StateProvider>
    </QueryClientProvider>)

reportWebVitals();
