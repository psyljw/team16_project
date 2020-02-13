import React from 'react';
import './css/Charity.css';
import Header from './Header';
import Footer from "./Footer";

class Charity extends React.Component {
    render(){
        return(
            <div>
                <Header />

                <div> This is the Charity page </div>

                <div> Here are a list of the charities near Birmingham children\'s hospital:
                <ul>
                    <li>Birmingham Mind</li>
                    <li>Breast Cancer Support Charity</li> 
                    <li>Baron Davenport\'s Charity</li> 
                    <li>Cancer Research UK</li> 
                    <li>Birmingham Sports and Education Foundation</li> 
                    <li>Heart Research UK Midlands</li> 
                    <li>CLDF - Children\'s Liver Disease Charity</li> 
                    <li>British Heart Foundation Furniture and Electrical</li> 
                    <li>The Prince\'s Trust Birmingham Centre</li> 
                    <li>Personal Support Unit</li>   
                    <li>Birmingham LGBT</li> 
                    <li>RSPB</li> 
                    <li>Smart Works Birmingham</li>
                </ul>
                </div>

                <Footer />
            </div>
            )
        }
    }

export default Charity;