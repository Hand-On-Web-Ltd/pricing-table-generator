let tiers = [
  { name: "Starter", price: 9, annual: 90, features: "5 projects\n1 GB storage\nEmail support", cta: "Get Started", featured: false },
  { name: "Pro", price: 29, annual: 290, features: "25 projects\n10 GB storage\nPriority support\nAPI access", cta: "Go Pro", featured: true },
  { name: "Business", price: 79, annual: 790, features: "Unlimited projects\n100 GB storage\nDedicated manager\nAPI access\nCustom branding", cta: "Contact Us", featured: false }
];
let style = "rounded";
let annual = false;

function render() {
  renderEditor();
  renderPreview();
}

function renderEditor() {
  const ed = document.getElementById('tierList');
  ed.innerHTML = '';
  tiers.forEach((t, i) => {
    ed.innerHTML += `
      <div class="tier-block">
        <button class="remove-tier" onclick="removeTier(${i})">×</button>
        <h4>Tier ${i + 1}</h4>
        <div class="form-group"><label>Name</label><input value="${t.name}" onchange="tiers[${i}].name=this.value;renderPreview()"></div>
        <div class="form-group"><label>Monthly Price (£)</label><input type="number" value="${t.price}" onchange="tiers[${i}].price=Number(this.value);renderPreview()"></div>
        <div class="form-group"><label>Annual Price (£)</label><input type="number" value="${t.annual}" onchange="tiers[${i}].annual=Number(this.value);renderPreview()"></div>
        <div class="form-group"><label>Features (one per line)</label><textarea onchange="tiers[${i}].features=this.value;renderPreview()">${t.features}</textarea></div>
        <div class="form-group"><label>Button Text</label><input value="${t.cta}" onchange="tiers[${i}].cta=this.value;renderPreview()"></div>
        <div class="form-group"><label><input type="checkbox" ${t.featured?'checked':''} onchange="tiers[${i}].featured=this.checked;renderPreview()"> Featured</label></div>
      </div>`;
  });
}

function renderPreview() {
  const prev = document.getElementById('previewArea');
  const cls = style === 'flat' ? 'style-flat' : style === 'gradient' ? 'style-gradient' : '';
  let html = `<div class="pricing-table ${cls}">`;
  tiers.forEach(t => {
    const p = annual ? t.annual : t.price;
    const period = annual ? '/year' : '/month';
    const feats = t.features.split('\n').filter(f=>f.trim()).map(f => `<li>${f.trim()}</li>`).join('');
    html += `<div class="pricing-card${t.featured?' featured':''}">
      <h3>${t.name}</h3>
      <div class="price">£${p}<span>${period}</span></div>
      <ul>${feats}</ul>
      <a href="#" class="cta">${t.cta}</a>
    </div>`;
  });
  html += '</div>';
  prev.innerHTML = html;
}

function addTier() {
  tiers.push({ name: "New Tier", price: 0, annual: 0, features: "Feature 1\nFeature 2", cta: "Choose Plan", featured: false });
  render();
}

function removeTier(i) { tiers.splice(i, 1); render(); }

function setStyle(s) { style = s; renderPreview(); }

function toggleBilling() {
  annual = !annual;
  document.getElementById('billingToggle').classList.toggle('active', annual);
  document.getElementById('billingLabel').textContent = annual ? 'Annual' : 'Monthly';
  renderPreview();
}

function exportHTML() {
  const html = document.getElementById('previewArea').innerHTML;
  const formatted = html.replace(/></g, '>\n<');
  document.getElementById('exportCode').value = formatted;
  document.getElementById('exportModal').classList.add('active');
}

function closeModal() { document.getElementById('exportModal').classList.remove('active'); }

function copyCode() {
  document.getElementById('exportCode').select();
  document.execCommand('copy');
  alert('Copied!');
}

render();
