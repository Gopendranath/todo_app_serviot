# Postman Collections

This directory stores the Postman collections and environment files for the backend API.

## How to Import into Postman

1. Open Postman.
2. Click the **Import** button in the top-left corner.
3. Select the file: `backend/postman/Postman-Collection-export-21_03_2026.json`.
4. Once imported, you will see a collection named **TODO_APP_SERVIOT**.

### Setting up Environment Variables

The collection uses a `{{baseUrl}}` variable. To configure it:

1. Go to **Environments** in Postman.
2. Create a new environment named `Local`.
3. Add a variable named `baseUrl`.
4. Set its value to `http://localhost:4000/api/v1`.
5. Select the `Local` environment from the dropdown in the top-right corner.

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
newman run backend/postman/Postman-Collection-export-21_03_2026.json -e backend/postman/environment.json
```
