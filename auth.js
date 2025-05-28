const supabase = supabase.createClient(
  'https://bqctsicmfeihmxmzentm.supabase.co', // এই জায়গায় আপনার Supabase URL বসাবেন
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY3RzaWNtZmVpaG14bXplbnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Mjg4MDUsImV4cCI6MjA2NDAwNDgwNX0.qgrFkDHbRz1BLLEdgwzdj3HN_RJjrDfUAkLYcG5y3cQ' // এই জায়গায় আপনার Supabase Public API key বসাবেন
);

// রেজিস্ট্রেশন
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const { error } = await supabase.from('profiles').insert([{ name, email, password }]);
  if (error) {
    alert("রেজিস্ট্রেশন ব্যর্থ ❌");
  } else {
    alert("রেজিস্ট্রেশন সফল ✅");
  }
});

// লগইন
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    alert("লগইন ব্যর্থ ❌");
  } else {
    localStorage.setItem('user', JSON.stringify(data));
    alert("লগইন সফল ✅");
    window.location.href = "profile.html";
  }
});
