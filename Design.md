# Design: Microsoft Toys E-commerce Platform - Basic Implementation

## Selected Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5 for responsive design
- Vanilla JavaScript or lightweight framework (Alpine.js)

**Backend:**
- ASP.NET Core 8.0 Web API
- C# for business logic
- Local file system for product images
- JSON files or SQLite for data storage

**Local Development:**
- Visual Studio Code or Visual Studio 2022
- .NET 8 SDK
- Local IIS Express or Kestrel server

**Azure Hosting:**
- Azure App Service for web application
- Azure Blob Storage for product images
- Azure SQL Database (if database needed later)

## Architecture Overview

### Simplified Architecture
```
┌─────────────────┐    HTTP/HTTPS     ┌──────────────────┐
│                 │ ◄────────────────► │                  │
│   Web Browser   │                    │  ASP.NET Core    │
│   (HTML/CSS/JS) │                    │   Web API        │
│                 │                    │                  │
└─────────────────┘                    └──────────────────┘
                                                │
                                                ▼
                                       ┌──────────────────┐
                                       │   Local Storage  │
                                       │                  │
                                       │ • JSON Files     │
                                       │ • Product Images │
                                       │ • SQLite (opt.)  │
                                       └──────────────────┘
```

### Component Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                       │
├─────────────────────────────────────────────────────────┤
│  Product Listing │  Product Details │  Shopping Cart    │
│                  │                  │                   │
│  User Auth       │  Checkout        │  Order History    │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼ API Calls (JSON)
┌─────────────────────────────────────────────────────────┐
│                  ASP.NET Core Web API                   │
├─────────────────────────────────────────────────────────┤
│  ProductController │ UserController │ OrderController   │
│                    │                │                   │
│  AuthController    │ CartController │ ImageController   │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   Data Access Layer                     │
├─────────────────────────────────────────────────────────┤
│  ProductService    │ UserService    │ OrderService      │
│                    │                │                   │
│  File I/O Manager  │ Image Handler  │ JSON Serializer   │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    Storage Layer                        │
├─────────────────────────────────────────────────────────┤
│  /data/products.json       │  /images/products/         │
│  /data/users.json          │  /data/orders.json         │
│  /data/cart-sessions.json  │  /logs/app.log             │
└─────────────────────────────────────────────────────────┘
```

## User Flow Diagram

### Customer Shopping Journey
```
[Start] ─► [Browse Products] ─► [View Product Details] ─► [Add to Cart]
                  │                                              │
                  ▼                                              ▼
            [Search/Filter] ◄──────────────────────── [Continue Shopping]
                  │                                              │
                  ▼                                              ▼
            [Product Results]                              [View Cart]
                  │                                              │
                  ▼                                              ▼
            [Select Product] ─────────────────────► [Update Quantities]
                                                                 │
                                                                 ▼
                                                          [Proceed to Checkout]
                                                                 │
                                                                 ▼
                                                          [Enter Details]
                                                                 │
                                                                 ▼
                                                          [Payment Info]
                                                                 │
                                                                 ▼
                                                          [Order Confirmation]
                                                                 │
                                                                 ▼
                                                              [End]
```

### Admin Management Flow
```
[Admin Login] ─► [Dashboard] ─► [Manage Products] ─► [Add/Edit Product]
                      │                                       │
                      ▼                                       ▼
              [View Orders] ◄─────────────────────── [Upload Images]
                      │                                       │
                      ▼                                       ▼
              [Order Details]                          [Save Changes]
                      │                                       │
                      ▼                                       ▼
              [Update Status] ─────────────────────► [View Product List]
