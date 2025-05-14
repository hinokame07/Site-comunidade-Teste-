import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = posts.find((p: Post) => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Post não encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
      >
        ← Voltar
      </button>
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
        </div>
      </article>
    </div>
  );
}