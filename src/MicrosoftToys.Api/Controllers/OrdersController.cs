using Microsoft.AspNetCore.Mvc;
using MicrosoftToys.Api.Models;
using MicrosoftToys.Api.Services;
using System.Collections.Generic;
using System.Diagnostics;

namespace MicrosoftToys.Api.Controllers
{
    /// <summary>
    /// API controller for managing orders.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _service;

        public OrdersController(OrderService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Order>> GetAll() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Order> GetById(int id)
        {
            var order = _service.GetById(id);
            if (order == null) return NotFound();
            return order;
        }

        // VULNERABILITY: Command Injection - This method is intentionally vulnerable for GHAS testing
        [HttpPost("export")]
        public IActionResult ExportOrder(string fileName)
        {
            // This is a command injection vulnerability for testing purposes
            // Vulnerable: directly using user input in system command
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.Arguments = "/c echo Exporting to " + fileName;
            process.Start();
            
            return Ok("Export started");
        }

        [HttpPost]
        public IActionResult Add(Order order)
        {
            _service.Add(order);
            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Order order)
        {
            if (id != order.Id) return BadRequest();
            _service.Update(order);
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
