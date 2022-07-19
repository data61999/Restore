using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class change_Address_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "UserAddress");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_State",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Zip",
                table: "UserAddress",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Zip",
                table: "Orders",
                newName: "ShippingAddress_PhoneNumber");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "22c579ee-6da5-4bf6-bba5-4827c56d6e6c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "c680fc02-d25f-4fdd-ba3c-a051f3722a29");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "UserAddress",
                newName: "Zip");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_PhoneNumber",
                table: "Orders",
                newName: "ShippingAddress_Zip");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "UserAddress",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_State",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "ab4cb12b-071c-4ec3-8a77-26b7e553ae78");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "2a976d6f-2cf7-45e6-b833-fce3dda58f91");
        }
    }
}
