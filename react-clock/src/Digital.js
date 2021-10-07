import React, { useEffect, useState } from 'react';

const Digital = props => {
    const [str, setStr] = useState("");
    useEffect(() => {
        var dataini = new Date();
        var showDigital = false;

        if (props.params) {

            if (props.params.date) {
                dataini = new Date(props.params.date);
            }

            if (props.params.showDigital && props.params.showDigital === true) {
                showDigital = true;
            }
        }

        if (showDigital === false) {
            return;
        }

        // Build Digital
        const interval = setInterval(() => {
            setStr(clockDigital(dataini));
            // Set current time
            dataini.setTime(dataini.getTime() + 1000);
            //
        }, 1000);

        // Implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => clearInterval(interval);
    }, [props]);

    // lifecycle
    return str;
};


/**
 * Digital Clock
 * @param {array} props 
 * @returns 
 */
var clockDigital = function (dataini) {
    if (!dataini) {
        return '';
    }
    let sec = leadingZeros(dataini.getSeconds());
    let min = leadingZeros(dataini.getMinutes());
    let hour = leadingZeros(dataini.getHours());
    let str = `${hour}:${min}:${sec}`;
    return <div className="text-center">{str}</div>;
};

/**
 * Leading Zeros
 * -------------
 * @param {int} val Value to return
 * @returns string representing a number with 2 or more digits
 */
var leadingZeros = function (val) {
    if (val < 10) {
        val = "0" + val;
    }
    return val;
};

export default Digital;