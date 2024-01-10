import { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  function handleWeightChange(e) {
    setWeight(e.target.value);
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
  }

  function handleBmiChange(e) {
    e.preventDefault();
    const weightInPounds = parseFloat(weight);
    const heightInInches = parseFloat(height);

    if (!isNaN(weightInPounds) && !isNaN(heightInInches) && heightInInches > 0) {
      const bmiValue = (weightInPounds / heightInInches ** 2) * 703;
      setBmi(bmiValue.toFixed(2));
      updateMessage(bmiValue);
    } else {
      setBmi(null);
      setMessage('');
    }
  }

  function updateMessage(bmiValue) {
    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage('You are normal');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  }

  return (
    <>
      <form onSubmit={handleBmiChange}>
        <h3>BMI Calculator</h3>
        <label htmlFor="Weight">Weight (lbs)</label>
        <input type="text" value={weight} onChange={handleWeightChange} />
        <label htmlFor="Height">Height (in)</label>
        <input type="text" value={height} onChange={handleHeightChange} />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => { setWeight(''); setHeight(''); setBmi(null); setMessage(''); }}>Reload</button>
        <br /> <br />
        {bmi !== null && (<h3>Your BMI is: {bmi}</h3>)}
        {message && (<p>{message}</p>)}
      </form>
    </>
  );
};

export default Calculator;
