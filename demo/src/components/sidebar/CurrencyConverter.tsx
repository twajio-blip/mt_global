import React, { useState } from 'react';
import { Module } from '../ui/Module';
import { Button, SelectField, TextField } from '../ui/Controls';

const RATES: Record<string, number> = {
  USD: 1,
  BDT: 121.45,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.6,
  CNY: 7.24,
  JPY: 152.3
};

const CURRENCIES = Object.keys(RATES);

export function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BDT');
  const [result, setResult] = useState<string>('1 USD = 121.45 BDT');

  const convert = () => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setResult('Please enter a valid amount.');
      return;
    }
    const converted = value / RATES[from] * RATES[to];
    setResult(`${value} ${from} = ${converted.toFixed(2)} ${to}`);
  };

  return (
    <Module title="Currency Converter">
      <div className="space-y-2.5">
        <TextField
          label="Amount"
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(event) => setAmount(event.target.value)} />
        
        <div className="grid grid-cols-2 gap-2">
          <SelectField label="From" options={CURRENCIES} value={from} onChange={(e) => setFrom(e.target.value)} />
          <SelectField label="To" options={CURRENCIES} value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <Button onClick={convert} className="w-full">
          Convert
        </Button>
        <p aria-live="polite" className="rounded-mcaa bg-mcaa-light px-3 py-2 text-[14px] font-medium text-mcaa-navy">
          {result}
        </p>
        <p className="text-[12.5px] text-mcaa-muted">Indicative rates only. Confirm with your authorised dealer bank.</p>
      </div>
    </Module>);

}