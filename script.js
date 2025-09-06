// Frontend JS for Salaryfy (calculations are illustrative and simplified)
document.addEventListener('DOMContentLoaded', function(){
  const computeBtn = document.getElementById('computeSalary');
  if(computeBtn){
    computeBtn.addEventListener('click', function(){
      const gross = Number(document.getElementById('gross').value) || 0;
      const basicPct = Number(document.getElementById('basicPct').value) || 40;
      const hraPct = Number(document.getElementById('hraPct').value) || 50;
      const otherAllow = Number(document.getElementById('otherAllow').value) || 0;
      const pfPct = Number(document.getElementById('pfPct').value) || 12;

      // Compute components
      const basic = +(gross * (basicPct/100)).toFixed(2);
      const hra = +(basic * (hraPct/100)).toFixed(2);
      const allowances = +otherAllow.toFixed(2);
      const employerPF = +(basic * 0.12).toFixed(2);
      const employeePF = +((basic * (pfPct/100))).toFixed(2);

      // Simplified taxable income = gross - employeePF - standard deduction
      const standardDeduction = 50000;
      const taxable = Math.max(0, gross - employeePF - standardDeduction);

      // Simple tax estimation (same slab as tax.html)
      function estimateTaxSimple(taxableIncome){
        let tax = 0;
        if(taxableIncome > 1000000){
          tax += (taxableIncome - 1000000) * 0.30;
          taxableIncome = 1000000;
        }
        if(taxableIncome > 500000){
          tax += (taxableIncome - 500000) * 0.20;
          taxableIncome = 500000;
        }
        if(taxableIncome > 250000){
          tax += (taxableIncome - 250000) * 0.05;
          taxableIncome = 250000;
        }
        return Math.round(tax);
      }

      const tax = estimateTaxSimple(taxable);
      const net = +(gross - tax - employeePF).toFixed(2);

      const breakdownBody = document.getElementById('breakdownBody');
      breakdownBody.innerHTML = '';
      const rows = [
        ['Annual Gross', '₹ ' + gross.toLocaleString()],
        ['Basic ('+basicPct+'%)', '₹ ' + basic.toLocaleString()],
        ['HRA ('+hraPct+'% of basic)', '₹ ' + hra.toLocaleString()],
        ['Other Allowances', '₹ ' + allowances.toLocaleString()],
        ['Employee PF ('+pfPct+'% of basic)', '₹ ' + employeePF.toLocaleString()],
        ['Employer PF (12% of basic)', '₹ ' + employerPF.toLocaleString()],
        ['Standard Deduction', '₹ ' + standardDeduction.toLocaleString()],
        ['Estimated Tax', '₹ ' + tax.toLocaleString()],
        ['Estimated Take-home (annual)', '₹ ' + net.toLocaleString()]
      ];
      for(const r of rows){
        const tr = document.createElement('tr');
        tr.innerHTML = '<td>'+r[0]+'</td><td style="text-align:right">'+r[1]+'</td>';
        breakdownBody.appendChild(tr);
      }
      document.getElementById('salaryResult').style.display = 'block';
      document.getElementById('salaryResult').scrollIntoView({behavior:'smooth'});
    });
  }

  // Tax estimator on calculators page
  const estBtn = document.getElementById('estimateTax');
  if(estBtn){
    estBtn.addEventListener('click', function(){
      const income = Number(document.getElementById('taxIncome').value) || 0;
      function estimateTaxSimple(income){
        let tax = 0;
        if(income > 1000000){
          tax += (income - 1000000) * 0.30;
          income = 1000000;
        }
        if(income > 500000){
          tax += (income - 500000) * 0.20;
          income = 500000;
        }
        if(income > 250000){
          tax += (income - 250000) * 0.05;
          income = 250000;
        }
        return Math.round(tax);
      }
      const tax = estimateTaxSimple(income);
      const out = document.getElementById('taxEstimate');
      out.style.display = 'block';
      document.getElementById('taxValue').textContent = 'Estimated tax: ₹ ' + tax.toLocaleString() + ' (simplified)';
      out.scrollIntoView({behavior:'smooth'});
    });
  }
});
