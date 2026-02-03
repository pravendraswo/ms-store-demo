using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using MicrosoftToys.Api.Models;

namespace MicrosoftToys.Api.Services
{
    /// <summary>
    /// Service for managing orders.
    /// </summary>
    public class OrderService
    {
        private readonly string _dataFile = Path.Combine("wwwroot", "data", "orders.json");
        private List<Order> _orders = new List<Order>();

        public OrderService()
        {
            LoadOrders();
        }

        private void LoadOrders()
        {
            if (File.Exists(_dataFile))
            {
                var json = File.ReadAllText(_dataFile);
                _orders = JsonSerializer.Deserialize<List<Order>>(json) ?? new List<Order>();
            }
            else
            {
                _orders = new List<Order>();
                Save();
            }
        }

        public List<Order> GetAll() => _orders;

        public Order? GetById(int id) => _orders.FirstOrDefault(o => o.Id == id);

        public void Add(Order order)
        {
            order.Id = _orders.Any() ? _orders.Max(o => o.Id) + 1 : 1;
            order.Created = DateTime.Now;
            _orders.Add(order);
            Save();
        }

        public void Update(Order order)
        {
            var idx = _orders.FindIndex(o => o.Id == order.Id);
            if (idx >= 0)
            {
                _orders[idx] = order;
                Save();
            }
        }

        public void Delete(int id)
        {
            var order = _orders.FirstOrDefault(o => o.Id == id);
            if (order != null)
            {
                _orders.Remove(order);
                Save();
            }
        }

        private void Save()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_dataFile)!);
            var json = JsonSerializer.Serialize(_orders, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dataFile, json);
        }
    }
}
