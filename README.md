# Hidden Groove Estates - Real Estate Property Listing Website

A production-ready, fully responsive real estate property listing website built with **React 18**, **Vite**, **TypeScript** (strict mode), and **Tailwind CSS** (latest version with @tailwindcss/vite).

## ✨ Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Property Listings Table**: Interactive table with search and filter capabilities
- **Image Gallery**: Responsive grid with lightbox modal for full-size viewing
- **Property Details**: Comprehensive information organized in card-based sections
- **Sticky Navigation**: Header that becomes sticky on scroll with smooth transitions
- **Professional UI**: Clean, modern design with smooth animations

### Technical Features
- **TypeScript Strict Mode**: Full type safety with strict compiler options
- **Latest Tailwind CSS**: Using @tailwindcss/vite plugin for optimal performance
- **Responsive Images**: Lazy loading with loading skeletons
- **Keyboard Navigation**: Arrow keys and ESC support in lightbox
- **Currency Formatting**: Proper USD formatting with commas and decimals
- **Search & Filter**: Real-time search and availability filtering
- **Mobile Optimization**: Card-based layout on mobile, table on desktop

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Navigate to project directory
cd hidden-groove-estates

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- **`npm run dev`** - Start development server with HMR
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky navigation header
│   ├── Hero.tsx            # Hero banner section
│   ├── LotsTable.tsx       # Properties table with search/filter
│   ├── PropertyDetails.tsx # Property information cards
│   ├── ImageGallery.tsx    # Image gallery with lightbox
│   ├── Footer.tsx          # Footer section
│   └── index.ts            # Component exports
├── data/
│   └── sampleData.ts       # Sample property data
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   └── formatters.ts       # Formatting utilities
├── App.tsx                 # Main application component
├── index.css               # Global styles with Tailwind
└── main.tsx                # React entry point
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` (blue-600)
- **Background**: `#f8fafc` (slate-50)
- **Cards**: White with subtle shadows
- **Borders**: `#e2e8f0` (gray-200)
- **Text**: Dark gray for body, black for headings

### Typography
- **Font**: Inter (from Google Fonts)
- **Headings**: Bold (700)
- **Body**: Regular (400), Medium (500)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 📊 Data Structure

### Lot Interface
```typescript
interface Lot {
  id: string;
  lotNumber: string;
  size: number; // sq ft
  price: number; // USD
  available: boolean;
}
```

### PropertyDetails Interface
```typescript
interface PropertyDetails {
  id: string;
  title: string;
  subType: string;
  type: string;
  status: string;
  propertyTax: number;
  hoaFee: number;
  county: string;
  subdivision: string;
  schools: string[];
  utilities: string[];
  // ... additional fields
}
```

## 🔧 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | UI library |
| Vite | 7+ | Build tool & dev server |
| TypeScript | 5.9+ | Type safety |
| Tailwind CSS | 4+ | Styling with @tailwindcss/vite |
| Lucide React | Latest | Icon library |
| React Router | 7+ | Navigation (ready for multi-page) |
| Axios | 1.13+ | HTTP client (ready for API integration) |

## 🎯 Component Overview

### Header
- Sticky navigation with scroll detection
- Responsive mobile menu with hamburger icon
- Logo and navigation links
- Contact button

### Hero Section
- Full-width banner with background image
- Gradient overlay for text readability
- Animated scroll indicator
- Call-to-action button

### Lots Table
- Desktop: Responsive table with striped rows
- Mobile: Card-based layout
- Search functionality
- Filter by availability status
- Proper currency and number formatting
- Hover effects

### Image Gallery
- Responsive grid (3-4 columns desktop, 1-2 mobile)
- Lightbox modal with full-size viewing
- Keyboard navigation (arrow keys, ESC)
- Thumbnail strip in lightbox
- Image lazy loading
- Loading skeletons

### Property Details
- Multiple organized sections with icons
- Card-based layout
- Two-column on desktop, stacked on mobile
- Displays:
  - Basic property information
  - Financial information
  - Location details
  - Utilities and services
  - Nearby schools
  - Property description

### Footer
- Company information
- Quick links
- Contact information
- Newsletter subscription
- Social media links
- Legal links

## 🔄 Formatting Utilities

```typescript
formatCurrency(value)      // Formats as USD currency
formatNumber(value)        // Formats with proper separators
formatSquareFeet(value)    // Formats square footage
formatPhoneNumber(phone)   // Formats phone numbers
```

## 📱 Responsive Design

All components are fully responsive:
- **Mobile-first approach**: Styles start mobile and scale up
- **Flexible layouts**: CSS Grid and Flexbox
- **Responsive images**: Proper image handling with lazy loading
- **Touch-friendly**: Adequate spacing for touch targets

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper color contrast
- Focus states for interactive elements

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy!

## 📊 Sample Data

The project includes 8 sample lots:

| Lot | Size (sq ft) | Price | Status |
|-----|--------------|-------|--------|
| 1 | 18,596.02 | $297,536.32 | Not Available |
| 2 | 20,363.18 | $325,810.88 | Available |
| 3 | 20,377.60 | $326,041.60 | Available |
| 4 | 20,377.15 | $326,034.40 | Not Available |
| 5 | 20,376.70 | $326,027.20 | Available |
| 6 | 20,376.25 | $326,020.00 | Available |
| 7 | 18,314.16 | $293,026.56 | Available |
| 8 | 19,163.99 | $306,623.83 | Available |

## 🔮 Future Enhancements

- Integration with real estate API
- User authentication and accounts
- Property comparison tool
- Advanced filtering options
- Virtual tours
- Contact form with email notifications
- Admin dashboard
- Map integration with property locations
- Property reviews and ratings

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please contact: info@hiddengroveestate.com

---

Built with ❤️ using React, Vite, TypeScript, and Tailwind CSS
