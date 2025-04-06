# Movie Reviews API

## 📖 Project Explanation

This API extends the functionality of a movie database by adding support for user-submitted reviews. Each review is linked to a movie and includes the reviewer's name, a rating out of five stars, and the review text.

Key features include:
- A new `Reviews` collection in MongoDB.
- JWT-protected POST endpoint to create reviews.
- Aggregated movie and review data using MongoDB’s `$lookup`.
- RESTful endpoints for fetching and submitting reviews.
- Postman collection with valid and invalid test cases.

The project is built using **Node.js**, **Express**, and **MongoDB (Atlas)** and is deployed via **Render**.

GitHub Repository: [https://github.com/YellowVEVO/HW3.git](https://github.com/YellowVEVO/HW3.git)

---

## 🛠 Installation & Usage Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YellowVEVO/HW3.git
   cd HW3
2. **Insall Dependencies**
   npm install express mongoose dotenv jsonwebtoken body-parser passport passport-jwt bcryptjs cors
3. **Create a .env file in needed with the following info**
    
    SECRET_KEY=m81LFJytxulip123F3+NMs78ED/YclvIRP0vidCpLT4=
    
    DB=mongodb+srv://admin:admin@movies.6ni9j.mongodb.net/?retryWrites=true&w=majority&appName=Movies
    
    PORT=3000
    
    JWT_SECRET=7e40dba93391fa088483565a9393a107f1fd5c088f9ed324cd9829e9870736a6
5. **Run the server locally**
    
    npm start
    
    npm run dev
    
    http://localhost:3000
4. **Access the api online**
    https://hw3-1-5b2b.onrender.com

## Postman tests
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/41591557-544d71c5-f8fb-4b50-97f1-bd90ce12afd6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D41591557-544d71c5-f8fb-4b50-97f1-bd90ce12afd6%26entityType%3Dcollection%26workspaceId%3D61984351-8acb-4636-848b-e5f224313d37#?env%5Bmorady_HW4%5D=W3sia2V5IjoiZWNob19ib2R5IiwidmFsdWUiOiJoZWxsbyB3b3JsZCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaGVsbG8gd29ybGQiLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6ImhlbGxvIHdvcmxkIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6IkpXVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IkpXVC4uLiIsImNvbXBsZXRlU2Vzc2lvblZhbHVlIjoiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqVXhZVGd5WXpZMFkyVTNOMk0zTUdGbU5UUTFZekpoTXpjMVpXUTFOR0U1TW1VM01qQXdaakFpTENKMWMyVnlibUZ0WlNJNkltSmhkRzFoYmlJc0ltbGhkQ0k2TVRjek9UZ3pOamMxT1gwLm5UTEhZZHhtN2VsczVZVkU2bXNta3hqWXhvSXplT04xV1lWNzZ0aExMSG8iLCJzZXNzaW9uSW5kZXgiOjF9XQ==)

##