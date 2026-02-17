# BestSelf — Fitness & Meal Generation System

BestSelf is a full-stack Next.js application built using the App Router architecture. It dynamically generates structured workout routines and meal recommendations based on user-selected parameters.

The system applies rule-based filtering and randomized selection logic through modular components and API routes to produce tailored fitness and nutrition outputs within defined constraints.

---

## 🚀 Core Features

### 🏋️ Workout Generation
- Filter by body focus
- Select intensity level
- Choose workout frequency
- Dynamic routine generation based on user-defined parameters

### 🍽 Meal Generation
- Category filtering (seafood, chicken, beef, breakfast, lunch, dinner)
- Structured meal data modeling
- Randomized selection within defined constraints

---

## 🧠 Architecture Overview

BestSelf is built using the Next.js App Router and leverages API route handlers located in `app/api/` to manage generation logic.

### Application Structure
- `app/` — App Router structure
- `app/api/` — Server-side route handlers
- Modular UI components
- Separation of business logic and presentation
- Parameter validation and controlled randomization

The architecture emphasizes modularity, scalability, and maintainability.

---

## 🛠 Tech Stack

- Next.js (App Router)
- React
- JavaScript
- API Route Handlers
- CSS

---

## 📦 Installation

```bash
git clone https://github.com/romanedorrel/bestself-fitness-generator.git
cd bestself-fitness-generator
npm install
npm run dev

Then visit:
http://localhost:3000

---

## 📈 Future Improvements

- User authentication and plan persistence
- Database-backed data storage
- Expanded workout and meal datasets
- Performance optimization for larger datasets
- Automated testing implementation

---

## 🎯 Purpose

BestSelf demonstrates full-stack application structure using Next.js App Router, modular design principles, and rule-based generation logic within a modern web framework.
