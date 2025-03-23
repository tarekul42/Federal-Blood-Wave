import React from 'react';

const NotFound = () => {
    // const style= {
    //     width
    // }
    return (
        <section style={{
            width:'100%',
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontFamily:'monospace',
            background:'black'
        }}>
            <p style={{fontSize:'1.1rem',borderLeft:'2px solid red',padding:'1rem',background:"#5c5959a8"}}>404 - Not Found The Route</p>
        </section>
    );
};

export default NotFound;