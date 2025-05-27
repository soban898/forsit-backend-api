# Forsit E-commerce Admin API

This is a back-end API built as part of the Forsit Back-end Developer Task. It powers an admin dashboard for managing products, inventory, and sales, and includes revenue analytics features.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- RESTful API (JSON)

---

## 🚀 Getting Started

1. Clone the Repository

```bash
git clone https://github.com/your-username/forsit-backend-api.git
cd forsit-backend-api

 2. Install Dependencies

npm install

3. Setup Environment Variables
Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

4. Start the Server

npm run dev


## To run demo data 

node demoData.js




API Endpoints
Products
Method	Endpoint	    Description
POST	/api/products	Add a new product
GET	    /api/products	Get all products



Inventory
Method	Endpoint	                Description
GET	    /api/inventory	            View inventory
POST	/api/inventory/update	    Add or update inventory
GET	    /api/inventory/low-stock	View low stock products



Sales
Method	Endpoint	                           Description
POST	/api/sales	                           Record a sale
GET	    /api/sales	                           Get sales (filter by date/product/etc.)
GET	    /api/sales/analytics?period=monthly	   Revenue by day/week/month/year