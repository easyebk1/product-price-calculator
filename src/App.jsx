import { useMemo, useState } from 'react';

const currency = new Intl.NumberFormat('el-GR', {
  style: 'currency',
  currency: 'EUR',
});

function Amount({ value }) {
  return <>{currency.format(value)}</>;
}

export default function App() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [profitRate, setProfitRate] = useState('20');
  const [vatRate, setVatRate] = useState('24');

  const results = useMemo(() => {
    const cost = Math.max(0, Number(purchasePrice) || 0);
    const profitPercent = Math.max(0, Number(profitRate) || 0);
    const vatPercent = Math.max(0, Number(vatRate) || 0);
    const profit = cost * (profitPercent / 100);
    const netSellingPrice = cost + profit;
    const vat = netSellingPrice * (vatPercent / 100);

    return { cost, profit, netSellingPrice, vat, finalPrice: netSellingPrice + vat };
  }, [purchasePrice, profitRate, vatRate]);

  function reset() {
    setPurchasePrice('');
    setProfitRate('20');
    setVatRate('24');
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Αρχική σελίδα">
          <span className="brand-mark" aria-hidden="true">€</span>
          <span>Τιμή<span className="brand-light">Τελική</span></span>
        </a>
        <span className="local-badge"><span className="status-dot" /> Υπολογισμός στη συσκευή σου</span>
      </header>

      <section className="intro" id="home">
        <div className="eyebrow"><span>✦</span> ΑΠΛΟΣ ΥΠΟΛΟΓΙΣΜΟΣ ΤΙΜΗΣ</div>
        <h1>Βρες την τελική<br /><span>τιμή πώλησης.</span></h1>
        <p>Πρόσθεσε το κέρδος και τον ΦΠΑ στην καθαρή τιμή αγοράς, εύκολα και γρήγορα.</p>
      </section>

      <section className="calculator" aria-label="Υπολογιστής τιμής πώλησης">
        <div className="form-panel">
          <div className="section-heading">
            <div className="step-number">01</div>
            <div><h2>Στοιχεία υπολογισμού</h2><p>Συμπλήρωσε τις τιμές παρακάτω</p></div>
          </div>

          <label className="field-label" htmlFor="purchase-price">Καθαρή τιμή αγοράς</label>
          <div className="input-wrap price-input">
            <input id="purchase-price" type="number" min="0" step="0.01" inputMode="decimal" placeholder="0,00" value={purchasePrice} onChange={(event) => setPurchasePrice(event.target.value)} />
            <span className="input-suffix">€</span>
          </div>

          <div className="field-grid">
            <div>
              <label className="field-label" htmlFor="profit-rate">Ποσοστό κέρδους</label>
              <div className="input-wrap">
                <input id="profit-rate" type="number" min="0" step="0.1" inputMode="decimal" value={profitRate} onChange={(event) => setProfitRate(event.target.value)} />
                <span className="input-suffix">%</span>
              </div>
              <p className="field-hint">Υπολογίζεται πάνω στην τιμή αγοράς</p>
            </div>
            <div>
              <label className="field-label" htmlFor="vat-rate">ΦΠΑ</label>
              <div className="input-wrap">
                <input id="vat-rate" type="number" min="0" step="0.1" inputMode="decimal" value={vatRate} onChange={(event) => setVatRate(event.target.value)} />
                <span className="input-suffix">%</span>
              </div>
              <p className="field-hint">Εφαρμόζεται στην τιμή πώλησης</p>
            </div>
          </div>

          <div className="formula-note"><span className="info-icon" aria-hidden="true">i</span><span>Το κέρδος υπολογίζεται ως ποσοστό πάνω στην καθαρή τιμή αγοράς.</span></div>
          <button className="reset-button" type="button" onClick={reset}><span aria-hidden="true">↻</span> Επαναφορά τιμών</button>
        </div>

        <aside className="result-panel" aria-live="polite" aria-label="Αποτελέσματα υπολογισμού">
          <div className="result-header"><div><div className="result-overline">ΑΝΑΛΥΣΗ ΤΙΜΗΣ</div><h2>Το αποτέλεσμα</h2></div><span className="chart-icon" aria-hidden="true">↗</span></div>

          <div className="breakdown">
            <div className="result-row"><span>Καθαρή τιμή αγοράς</span><strong><Amount value={results.cost} /></strong></div>
            <div className="result-row"><span>Κέρδος ({Number(profitRate) || 0}%)</span><strong className="positive">+ <Amount value={results.profit} /></strong></div>
            <div className="result-row subtotal"><span>Τιμή πώλησης χωρίς ΦΠΑ</span><strong><Amount value={results.netSellingPrice} /></strong></div>
            <div className="result-row"><span>ΦΠΑ ({Number(vatRate) || 0}%)</span><strong><Amount value={results.vat} /></strong></div>
          </div>

          <div className="total-card"><div><span>ΤΕΛΙΚΗ ΤΙΜΗ</span><small>Συμπεριλαμβανομένου ΦΠΑ</small></div><strong><Amount value={results.finalPrice} /></strong></div>
          <p className="privacy-note"><span aria-hidden="true">✓</span> Οι υπολογισμοί γίνονται άμεσα. Δεν αποθ��κεύονται στοιχεία.</p>
        </aside>
      </section>

      <footer>Φτιαγμένο για γρήγορους και ξεκάθαρους υπολογισμούς <span aria-hidden="true">·</span> Όλα τα ποσά σε ευρώ (€)</footer>
    </main>
  );
}
