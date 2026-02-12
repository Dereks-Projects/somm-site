import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ARTICLES
      S.listItem()
        .title('Articles')
        .child(
          S.list()
            .title('Articles')
            .items([
              S.listItem()
                .title('All Articles')
                .child(
                  S.documentTypeList('article').title('All Articles')
                ),
              S.divider(),

              // Wine
              S.listItem()
                .title('Wine')
                .child(
                  S.list()
                    .title('Wine Articles')
                    .items([
                      S.listItem()
                        .title('All Wine')
                        .child(
                          S.documentTypeList('article')
                            .title('All Wine')
                            .filter('_type == "article" && category == "wine"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'wine', [
                        'Regions', 'Grapes', 'Producers', 'History', 'Business',
                      ]),
                    ])
                ),

              // Spirits
              S.listItem()
                .title('Spirits')
                .child(
                  S.list()
                    .title('Spirits Articles')
                    .items([
                      S.listItem()
                        .title('All Spirits')
                        .child(
                          S.documentTypeList('article')
                            .title('All Spirits')
                            .filter('_type == "article" && category == "spirits"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'spirits', [
                        'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Scotch', 'Other Spirits',
                      ]),
                    ])
                ),

              // Beer
              S.listItem()
                .title('Beer')
                .child(
                  S.list()
                    .title('Beer Articles')
                    .items([
                      S.listItem()
                        .title('All Beer')
                        .child(
                          S.documentTypeList('article')
                            .title('All Beer')
                            .filter('_type == "article" && category == "beer"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'beer', [
                        'Styles', 'Producers', 'Regions', 'Specialty', 'Trappist Beer', 'Business',
                      ]),
                    ])
                ),

              // Sake
              S.listItem()
                .title('Sake')
                .child(
                  S.list()
                    .title('Sake Articles')
                    .items([
                      S.listItem()
                        .title('All Sake')
                        .child(
                          S.documentTypeList('article')
                            .title('All Sake')
                            .filter('_type == "article" && category == "sake"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'sake', [
                        'Introduction', 'Styles', 'Producers', 'Regions',
                      ]),
                    ])
                ),

              // Coffee & Tea
              S.listItem()
                .title('Coffee & Tea')
                .child(
                  S.list()
                    .title('Coffee & Tea Articles')
                    .items([
                      S.listItem()
                        .title('All Coffee & Tea')
                        .child(
                          S.documentTypeList('article')
                            .title('All Coffee & Tea')
                            .filter('_type == "article" && category == "coffee-tea"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'coffee-tea', [
                        'History', 'Production', 'Styles',
                      ]),
                    ])
                ),

              // Hospitality
              S.listItem()
                .title('Hospitality')
                .child(
                  S.list()
                    .title('Hospitality Articles')
                    .items([
                      S.listItem()
                        .title('All Hospitality')
                        .child(
                          S.documentTypeList('article')
                            .title('All Hospitality')
                            .filter('_type == "article" && category == "hospitality"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'hospitality', [
                        'Experiences', 'Employment', 'Ratings Systems', 'Service', 'Industry Insights',
                      ]),
                    ])
                ),

              // Education
              S.listItem()
                .title('Education')
                .child(
                  S.list()
                    .title('Education Articles')
                    .items([
                      S.listItem()
                        .title('All Education')
                        .child(
                          S.documentTypeList('article')
                            .title('All Education')
                            .filter('_type == "article" && category == "education"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'education', [
                        'Reference', 'Law', 'Science',
                      ]),
                    ])
                ),

              // Service
              S.listItem()
                .title('Service')
                .child(
                  S.list()
                    .title('Service Articles')
                    .items([
                      S.listItem()
                        .title('All Service')
                        .child(
                          S.documentTypeList('article')
                            .title('All Service')
                            .filter('_type == "article" && category == "service"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'service', [
                        'Restaurant Awards', 'Guest Service', 'Product Knowledge', 'Management Principles',
                      ]),
                    ])
                ),

              // Industry
              S.listItem()
                .title('Industry')
                .child(
                  S.list()
                    .title('Industry Articles')
                    .items([
                      S.listItem()
                        .title('All Industry')
                        .child(
                          S.documentTypeList('article')
                            .title('All Industry')
                            .filter('_type == "article" && category == "industry"')
                        ),
                      S.divider(),
                      ...buildSubcategoryItems(S, 'industry', [
                        'Current Events', 'Consumer Knowledge', 'Industry Events', 'Beverage Business',
                      ]),
                    ])
                ),
            ])
        ),

      S.divider(),

      // STUDY GUIDES
      S.listItem()
        .title('Study Guides')
        .child(
          S.list()
            .title('Study Guides')
            .items([
              S.listItem()
                .title('All Study Guides')
                .child(
                  S.documentTypeList('studyGuide').title('All Study Guides')
                ),
              S.divider(),
              ...['wine', 'spirits', 'beer', 'sake', 'coffee-tea', 'hospitality', 'education', 'service', 'industry'].map(
                (cat) =>
                  S.listItem()
                    .title(
                      cat === 'coffee-tea'
                        ? 'Coffee & Tea'
                        : cat.charAt(0).toUpperCase() + cat.slice(1)
                    )
                    .child(
                      S.documentTypeList('studyGuide')
                        .title(`${cat === 'coffee-tea' ? 'Coffee & Tea' : cat.charAt(0).toUpperCase() + cat.slice(1)} Study Guides`)
                        .filter('_type == "studyGuide" && category == $category')
                        .params({ category: cat })
                    )
              ),
            ])
        ),

      S.divider(),

      // GEOGRAPHY
      S.listItem()
        .title('Geography')
        .child(
          S.documentTypeList('geography').title('Geography')
        ),
    ])

// Helper — builds subcategory filter items
function buildSubcategoryItems(
  S: any,
  category: string,
  subcategories: string[]
) {
  return subcategories.map((sub) =>
    S.listItem()
      .title(sub)
      .child(
        S.documentTypeList('article')
          .title(sub)
          .filter('_type == "article" && category == $category && subcategory == $subcategory')
          .params({ category, subcategory: sub })
      )
  )
}