
const { createApp, computed } = Vue;

createApp({
  data() {
    return {
      form: {
        tutor: '',
        phone: '',
        pet: '',
        type: 'cachorro',
        size: 'pequeno',
        date: '',
        time: '',
        distance: 5,
        from: '',
        to: '',
        extras: { banho: false, tosa: false, rastreamento: false }
      },
      lastBooking: null
    }
  },
  computed: {
    basePrice() { return 25; },
    sizeFee() {
      const map = { pequeno: 0, medio: 8, grande: 15 };
      return map[this.form.size] || 0;
    },
    distanceFee() {
      const km = Number(this.form.distance) || 0;
      if (km <= 5) return 14;
      return 14 + (km - 5) * 3.5;
    },
    extrasTotal() {
      let total = 0;
      if (this.form.extras.banho) total += 30;
      if (this.form.extras.tosa) total += 35;
      if (this.form.extras.rastreamento) total += 10;
      return total;
    },
    total() {
      return this.basePrice + this.sizeFee + this.distanceFee + this.extrasTotal;
    }
  },
  methods: {
    currency(v) {
      return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    formatDate(iso) {
      if (!iso) return '';
      const [y,m,d] = iso.split('-').map(Number);
      return new Date(y, m-1, d).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
    },
    handleSubmit() {
      // Simple validation
      const required = ['tutor','phone','pet','date','time','from','to'];
      for (const f of required) {
        if (!this.form[f] || String(this.form[f]).trim().length === 0) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
      }
      this.lastBooking = { ...this.form, total: this.total };
      // Reset some fields
      this.form.pet = '';
      this.form.extras = { banho: false, tosa: false, rastreamento: false };
      window.scrollTo({ top: document.querySelector('#agendar').offsetTop - 20, behavior: 'smooth' });
    }
  },
  mounted() {
    // Set min date as today
    const today = new Date().toISOString().slice(0,10);
    this.form.date = today;
    document.getElementById('year').textContent = new Date().getFullYear();
  }
}).mount('#app');
