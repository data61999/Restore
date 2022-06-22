﻿using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if(Items.All(item => item.ProductId != product.Id)) {
                Items.Add(new BasketItem { Quantity = quantity, Product = product });
            }

            var existItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(existItem != null) existItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if(item.Quantity <= 0) Items.Remove(item);  
        }
    }
}
