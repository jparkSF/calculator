import React, { useState, useEffect } from 'react'
import { Convert } from "easy-currencies";
import './App.css';

const INITIAL_VALUE = {
  price: 0,
  tax: 8.25,
  shipping: 10,
  total: 0
};

function App() {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [currency, setCurrency] = useState(0);



  useEffect(() => {
    const fetch = async () => {
      const value = await Convert(1).from("USD").to("KRW");
      setCurrency(value);
      handleInput('currency', value);
    }
    fetch();
  }, [currency]);

  const reset = () => {
    const value = {...INITIAL_VALUE};
    if (currency) {
      value.currency = currency;
    }
    setValues(value);
  }

  const handleInput = (field, value) => {
    console.log(field, value)
    const newValue = {...values};
    newValue[field] = Number(value);
    setValues(newValue);
  }

  const getValue = (field) => {
    return values[field];
  }

  const calculate = (type) => {
    const rate = 1 + (getValue('tax') / 100);
    const subtotal = getValue('price') * rate;
    if (getValue('price') === 0) {
      return 0;
    } else if (type === 'subtotal') {
      return subtotal
    } else if (type === 'total') {
      return Math.floor((subtotal + getValue('shipping')) * getValue('currency')).toLocaleString('ko-KR');
    }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <div className='form'>
          <form>
            <div>
              <div className="input">
                <div className="label">
                  <label>Price($):</label>
                </div>
                <div className='input-wrapper'>
                  <input type="text" inputMode='numeric' pattern="[0-9]*" value={getValue('price')} onChange={(e) => handleInput('price', e.target.value)}/>
                </div>
              </div>
              <div className="input">
                <div className="label">
                  <label>Tax:</label>
                </div>
                <div className='input-wrapper'>
                  <input type="text" value={getValue('tax')+'%'} disabled />
                  <div className='options'>
                    <button type="button" className='button-10' onClick={() => handleInput('tax', 8.25)}>8.25%</button>
                    <button type="button" className='button-10' onClick={() => handleInput('tax', 10.25)}>10.25%</button>
                  </div>
                </div>
              </div>
              <div className="input">
                <div className="label">
                  <label>Total($):</label>
                </div>
                <div className='input-wrapper'>
                  <input type="number" value={calculate('subtotal')} disabled/>
                </div>
              </div>
              <div className="input">
                <div className="label">
                  <label>Shipping($):</label>
                </div>
                <div className='input-wrapper'>
                  <input type="text" inputMode='numeric' pattern="[0-9]*" value={getValue('shipping')} onChange={(e) => handleInput('shipping', e.target.value)} />
                  <div className='options'>
                    <button type="button" className='button-10' onClick={() => handleInput('shipping', 10)}>$10.00</button>
                    <button type="button" className='button-10' onClick={() => handleInput('shipping', 11)}>$11.00</button>
                    <button type="button" className='button-10' onClick={() => handleInput('shipping', 12)}>$12.00</button>
                  </div>
                </div>
              </div>
              <div className="input">
                <div className="label">
                  <label>환율(₩):</label>
                </div>
                <div className='input-wrapper'>
                  <input type="number" value={getValue('currency')} onChange={(e) => handleInput('currency', e.target.value)} />
                  <div className='options'>
                    <button type="button" className='button-10' onClick={() => handleInput('currency', 1300)}>₩1300</button>
                    <button type="button" className='button-10' onClick={() => handleInput('currency', 1350)}>₩1350</button>
                    <button type="button" className='button-10' onClick={() => handleInput('currency', 1400)}>₩1400</button>
                  </div>
                </div>
              </div>
              <div className="input">
                <div className="label">
                  <label>Total(₩):</label>
                </div>
                <div className='input-wrapper'>
                  <input type="text" value={calculate('total')} disabled />
                </div>
              </div>
            </div>
          </form>
          <button type="button" className='button-10' onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
