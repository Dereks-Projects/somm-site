// Run with: npx sanity exec migrations/addBeverageSite.js --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const CATEGORIES_TO_TAG = ['wine', 'spirits', 'beer', 'sake']

async function addBeverageToArticles() {
  console.log('Finding articles to update...')
  
  // Find all articles in target categories that DON'T already have "beverage" in sites
  const articles = await client.fetch(`
    *[_type == "article" 
      && category in $categories 
      && !("beverage" in sites)
    ] {
      _id,
      title,
      category,
      sites
    }
  `, { categories: CATEGORIES_TO_TAG })

  console.log(`Found ${articles.length} articles to update\n`)

  if (articles.length === 0) {
    console.log('No articles need updating. All done!')
    return
  }

  // Update each article
  for (const article of articles) {
    const currentSites = article.sites || []
    const newSites = [...currentSites, 'beverage']

    await client
      .patch(article._id)
      .set({ sites: newSites })
      .commit()

    console.log(`✓ ${article.category}: ${article.title}`)
  }

  console.log(`\n✅ Done! Tagged ${articles.length} articles with "beverage"`)
}

addBeverageToArticles().catch(console.error)