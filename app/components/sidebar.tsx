"use client";

import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiOutlineSupport, HiChartPie, HiShoppingCart, HiShoppingBag, HiViewBoards } from "react-icons/hi";

export default function() {
  return (
    <Sidebar className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingCart}>
            Cart
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineSupport}>
            Support
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Setting
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Contact us
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
