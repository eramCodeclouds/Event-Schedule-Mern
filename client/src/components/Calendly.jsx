import React from 'react'
import { InlineWidget } from "react-calendly";

const Calendly = () => {
    return (
        <>
            <br /><br />

            <div className="border-button">
                <InlineWidget url="https://calendly.com/eram-perwez" />
            </div>

            <center> <a href="/user-dashboard" style={{ textDecoration: "none" }}>Go Back</a></center>

        </>
    );

};


export default Calendly;
