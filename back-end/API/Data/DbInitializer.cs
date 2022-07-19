using API.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@gmail.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new [] { "Member" , "Admin"});

            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                 new Product
                {
                    Name = "Adidas Green Shark Hoodie",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 10000,
                    PictureUrl = "/images/products/adidas_green_shark_hoodie.png",
                    Brand = "Adidas",
                    Type = "Hoodie",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Adidas RnM Hoodie",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 5900,
                    PictureUrl = "/images/products/adidas_RnM_hodie.png",
                    Brand = "Adidas",
                    Type = "Hoodie",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike NBA Hoodie",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12100,
                    PictureUrl = "/images/products/nike_nba_hoodie.png",
                    Brand = "Nike",
                    Type = "Hoodie",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Rosario Club Hoodie",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 4999,
                    PictureUrl = "/images/products/nike_Rosario_club_hoodie.png",
                    Brand = "Adidas",
                    Type = "Hoodie",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Adidas Trainer Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 9999,
                    PictureUrl = "/images/products/adidas_traner_shoe.png",
                    Brand = "Adidas",
                    Type = "Shoe",
                    QuantityInStock = 0
                },
                 new Product
                {
                    Name = "Adidas Ultraboot Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/adidas_ultraboost.png",
                    Brand = "Adidas",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Adidas Zapatilass Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 10000,
                    PictureUrl = "/images/products/adidas_zapatilass_shoe.png",
                    Brand = "Adidas",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Black Apl Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12299,
                    PictureUrl = "/images/products/nike_back_apl_shoe.png",
                    Brand = "Nike",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Golf Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 9999,
                    PictureUrl = "/images/products/nike_golf_shoes.png",
                    Brand = "Nike",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Puma running Shoe",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/puma_running_shoe.png",
                    Brand = "Puma",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                  new Product
                {
                    Name = "Nike Aerobill Hat",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/nike_aerobill_hat.png",
                    Brand = "Nike",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Baseball Hat",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1999,
                    PictureUrl = "/images/products/nike_baseball_hat.png",
                    Brand = "Nike",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Nadal Hat",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2500,
                    PictureUrl = "/images/products/nike_nadal_hat.png",
                    Brand = "Nike",
                    Type = "Shoe",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike JDI T Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2100,
                    PictureUrl = "/images/products/nike_just_do_it_T_Shirt.png",
                    Brand = "Nike",
                    Type = "T-Shirt",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Roll Tide T Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 4999,
                    PictureUrl = "/images/products/nike_roll_tide_tshirt.png",
                    Brand = "Nike",
                    Type = "T-Shirt",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Tennis T Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2399,
                    PictureUrl = "/images/products/nike_tennis_tshirt.png",
                    Brand = "Nike",
                    Type = "T-Shirt",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Linx T Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1900,
                    PictureUrl = "/images/products/nike_linx_tsirt.png",
                    Brand = "Nike",
                    Type = "T-Shirt",
                    QuantityInStock = 100
                },
                 new Product
                {
                    Name = "Nike Linx T Pant",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 3500,
                    PictureUrl = "/images/products/nike_strike_pant.png",
                    Brand = "Nike",
                    Type = "Pant",
                    QuantityInStock = 100
                },
                
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }

        internal static void Intialize(object context)
        {
            throw new NotImplementedException();
        }
    }
}
