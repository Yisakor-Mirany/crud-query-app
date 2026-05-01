const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(userId) {
  const url = userId
    ? `${BASE_URL}/posts?userId=${userId}`
    : `${BASE_URL}/posts`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function createPost(data) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost({ id, title, body }) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, body, userId: 1 }),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

export async function patchPost({ id, title }) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Failed to patch post');
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return id;
}
