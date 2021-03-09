module.exports = {
  tags: {
    allowUnknownTags: false,
    dictionaries: ['jsdoc']
  },
  source: {
    include: ['package.json', 'README.md'],
    includePattern: '.js$',
    excludePattern: '(node_modules/|docs)'
  },
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: false,
    monospaceLinks: true,
    useLongnameInNav: false,
    showInheritedInNav: true,
    default: { includeDate: false }
  },
  opts: {
    destination: './docs/',
    encoding: 'utf8',
    private: true,
    recurse: true,
    template: '../node_modules/docdash'
  }
};
