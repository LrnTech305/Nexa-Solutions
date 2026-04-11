import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRightLeft, Ruler, DollarSign, RefreshCw, Mail, Phone, MapPin, X, Menu } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';

// Conversion factors (to base unit)
const lengthToMeter: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  feet: 0.3048,
  mile: 1609.34,
  inch: 0.0254,
  cm: 0.01,
};
const weightToKg: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  pound: 0.453592,
  ounce: 0.0283495,
};
const temperatureConvert = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  let celsius: number;
  if (from === 'celsius') celsius = value;
  else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
  else celsius = value - 273.15; // kelvin
  if (to === 'celsius') return celsius;
  if (to === 'fahrenheit') return celsius * 9/5 + 32;
  return celsius + 273.15;
};

export default function DigitalPair() {
  const [activeTab, setActiveTab] = useState<'currency' | 'unit'>('currency');
  const [currencyAmount, setCurrencyAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('0.00');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [loadingRates, setLoadingRates] = useState(false);

  const [unitAmount, setUnitAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');
  const [convertedUnit, setConvertedUnit] = useState('3.28');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NGN'];
  const unitCategories = [
    { name: 'Length', units: ['meter', 'kilometer', 'feet', 'mile', 'inch', 'cm'] },
    { name: 'Weight', units: ['kilogram', 'gram', 'pound', 'ounce'] },
    { name: 'Temperature', units: ['celsius', 'fahrenheit', 'kelvin'] },
  ];

  const fetchRates = async () => {
    setLoadingRates(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await res.json();
      setExchangeRates(data.rates);
      setLastUpdate(new Date());
      if (fromCurrency && toCurrency && currencyAmount) {
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        setConvertedAmount((parseFloat(currencyAmount) * rate).toFixed(2));
      }
    } catch (err) {
      console.error('Failed to fetch rates', err);
      alert('Could not fetch live rates. Using fallback.');
      setExchangeRates({ USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.8, NGN: 1520 });
    } finally {
      setLoadingRates(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (exchangeRates && fromCurrency && toCurrency && currencyAmount) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      setConvertedAmount((parseFloat(currencyAmount) * rate).toFixed(2));
    }
  }, [currencyAmount, fromCurrency, toCurrency, exchangeRates]);

  const handleCurrencyConvert = () => fetchRates();

  const handleUnitConvert = () => {
    const amount = parseFloat(unitAmount);
    if (isNaN(amount)) return;
    let result = 0;
    const isLength = unitCategories[0].units.includes(fromUnit);
    const isWeight = unitCategories[1].units.includes(fromUnit);
    if (isLength && unitCategories[0].units.includes(toUnit)) {
      const meters = amount * lengthToMeter[fromUnit];
      result = meters / lengthToMeter[toUnit];
    } else if (isWeight && unitCategories[1].units.includes(toUnit)) {
      const kg = amount * weightToKg[fromUnit];
      result = kg / weightToKg[toUnit];
    } else if (unitCategories[2].units.includes(fromUnit) && unitCategories[2].units.includes(toUnit)) {
      result = temperatureConvert(amount, fromUnit, toUnit);
    } else {
      result = amount;
    }
    setConvertedUnit(result.toFixed(4));
  };

  useEffect(() => {
    handleUnitConvert();
  }, [unitAmount, fromUnit, toUnit]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setCurrencyAmount(convertedAmount);
    setConvertedAmount(currencyAmount);
  };

  const scrollToContact = () => document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });

  const popularConversions = exchangeRates ? [
    { from: 'USD', to: 'EUR', rate: (exchangeRates.EUR / exchangeRates.USD).toFixed(4) },
    { from: 'EUR', to: 'GBP', rate: (exchangeRates.GBP / exchangeRates.EUR).toFixed(4) },
    { from: 'GBP', to: 'USD', rate: (exchangeRates.USD / exchangeRates.GBP).toFixed(4) },
    { from: 'USD', to: 'JPY', rate: (exchangeRates.JPY / exchangeRates.USD).toFixed(2) },
    { from: 'USD', to: 'NGN', rate: (exchangeRates.NGN / exchangeRates.USD).toFixed(0) },
  ] : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <HamburgerMenu />
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl tracking-tight">Digital<span className="text-blue-400">Pair</span></div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-blue-400 transition">Converter</a>
            <a href="#" className="hover:text-blue-400 transition">Rates</a>
            <button onClick={scrollToContact} className="hover:text-blue-400 transition">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Sign In</button>
          </nav>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <a href="#" className="hover:text-blue-400">Converter</a>
            <a href="#" className="hover:text-blue-400">Rates</a>
            <button onClick={scrollToContact} className="text-left hover:text-blue-400">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white">Sign In</button>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">Live Exchange Rates</h2>
            <button onClick={fetchRates} className="flex items-center gap-2 text-blue-400" disabled={loadingRates}>
              <RefreshCw className={`size-4 ${loadingRates ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
          {lastUpdate && <p className="text-sm text-gray-400 mb-4">Last updated: {lastUpdate.toLocaleTimeString()}</p>}
          <div className="grid md:grid-cols-3 gap-4">
            {exchangeRates ? Object.entries(exchangeRates).slice(0, 6).map(([code, rate]) => (
              <div key={code} className="border border-gray-800 rounded-xl p-4 hover:border-blue-500">
                <div className="flex justify-between"><span>{code}</span><span>{typeof rate === 'number' ? rate.toFixed(4) : rate}</span></div>
                <div className="text-3xl">1 USD = {typeof rate === 'number' ? rate.toFixed(4) : rate}</div>
              </div>
            )) : <div>Loading rates...</div>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="flex border-b border-gray-800">
              <button onClick={() => setActiveTab('currency')} className={`flex-1 py-4 ${activeTab === 'currency' ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400'}`}>Currency</button>
              <button onClick={() => setActiveTab('unit')} className={`flex-1 py-4 ${activeTab === 'unit' ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400'}`}>Unit</button>
            </div>
            <div className="p-8 space-y-6">
              {activeTab === 'currency' ? (
                <>
                  <input type="number" value={currencyAmount} onChange={(e) => setCurrencyAmount(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-2xl" />
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white">{currencies.map(c => <option key={c}>{c}</option>)}</select>
                  <button onClick={swapCurrencies} className="mx-auto block size-12 bg-gray-800 rounded-full"><ArrowRightLeft className="size-5 mx-auto text-blue-400" /></button>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white">{currencies.map(c => <option key={c}>{c}</option>)}</select>
                  <div className="bg-gray-800/50 rounded-xl p-6"><div className="text-4xl">{convertedAmount} {toCurrency}</div><div className="text-sm">1 {fromCurrency} = {exchangeRates ? (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4) : '?'} {toCurrency}</div></div>
                  <button onClick={handleCurrencyConvert} className="w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-700">Refresh Rates</button>
                </>
              ) : (
                <>
                  <input type="number" value={unitAmount} onChange={(e) => setUnitAmount(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-2xl" />
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white">
                    {unitCategories.map(cat => <optgroup key={cat.name} label={cat.name}>{cat.units.map(u => <option key={u} value={u}>{u}</option>)}</optgroup>)}
                  </select>
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white">
                    {unitCategories.map(cat => <optgroup key={cat.name} label={cat.name}>{cat.units.map(u => <option key={u} value={u}>{u}</option>)}</optgroup>)}
                  </select>
                  <div className="bg-gray-800/50 rounded-xl p-6"><div className="text-4xl">{convertedUnit} {toUnit}</div></div>
                  <button onClick={handleUnitConvert} className="w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-700">Convert</button>
                </>
              )}
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h3 className="text-xl mb-4">Popular Conversions</h3>
            <div className="space-y-2">
              {popularConversions.map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                  <span>{item.from} → {item.to}</span>
                  <span>{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer id="contact-footer" className="border-t border-gray-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div><div className="text-2xl font-bold mb-4">Digital<span className="text-blue-400">Pair</span></div><p className="text-gray-400 mb-6">Real-time currency exchange and unit conversions.</p><div className="space-y-3 text-gray-400"><div className="flex gap-3"><Mail /> nkananglawrence@gmail.com</div><div className="flex gap-3"><Phone /> +2348076469279</div><div className="flex gap-3"><MapPin /> Abuja, Nigeria</div></div></div>
            <div><h3 className="text-xl mb-4">Send us a message</h3><form className="space-y-4" onSubmit={(e) => e.preventDefault()}><input type="text" placeholder="Your name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><textarea rows={3} placeholder="Message" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"></textarea><button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Message</button></form></div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm"><div className="mb-2">Nexa<span className="text-blue-400">Solutions</span> — All rights reserved © 2026</div><button onClick={() => window.dispatchEvent(new CustomEvent('reset-portfolio'))} className="text-blue-400 hover:text-blue-300">← Back to all projects</button></div>
        </div>
      </footer>
    </div>
  );
}