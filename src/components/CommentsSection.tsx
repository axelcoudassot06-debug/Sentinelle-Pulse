'use client';

import { Comment } from '@/lib/comments';

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  if (!comments || comments.length === 0) {
    return (
      <div style={{ 
        marginTop: '48px', 
        paddingTop: '32px', 
        borderTop: '1px solid var(--border)' 
      }}>
        <h3 style={{ marginBottom: '24px' }}>Commentaires</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Soyez le premier à commenter cet article.
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      marginTop: '48px', 
      paddingTop: '32px', 
      borderTop: '1px solid var(--border)' 
    }}>
      <h3 style={{ marginBottom: '24px' }}>
        Commentaires ({comments.length})
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {comments.map((comment) => (
          <div 
            key={comment.id}
            style={{
              padding: '20px',
              background: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                {comment.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  {comment.author}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                  {new Date(comment.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <p style={{ 
              color: 'var(--text-primary)', 
              lineHeight: 1.6,
              margin: 0,
              fontSize: '0.9375rem'
            }}>
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
