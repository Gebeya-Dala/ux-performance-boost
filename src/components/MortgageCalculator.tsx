import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, Landmark, DollarSign, Percent, Calendar, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(650000);
  const [downPayment, setDownPayment] = useState(130000);
  const [interestRate, setInterestRate] = useState(5.75);
  const [loanTerm, setLoanTerm] = useState(30);

  const monthlyPayment = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) return principal / numberOfPayments;

    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(payment) ? 0 : payment;
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100/50 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Financial Tools</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Interactive Mortgage Calculator</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Calculate your buying power. Adjust the parameters below to estimate your monthly mortgage payments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Inputs */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="space-y-10">
                {/* Home Price */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-blue-600" /> Home Price
                    </label>
                    <span className="text-2xl font-black text-blue-600">{formatCurrency(homePrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="10000"
                    value={homePrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setHomePrice(val);
                      if (downPayment > val) setDownPayment(val);
                    }}
                    className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                    <span>$100k</span>
                    <span>$5M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-blue-600" /> Down Payment
                    </label>
                    <div className="text-right">
                      <span className="text-2xl font-black text-blue-600 block leading-none">{formatCurrency(downPayment)}</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{downPaymentPercent}% of price</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={homePrice}
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <Percent className="w-5 h-5 text-blue-600" /> Interest Rate
                      </label>
                      <span className="text-2xl font-black text-blue-600">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Loan Term */}
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" /> Loan Term
                      </label>
                    </div>
                    <div className="flex gap-3">
                      {[15, 20, 30].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`flex-1 py-3.5 rounded-2xl font-bold transition-all border-2 ${
                            loanTerm === term
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                              : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:bg-blue-50/50'
                          }`}
                        >
                          {term} Years
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-5 flex">
              <motion.div
                layout
                className="bg-slate-900 w-full p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Calculator size={200} />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live Estimate
                  </div>
                  
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">
                    Estimated Monthly Payment
                  </p>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-6xl font-black text-white">
                      {formatCurrency(monthlyPayment)}
                    </span>
                    <span className="text-xl font-medium text-slate-400">/mo</span>
                  </div>

                  <div className="space-y-6 pt-10 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Principal & Interest</span>
                      <span className="font-bold text-lg">{formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Loan Amount</span>
                      <span className="font-bold text-lg">{formatCurrency(homePrice - downPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Over {loanTerm} Years</span>
                      <span className="font-bold text-lg text-blue-400">
                        {formatCurrency(monthlyPayment * loanTerm * 12)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl text-sm mb-8 border border-white/5">
                    <Info className="w-6 h-6 shrink-0 text-blue-400" />
                    <p className="text-slate-400 leading-relaxed">
                      Actual rates vary based on credit score, location, and other factors. 
                      Estimate excludes property taxes and insurance.
                    </p>
                  </div>

                  <button className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                    Get Mortgage Pre-Approval
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};