using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using MicrosoftToys.Api.Models;

namespace MicrosoftToys.Api.Services
{
    /// <summary>
    /// Service for managing products.
    /// </summary>
    public class ProductService
    {
        private readonly string _dataFile = Path.Combine("wwwroot", "data", "products.json");
        private List<Product> _products = new List<Product>();

        public ProductService()
        {
            LoadProducts();
        }

        private void LoadProducts()
        {
            if (File.Exists(_dataFile))
            {
                var json = File.ReadAllText(_dataFile);
                _products = JsonSerializer.Deserialize<List<Product>>(json) ?? new List<Product>();
            }
            else
            {
                _products = GetSampleProducts();
                Save();
            }
        }

        private List<Product> GetSampleProducts()
        {
            return new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Microsoft Azure Plushie",
                    Description = "Soft azure cloud plushie perfect for retailers. Cuddle with the power of cloud computing!",
                    Price = 24.99m,
                    Category = "Plushies",
                    Images = new List<string> { "azure-plushie-1.jpg" },
                    InStock = true,
                    Inventory = 50,
                    Created = DateTime.Now
                },
                new Product
                {
                    Id = 2,
                    Name = "Microsoft Teams Figurine",
                    Description = "Collectible Teams mascot figurine - perfect for your desk or retail display",
                    Price = 19.99m,
                    Category = "Figurines",
                    Images = new List<string> { "teams-figurine-1.jpg" },
                    InStock = true,
                    Inventory = 30,
                    Created = DateTime.Now
                },
                new Product
                {
                    Id = 3,
                    Name = "Office 365 Stress Ball",
                    Description = "Office-themed stress relief toy - squeeze away your productivity stress!",
                    Price = 12.99m,
                    Category = "Tech Toys",
                    Images = new List<string> { "office-stress-ball.jpg" },
                    InStock = true,
                    Inventory = 75,
                    Created = DateTime.Now
                },
                new Product
                {
                    Id = 4,
                    Name = "Xbox Controller Plushie",
                    Description = "Soft and huggable Xbox controller - for gamers who love comfort",
                    Price = 29.99m,
                    Category = "Plushies",
                    Images = new List<string> { "xbox-controller.jpg" },
                    InStock = true,
                    Inventory = 40,
                    Created = DateTime.Now
                },
                new Product
                {
                    Id = 5,
                    Name = "OneDrive Cloud Buddy",
                    Description = "Your personal cloud storage companion - cute and functional desk accessory",
                    Price = 22.99m,
                    Category = "Plushies",
                    Images = new List<string> { "onedrive-cloud.jpg" },
                    InStock = true,
                    Inventory = 35,
                    Created = DateTime.Now
                }
            };
        }

        public List<Product> GetAll() => _products;

        public Product? GetById(int id) => _products.FirstOrDefault(p => p.Id == id);

        public void Add(Product product)
        {
            product.Id = _products.Any() ? _products.Max(p => p.Id) + 1 : 1;
            product.Created = DateTime.Now;
            _products.Add(product);
            Save();
        }

        public void Update(Product product)
        {
            var idx = _products.FindIndex(p => p.Id == product.Id);
            if (idx >= 0)
            {
                _products[idx] = product;
                Save();
            }
        }

        public void Delete(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                _products.Remove(product);
                Save();
            }
        }

        private void Save()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_dataFile)!);
            var json = JsonSerializer.Serialize(_products, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dataFile, json);
        }
    }
}
