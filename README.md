# dlbr-sync

## Deprecation Notice

The [contentful-export](https://github.com/contentful/contentful-export/) tool allows you to export all content, including content types, assets and webhooks from a space. The new import tool enables you to import external content into a new space.

```bash
npm i

cat > .env << EOL
CONTENTFUL_SPACE=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_INITIAL_SYNC=true
EOL

npm run dev
```
