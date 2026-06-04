# ✈️ BD TRIPPER - Visa & Travel Services

Welcome to **BD TRIPPER**! Your trusted travel partner for premium Visa Processing and Bank Solvency support. Our platform ensures a hassle-free, fully responsive, and modern experience for all our users.

![BD Tripper Banner](https://images.pexels.com/photos/3769118/pexels-photo-3769118.jpeg?auto=compress&cs=tinysrgb&w=1200)

---

## ✨ Key Features

- **Responsive Design**: Beautifully crafted and mobile-first, ensuring smooth usage on PCs, Tablets, and Smartphones.
- **Visa Processing**: Streamlined application workflows for Student, Work, and Medical visas across 150+ countries.
- **Bank Solvency Support**: Verified banking solutions to help secure your visa approvals.
- **User Dashboard**: Seamless authentication (Google & Facebook) where users can track their application statuses.
- **Admin Panel**: Secure backend for managing customer inquiries, bookings, and document uploads.
- **24/7 Support**: Integrated WhatsApp connectivity and a smart ChatBot for instant assistance.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Bootstrap 5, FontAwesome
- **Backend & Database**: Firebase Authentication, Firestore
- **Deployment**: Vercel
- **Fonts**: Playfair Display, Plus Jakarta Sans (via Next Fonts)

---

## 🚀 Getting Started

Follow these instructions to run the project on your local machine:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imranislam7221-commits/bdtrippers.git
   ```

2. Navigate into the project directory:
   ```bash
   cd bdtrippers
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

---

## 🔒 Environment Variables

To run the project, you will need to add your Firebase configuration to the `.env` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 👨‍💻 Admin Access

The Admin Panel (`/admin/upload`, `/admin/manage`, `/admin/inbox`) is protected. Authorized administrators can access these pages using the admin password.

---

*Made with ❤️ by the BD Tripper Dev Team.*
