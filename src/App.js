import React, { Fragment, useState, useEffect } from 'react';

function Solution() {
  const [start, setStart] = useState(false)
  const [pauseToggle, setPauseToggle] = useState(true)
  const [minVal, setMinVal] = useState(null)
  const [secVal, setSecVal] = useState(null)
  const [totalTime, setTotalTime] = useState(null)
  let timeoutId

  useEffect(() => {
    if(start) {
      timeoutId = setTimeout(() => {
        if(totalTime>0) {
          setTotalTime(totalTime-1)
        }
      }, 1000)
    }
  }, [start, totalTime])

  const handleMinChange = (e) => {
    setMinVal(parseInt(e.target.value))
  }

  const handleSecChange = (e) => {
    setSecVal(parseInt(e.target.value))
  }

  const handleStart = () => {
    setStart(true)
    clearTimeout(timeoutId)
    setMinVal(minVal)
    setSecVal(secVal)
    if(pauseToggle){
      setPauseToggle(!pauseToggle)
    }
    if(minVal && secVal) {
      setTotalTime(minVal*60 + secVal)
    } else if (!minVal) {
      setTotalTime(secVal)
    } else if (!secVal) {
      setTotalTime(minVal * 60)
    }
  }

  const handlePause = () => {
    setPauseToggle(!pauseToggle)
    if(!pauseToggle) {
      clearTimeout(timeoutId)
    } else {
      timeoutId = setTimeout(() => {
        if(totalTime>0) {
          setTotalTime(totalTime-1)
        }
      }, 1000)
    }
  }

  const handleReset = () => {
    setStart(false)
    setMinVal(0)
    setSecVal(0)
  }

  const renderMin = () => {
    const min = Math.floor(totalTime/60)
    const dig = min.toString().length
    let display
    if(dig === 1) {
      display = '0' + min
    } else {
      display = min
    }
    return display
  }
  const renderSec = () => {
    const sec = totalTime - Math.floor(totalTime/60)*60
    const dig = sec.toString().length
    let display
    if(dig === 1) {
      display = '0' + sec
    } else {
      display = sec
    }
    return display
  }

  return (
    <Fragment>
      <label>
        <input type="number" value={minVal} onChange={handleMinChange}/>
        Minutes
      </label>
      <label>
        <input type="number" value={secVal} onChange={handleSecChange}/>
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{start ? 
      `${renderMin()}:${renderSec()}`
      : '00:00'}</h1>
    </Fragment>
  );
}

export default Solution;
