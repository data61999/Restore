using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    PictureUrl = item.Product.PictureUrl,
                }).ToList(),
            };
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(x => x.BuyerId == buyerId);
        }
    }
 
}
