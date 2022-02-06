import React, { useEffect, useState } from 'react';

const Clock = (props) => {

    const [time, setTime] = useState(new Date());
    const [dst, setDst] = useState(false);
    const [londonTime, setLondonTime] = useState(false);

    let hour = londonTime ? time.getUTCHours() : time.getHours();
    let hours = (hour + (dst ? 1 : 0)) % 12;
    
    let bigNums = [ [12, 375, 200], 
                    [3, 605, 420], 
                    [6, 385, 630], 
                    [9, 170, 420]];

    let smallNums = [   [1, 505, 220], 
                        [2, 580, 300], 
                        [4, 580, 525], 
                        [5, 500, 600],
                        [7, 275, 600],
                        [8, 195, 515],
                        [10, 195, 300],
                        [11, 275, 220]];

    useEffect(() => {
        setInterval(() => {
            setTime(new Date())
        }, 1000);
    }, []);

    return (
        <div className='overall'>
            <svg width='800' height='800'>
                <circle cx='400' cy='400' r='250' stroke='gray' strokeWidth='10' fill='white'/>
                <line id='hour-hand' x1='400' y1='400' x2={400 - (80 * Math.cos(10 * hours * Math.PI / 60 + Math.PI / 2))} y2={400 - (80 * Math.sin(10 * hours * Math.PI / 60 + Math.PI / 2))} stroke='blue' strokeWidth='3' />
                <line id='minute-hand' x1='400' y1='400' x2={400 - (200 * Math.cos(time.getMinutes() * Math.PI / 30 + Math.PI / 2))} y2={400 - (200 * Math.sin(time.getMinutes() * Math.PI / 30 + Math.PI / 2))} stroke='blue' strokeWidth='3' />
                <line id='second-hand' x1='400' y1='400' x2={400 - (175 * Math.cos(time.getSeconds() * Math.PI / 30 + Math.PI / 2))} y2={400 - (175 * Math.sin(time.getSeconds() * Math.PI / 30 + Math.PI / 2))} stroke='black' strokeWidth='1'/>
                <circle cx='400' cy='400' r='8' stroke='crimson' fill='crimson' />
                {bigNums.map((info)=>{
                    return (<text x={info[1]} y={info[2]} fontSize='48px'>{info[0]}</text>);
                })}
                {smallNums.map((info) => {
                    return (<text x={info[1]} y={info[2]} fontSize='28px'>{info[0]}</text>);
                })}
            </svg>
            <button id={dst ? 'pushed' : ''}onClick={() => setDst(!dst)}>Daylight Savings?</button>
            <button id={londonTime ? 'pushed' : ''} onClick={() => setLondonTime(!londonTime)}>GMT / UTC Time</button>
        </div>
    );
}

export default Clock;