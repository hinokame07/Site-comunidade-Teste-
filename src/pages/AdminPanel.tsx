import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    setTitle('');
    setContent('');
    setImageUrl('');
    alert('Post publicado com sucesso!');
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('announcement', announcement);
    setAnnouncement('');
    alert('Anúncio atualizado com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel do Administrador</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Nova Postagem</h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Conteúdo
            </label>
            <textarea
              id="content"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              URL da Imagem
            </label>
            <input
              type="url"
              id="imageUrl"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Publicar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Gerenciar Anúncio</h2>
        <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
          <div>
            <label htmlFor="announcement" className="block text-sm font-medium text-gray-700">
              Texto do Anúncio
            </label>
            <input
              type="text"
              id="announcement"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Atualizar Anúncio
          </button>
        </form>
      </div>
    </div>
  );
}