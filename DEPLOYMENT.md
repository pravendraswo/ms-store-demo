# Microsoft Toys E-commerce Platform - Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- .NET 8 SDK installed
- Web browser

### Running the Application
1. Open terminal/command prompt
2. Navigate to the project directory:
   ```bash
   cd C:\Custom_CP\Attempt_2
   ```
3. Run the application:
   ```bash
   cd src\MicrosoftToys.Api
   dotnet run
   ```
4. Open your browser and go to: `http://localhost:5000`

## Application URLs
- **Home Page**: `http://localhost:5000`
- **Products**: `http://localhost:5000/products.html`
- **Shopping Cart**: `http://localhost:5000/cart.html`
- **Checkout**: `http://localhost:5000/checkout.html`
- **Admin Panel**: `http://localhost:5000/admin.html`
- **API Documentation (Swagger)**: `http://localhost:5000/swagger`

## Features Implemented

### Customer Features
✅ **Product Catalog**: Browse Microsoft toys with images, prices, and descriptions
✅ **Shopping Cart**: Add/remove items, update quantities, view total
✅ **Checkout Process**: Enter customer details, place orders
✅ **Responsive Design**: Works on desktop and mobile devices

### Admin Features
✅ **Product Management**: Add, edit, delete products
✅ **Order Viewing**: See recent orders and customer information
✅ **Inventory Management**: Track stock levels

### Technical Features
✅ **REST API**: Full CRUD operations for products and orders
✅ **JSON Data Storage**: File-based persistence for development
✅ **CORS Support**: Frontend can communicate with backend
✅ **Static File Serving**: Images and assets served by the API
✅ **Bootstrap UI**: Modern, responsive user interface

## API Endpoints

### Products API
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Orders API
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}` - Update order
- `DELETE /api/orders/{id}` - Delete order

### Cart API
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/{productId}` - Remove item from cart
- `POST /api/cart/clear` - Clear cart

## Data Storage
- Products stored in: `wwwroot/data/products.json`
- Orders stored in: `wwwroot/data/orders.json`
- Images stored in: `wwwroot/images/products/`

## Testing the Application

### 1. Browse Products
1. Go to `http://localhost:5000`
2. Click "Shop Now" or navigate to Products
3. View the 3 sample products (Azure Plushie, Teams Figurine, Office Stress Ball)

### 2. Shopping Cart
1. Click "Add to Cart" on any product
2. Navigate to Cart page
3. Update quantities or remove items
4. Proceed to checkout

### 3. Place Order
1. Fill in customer information (Store name, email, address)
2. Review order summary
3. Click "Place Order"
4. Order will be saved to the database

### 4. Admin Panel
1. Go to `http://localhost:5000/admin.html`
2. View existing products and orders
3. Add new products using the "Add Product" button
4. Edit or delete existing products

## Deployment Options

### Option 1: Azure App Service (Recommended)
1. **Publish to Azure**:
   ```bash
   dotnet publish -c Release -o ./publish
   ```
2. **Upload to Azure App Service**
3. **Configure App Settings**:
   - Set `ASPNETCORE_ENVIRONMENT` to `Production`
   - Configure custom domain if needed

### Option 2: IIS (Windows Server)
1. **Install .NET 8 Hosting Bundle**
2. **Publish Application**:
   ```bash
   dotnet publish -c Release -o C:\inetpub\wwwroot\MicrosoftToys
   ```
3. **Configure IIS Site**

### Option 3: Docker
1. **Create Dockerfile**:
   ```dockerfile
   FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
   WORKDIR /app
   COPY publish/ .
   EXPOSE 80
   ENTRYPOINT ["dotnet", "MicrosoftToys.Api.dll"]
   ```
2. **Build and Run**:
   ```bash
   docker build -t microsoft-toys .
   docker run -p 8080:80 microsoft-toys
   ```

## Scaling Considerations

### Database Migration
- **From JSON to SQL Server**:
  - Add Entity Framework Core
  - Create DbContext and migrations
  - Update services to use DbContext instead of file storage

### Cloud Storage
- **Azure Blob Storage** for product images
- **Azure SQL Database** for production data
- **Azure Application Insights** for monitoring

### Performance Optimizations
- **Caching**: Add Redis or in-memory caching
- **CDN**: Use Azure CDN for static assets
- **Load Balancing**: Multiple API instances

## Security Enhancements (Production Ready)
- **Authentication**: Add JWT tokens or OAuth
- **Authorization**: Role-based access for admin functions
- **Input Validation**: More comprehensive validation
- **HTTPS**: Force HTTPS in production
- **Rate Limiting**: Prevent API abuse

## Monitoring and Logging
- **Application Insights**: Track performance and errors
- **Health Checks**: Monitor API availability
- **Structured Logging**: Use Serilog for better logging

---

## ✅ Application Status: FULLY FUNCTIONAL

The Microsoft Toys E-commerce platform is now complete and ready for local development and testing. All core features are implemented and working:

- **✅ Frontend**: Responsive web interface
- **✅ Backend**: ASP.NET Core Web API
- **✅ Database**: JSON file storage
- **✅ Shopping Cart**: LocalStorage-based cart
- **✅ Admin Panel**: Product and order management
- **✅ API**: RESTful endpoints
- **✅ End-to-End**: Complete shopping workflow

**Next Steps**: Test locally, then deploy to Azure App Service for production use.