# Group2-Project-202110-Bakery-Coders

## To run

1. Clone this repo
2. Add .env file at the root of your project with the following content:
   ```
    REACT_APP_API_KEY=<Yout API key from TheCocktailDB>
    PORT=3001
   ```
3. Add api folder also at the root with db.json inside:
   ```
    {
    "users": [
        {
        "id": "test@example.com",
        "fav": [
            {
            "id": "asdasdsadcascd",
            "name": "test",
            "thumb": "test",
            "apiId": "12345"
            }
        ],
        "custom": [
            {
            "name": "test",
            "thumb": "test",
            "recipe": "",
            "type": "",
            "glass": "",
            "alcoholic": "",
            "ingredients": [
                ""
            ],
            "ingredientsAmount": [
                ""
            ],
            "id": "12345"
            }
        ]
        },
    ]
   }
   ```
4. Run `npm i -g currently`
5. Run `npm run launch`
6. Enjoy 😜
