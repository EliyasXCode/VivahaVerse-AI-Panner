# 💍 VivahaVerse AI – Intelligent Destination Wedding Planner for India
> **Created by Wibe Coding**
> *"Your Dream Destination. Designed by Intelligence."*

VivahaVerse AI is a luxury, production-quality Full-Stack MERN + Generative AI platform engineered for destination weddings across India. Powered by Google Gemini 3.7 Flash & Gemini 3.1 Flash Image, database grounding in MongoDB Atlas, and a deterministic financial budget engine.

---

## ✨ Features at a Glance

- 🧠 **Database-Grounded AI Wedding Planner**: 5-step wizard using `@google/genai` (`gemini-3.7-flash`) grounded in MongoDB destination metrics.
- 🎨 **AI Wedding Visualizer Studio**: Synthesizes photorealistic concept imagery for Haldi, Mehendi, Sangeet, Wedding Mandaps, and Receptions via `gemini-3.1-flash-image`.
- 📍 **20+ Curated Indian Destination Hubs**: Udaipur, Jaipur, South Goa, Kerala, Jaisalmer, Rishikesh, Mussoorie, Jim Corbett, Shimla, Andaman, and more.
- 💰 **Multi-Tier Budget Calculator**: Deterministic cost engine (Essential, Premium, Royal Luxury) with AI cost-optimization advice.
- ⚖️ **Side-by-Side Venue Compare Matrix**: Compare up to 3 luxury properties across capacity, room inventory, airport distance, and venue styles with AI comparative synthesis.
- 💬 **24/7 AI Concierge Chat ("Ask Vivaha AI")**: Floating drawer assistant with natural language query capabilities.
- 📋 **Couples Dashboard & Interactive Checklist**: Real-time task tracker and saved AI plan management.
- 👑 **Admin Operations Center**: Live metrics, destination/venue management, registered user directory, and inquiry pipeline.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Hook Form, Zod, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB Atlas / Mongoose ODM, JWT, bcryptjs, cookie-parser
- **Generative AI**: Google Gemini API (`@google/genai` SDK)
  - Reasoning / Planning Model: `gemini-3.7-flash`
  - Concept Image Model: `gemini-3.1-flash-image`

---

## 💻 How to Run in VS Code (Step-by-Step)

### **Prerequisites**
- [VS Code](https://code.visualstudio.com/) installed
- [Node.js](https://nodejs.org/) (v18 or higher) installed
- MongoDB installed locally OR a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
- A [Google Gemini API Key](https://aistudio.google.com/)

---

### **1. Clone & Open in VS Code**

```bash
git clone https://github.com/your-username/vivahaverse-ai.git
cd vivahaverse-ai
code .
```

---

### **2. Setup Environment Variables**

Create a `.env` file inside the `server/` directory:

`server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vivahaverse
JWT_SECRET=vivahaverse_super_secret_jwt_key_2026_luxury_wedding
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_TEXT_MODEL=gemini-3.7-flash
GEMINI_IMAGE_MODEL=gemini-3.1-flash-image
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=http://localhost:5173
```

---

### **3. Install Dependencies & Seed Database**

Open a new terminal in VS Code (`Ctrl + ~` or `Cmd + ~`) and run:

#### **Backend Setup**
```bash
cd server
npm install
npm run seed
```
> *(Output: `Successfully seeded 20 destinations, 4 venues, 2 inspiration stories`)*

#### **Frontend Setup**
```bash
cd ../client
npm install
```

---

### **4. Start the Application**

You need to run both **Backend** and **Frontend** servers concurrently.

#### **Terminal 1: Start Backend API**
```bash
cd server
npm run dev
```
> 🚀 *Backend API runs at: `http://localhost:5000`*

#### **Terminal 2: Start Frontend App**
Open a second terminal tab in VS Code and run:
```bash
cd client
npm run dev
```
> 🌐 *Frontend Web App runs at: `http://localhost:5173`*

---

### **5. Open in Web Browser**

Navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | User sign in (HttpOnly JWT) |
| `GET` | `/api/destinations` | List & multi-filter destinations |
| `GET` | `/api/destinations/:slug` | Destination detail view |
| `GET` | `/api/venues` | List verified venue properties |
| `POST` | `/api/venues/compare` | Compare up to 3 venues with AI analysis |
| `POST` | `/api/ai/wedding-plan` | Generate database-grounded AI wedding plan |
| `POST` | `/api/ai/chat` | AI Concierge chat query |
| `POST` | `/api/ai/generate-wedding-image` | Synthesize photorealistic AI concept image |
| `POST` | `/api/ai/budget-advice` | Calculate multi-tier budget & AI tips |
| `POST` | `/api/inquiries` | Submit 5-step wedding inquiry |
| `GET` | `/api/admin/users` | List all registered MongoDB users (Admin) |

---

## 🎨 Design System

- **Background**: `#FFFDF9`, `#FAF6F0`, `#F7F0E8`
- **Primary Wine**: `#651F2F`
- **Deep Burgundy**: `#46131E`
- **Antique Gold**: `#B99256`
- **Champagne**: `#D8C3A3`
- **Soft Blush**: `#EFDAD6`
- **Typography**: Headings (*Cormorant Garamond / Playfair Display*), Body (*Inter / Manrope*)

---

## 👨‍💻 Author & Credits

**Created by Wibe Coding**  
*VivahaVerse AI – Intelligent Destination Wedding Planner for India*
