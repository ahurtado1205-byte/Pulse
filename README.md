# Pulse AHT - Hotel Financial Analysis SaaS

Pulse AHT is a comprehensive SaaS platform designed for hotel financial analysis, enabling data-driven decision-making for hotel administrators and auditors.

## 🚀 Features
- **Real-time KPI Dashboard**: Monitor PAR, EBITDA, EBITDAR and other critical hotel metrics.
- **Interactive Data Visualization**: Dynamic charts using Recharts for trend analysis and financial performance.
- **Night Auditor Forms**: Streamlined data entry for daily hotel operations.
- **PDF Report Generation**: Professional PDF reports with premium branding using `jspdf`.
- **User Authentication**: Secure login and management via Supabase.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) & [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahurtado1205-byte/Pulse.git
   cd Pulse
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with your Supabase and Database connection strings.
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

The fastest way to deploy this application is using [Vercel](https://vercel.com/new).

### Steps to Deploy:
1. **Push to GitHub**: Connect your GitHub repository to Vercel.
2. **Environment Variables**: In the Vercel dashboard, add the following variables:
   - `DATABASE_URL`: Your Supabase connection string for Prisma.
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
3. **Build Settings**: Vercel will automatically detect Next.js. The `postinstall` script will handle Prisma client generation.
4. **Deploy**: Click Deploy and your app will be live!

## 📄 License
This project is private and intended for use by AHT-Pulse.

---
Built with ❤️ by [Pulse Team]
