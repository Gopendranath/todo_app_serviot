# Postman Collections

This directory stores the Postman collections and environment files for the backend API.

## How to export from Postman

1. Open Postman.
2. Select your collection.
3. Click on the three dots (...) and select **Export**.
4. Choose **Collection v2.1 (recommended)**.
5. Save the JSON file as `backend/postman/collection.json`.

## How to export environments

1. Go to **Environments** in Postman.
2. Select your environment (e.g., `local` or `staging`).
3. Click on the three dots (...) and select **Export**.
4. Save the JSON file as `backend/postman/environment.json`.

## Running with Newman

You can run these collections from the CLI using [Newman](https://www.npmjs.com/package/newman).

```bash
# Install newman
npm install -g newman

# Run the collection
newman run backend/postman/collection.json -e backend/postman/environment.json
```
