using API.DTOs;
using API.Entities.OderAggregate;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrerDto(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                Subtotal = order.Subtotal,
                DeliveryFee = order.DeliveryFee,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(orderItem => new OrderItemDto
                {
                    ProductId = orderItem.ItemOrdered.ProductId,
                    Name = orderItem.ItemOrdered.Name,
                    PictureUrl = orderItem.ItemOrdered.PictureUrl,
                    Price = orderItem.Price,
                    Quantity = orderItem.Quantity,
                }).ToList()
            }).AsNoTracking();
        }
    }
}