```

## Basic Functionality Specification

### Core Features

**1. Product Catalog**
- Display grid of Microsoft toys with images
- Product categories: Plushies, Figurines, Tech Toys
- Basic search by product name
- Simple filtering by category and price range
- Product detail page with multiple images

**2. Shopping Cart**
- Add/remove products from cart
- Update quantities
- Persist cart in browser localStorage
- Display cart total and item count

**3. Basic Checkout**
- Customer information form
- Shipping address
- Order summary
- Simple payment form (no actual processing for local version)

**4. Admin Panel**
- Add/edit products
- Upload product images
- View orders
- Basic inventory management

### Data Models

**Product**
```json
{
  "id": 1,
  "name": "Microsoft Azure Plushie",
  "description": "Soft azure cloud plushie",
  "price": 24.99,
  "category": "Plushies",
  "images": ["azure-plushie-1.jpg", "azure-plushie-2.jpg"],
  "inStock": true,
  "inventory": 50,
  "created": "2026-02-03T00:00:00Z"
}
```

**Order**
```json
{
  "id": 1,
  "customerName": "John's Toy Store",
  "customerEmail": "retailer@example.com",
  "items": [
    {
      "productId": 1,
      "name": "Microsoft Azure Plushie",
      "quantity": 2,
      "price": 24.99
    }
  ],
  "total": 49.98,
  "status": "pending",
  "shippingAddress": {...},
  "created": "2026-02-03T00:00:00Z"
}
```

## Project Structure

```
MicrosoftToysEcommerce/
├── src/
│   ├── MicrosoftToys.Api/
│   │   ├── Controllers/
│   │   │   ├── ProductsController.cs
│   │   │   ├── OrdersController.cs
│   │   │   └── CartController.cs
│   │   ├── Models/
│   │   │   ├── Product.cs
│   │   │   ├── Order.cs
│   │   │   └── CartItem.cs
│   │   ├── Services/
│   │   │   ├── ProductService.cs
│   │   │   └── OrderService.cs
│   │   ├── Data/
│   │   │   └── FileDataContext.cs
│   │   ├── Program.cs
│   │   └── appsettings.json
│   └── MicrosoftToys.Web/
│       ├── wwwroot/
│       │   ├── css/
│       │   │   └── styles.css
│       │   ├── js/
│       │   │   ├── app.js
│       │   │   ├── products.js
│       │   │   ├── cart.js
│       │   │   └── checkout.js
│       │   └── images/
│       │       └── products/
│       ├── Views/
│       │   ├── index.html
│       │   ├── products.html
│       │   ├── product-detail.html
│       │   ├── cart.html
│       │   ├── checkout.html
│       │   └── admin/
│       └── data/
│           ├── products.json
│           └── orders.json
├── tests/
├── docs/
├── README.md
└── MicrosoftToysEcommerce.sln
```

## Local Development Setup

### Prerequisites
- .NET 8 SDK
- Visual Studio Code or Visual Studio 2022
- Node.js (for package management, optional)

### Getting Started
1. Clone repository
2. Navigate to project directory
3. Restore NuGet packages: `dotnet restore`
4. Run application: `dotnet run --project src/MicrosoftToys.Api`
5. Open browser to `https://localhost:5001`

### Sample Data
- Pre-populated with 10+ Microsoft toy products
- Mock order data for development

## Azure Deployment Strategy

### Development to Production Flow
```
[Local Development] ─► [GitHub Repository] ─► [Azure DevOps Pipeline] ─► [Azure App Service]
                                                        │
                                                        ▼
                                               [Azure Blob Storage]
                                               (Product Images)
```

### Azure Services Used
- **Azure App Service**: Host the .NET Web API
- **Azure Blob Storage**: Store product images
- **Azure Application Insights**: Monitoring and logging
- **Azure DevOps**: CI/CD pipeline

### Deployment Configuration
- App Service Plan: Basic B1 (suitable for low traffic)
- Runtime: .NET 8
- OS: Windows or Linux
- Auto-scaling: Disabled initially
- Custom domain support: Available

## Performance Considerations

### Local Optimization
- Lazy loading for images
- Browser caching for static assets
- Minified CSS and JavaScript
- Compressed image formats (WebP with fallback)

### Basic Security
- Input validation on all forms
- HTTPS enforcement
- Basic rate limiting
- XSS protection headers
- CSRF tokens for forms

### Scalability Notes
- File-based storage suitable for <1000 products
- Can migrate to Azure SQL Database when needed
- Image optimization reduces bandwidth usage
- Cache-friendly API responses

## Next Implementation Steps

1. **Set up project structure** and create ASP.NET Core solution
2. **Implement data models** and JSON file storage
3. **Create API controllers** for products, cart, orders
4. **Build frontend pages** with HTML/CSS/JavaScript
5. **Add image handling** and upload functionality
6. **Create admin panel** for product management
7. **Test locally** with sample data
9. **Prepare Azure deployment** configuration
10. **Deploy to Azure** and configure custom domain

This design provides a solid foundation for a basic e-commerce platform that can be developed and tested locally, then easily deployed to Azure when ready for production use.