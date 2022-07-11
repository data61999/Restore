using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();
        }
    }
}
