using System;
using System.Collections.Generic;

namespace MicrosoftToys.Api.Models
{
    /// <summary>
    /// Represents a customer order.
    /// </summary>
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
        public decimal Total { get; set; }
        public string Status { get; set; } = "pending";
        public string ShippingAddress { get; set; } = string.Empty;
        public DateTime Created { get; set; }
    }

    public class OrderItem
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
