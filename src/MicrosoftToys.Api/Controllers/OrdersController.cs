using Microsoft.AspNetCore.Mvc;
using MicrosoftToys.Api.Models;
using MicrosoftToys.Api.Services;
using System.Collections.Generic;

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
