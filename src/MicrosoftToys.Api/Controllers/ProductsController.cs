using Microsoft.AspNetCore.Mvc;
using MicrosoftToys.Api.Models;
using MicrosoftToys.Api.Services;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace MicrosoftToys.Api.Controllers
{
    /// <summary>
    /// API controller for managing products.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductsController(ProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _service.GetById(id);
            if (product == null) return NotFound();
            return product;
        }

        // VULNERABILITY: SQL Injection - This method is intentionally vulnerable for GHAS testing
        [HttpGet("search")]
        public ActionResult<List<Product>> SearchProducts(string searchTerm)
        {
            // This is a SQL injection vulnerability for testing purposes
            string connectionString = "Server=localhost;Database=ProductsDB;Trusted_Connection=True;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Vulnerable: directly concatenating user input into SQL query
                string query = "SELECT * FROM Products WHERE Name LIKE '%" + searchTerm + "%'";
                SqlCommand command = new SqlCommand(query, connection);
                connection.Open();
                // Execute query logic would go here
                return Ok(new List<Product>());
            }
        }

        [HttpPost]
        public IActionResult Add(Product product)
        {
            _service.Add(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product product)
        {
            if (id != product.Id) return BadRequest();
            _service.Update(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }
    }
}
