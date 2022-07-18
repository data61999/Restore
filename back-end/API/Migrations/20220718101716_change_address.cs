using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class change_address : Migration
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
                value: "5e4ef499-ccfe-46e2-aeb3-b95735320523");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "b30a97f2-54f7-421d-8f68-6464b4b256d8");
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
