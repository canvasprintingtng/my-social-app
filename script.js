const supabase = supabase.createClient(
  'https://bqctsicmfeihmxmzentm.supabase.co', // এই জায়গায় আপনার Supabase URL বসাবেন
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY3RzaWNtZmVpaG14bXplbnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Mjg4MDUsImV4cCI6MjA2NDAwNDgwNX0.qgrFkDHbRz1BLLEdgwzdj3HN_RJjrDfUAkLYcG5y3cQ' // এই জায়গায় আপনার Supabase Public API key বসাবেন
);

const form = document.getElementById('post-form');
const postsDiv = document.getElementById('posts');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const content = document.getElementById('content').value;
  
  const { error } = await supabase.from('posts').insert([{ username, content }]);
  if (error) alert('Error posting!');
  else {
    form.reset();
    loadPosts();
  }
});

async function loadPosts() {
  const { data, error } = await supabase.from('posts').select('*').order('id', { ascending: false });
  if (!error) {
    postsDiv.innerHTML = data.map(post => `
      <div class="post">
        <strong>${post.username}</strong><br/>
        ${post.content}
      </div>
    `).join('');
  }
}

loadPosts();
