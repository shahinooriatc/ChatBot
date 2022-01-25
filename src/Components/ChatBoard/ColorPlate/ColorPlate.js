import React, { Component } from 'react';
import { BsFillPaletteFill } from "react-icons/bs";

class ColorPlate extends Component {


    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: 'teal', textAlign: 'center' }}>
                <BsFillPaletteFill size='4em' style={{ color: 'orange', marginTop: '50px' }} />

               

            </div>
        );
    }
}

export default ColorPlate;