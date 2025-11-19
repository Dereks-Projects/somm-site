import { client } from '../../sanity/lib/client.ts';
import { allArticlesQuery } from '../../sanity/queries';

export default async function TestArticlesPage() {
  // Fetch articles from Sanity
  const articles = await client.fetch(allArticlesQuery);
  
  // Log to console
  console.log('Articles fetched:', articles);
  console.log('Number of articles:', articles.length);

  return (
    <div style={{ padding: '40px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <h1 style={{ color: 'black' }}>Wine Articles Test</h1>
      <p style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
        Total articles found: {articles.length}
      </p>
      
      {articles.length === 0 && (
        <p style={{ color: 'red', fontSize: '18px' }}>
          No articles found! Check the console for details.
        </p>
      )}
      
      {/* Display each article's data */}
      {articles.map((article) => (
        <div key={article._id} style={{ 
          border: '2px solid black', 
          padding: '20px', 
          marginBottom: '20px',
          backgroundColor: 'white'
        }}>
          <h2 style={{ color: 'black' }}>{article.title}</h2>
            <p style={{ color: 'black' }}><strong>Subtitle:</strong> {article.subtitle || 'No subtitle'}</p>
            <p style={{ color: 'black' }}><strong>Subcategory:</strong> {article.subcategory || 'No subcategory'}</p>
            <p style={{ color: 'black' }}><strong>Category:</strong> {article.category}</p>
            <p style={{ color: 'black' }}><strong>Published:</strong> {article.publishedAt || 'No date'}</p>
            <p style={{ color: 'black' }}><strong>Author:</strong> {article.author || 'No author'}</p>
          {article.mainImage && article.mainImage.asset && (
            <img 
              src={article.mainImage.asset.url} 
              alt={article.mainImage.alt || article.title}
              style={{ maxWidth: '300px', border: '1px solid black', marginTop: '10px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}