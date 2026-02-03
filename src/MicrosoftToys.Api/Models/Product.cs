using System;
using System.Collections.Generic;

namespace MicrosoftToys.Api.Models
{
    /// <summary>
    /// Represents a product in the Microsoft Toys catalog.
    /// </summary>
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new List<string>();
        public bool InStock { get; set; }
        public int Inventory { get; set; }
        public DateTime Created { get; set; }
    }
}
