using Microsoft.AspNetCore.Mvc;
using MicrosoftToys.Api.Models;
using System.Collections.Generic;

namespace MicrosoftToys.Api.Controllers
{
    /// <summary>
    /// API controller for managing the shopping cart.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        // For demo: In-memory cart (replace with persistent storage as needed)
        private static List<CartItem> _cart = new List<CartItem>();

        [HttpGet]
        public ActionResult<List<CartItem>> GetCart() => _cart;

        [HttpPost]
        public IActionResult AddToCart(CartItem item)
        {
            _cart.Add(item);
            return Ok();
        }

        [HttpDelete("{productId}")]
        public IActionResult RemoveFromCart(int productId)
        {
            _cart.RemoveAll(i => i.ProductId == productId);
            return NoContent();
        }

        [HttpPost("clear")]
        public IActionResult ClearCart()
        {
            _cart.Clear();
            return NoContent();
        }
    }
}
