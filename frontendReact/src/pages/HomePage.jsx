import { getAllSupplierOrders } from "./../lib/apiOperator.js";
import { useState, useEffect } from "react";
import ChangeToTable from "../components/ChangeToTable.jsx";
const HomePage = () => {
  const [supOrder, setSupOrder] = useState([]);

  useEffect(() => {
    const fetchSupplierOrders = async () => {
      try {
        const dataSupOrders = await getAllSupplierOrders();
        setSupOrder(dataSupOrders);
        console.log("Supplier Orders fetched:", dataSupOrders);
      } catch (error) {
        console.error("Error fetching supplier orders:", error);
      }
    };
    fetchSupplierOrders();
  }, []);

  useEffect(() => {
  console.log("Supplier Orders updated:", supOrder);
}, [supOrder]);


  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of our application.</p>
      <ChangeToTable
        data={supOrder}
        columns={[
          { Header: "Order ID", accessor: "orderId" },
          { Header: "Supplier Name", accessor: "supplierName" },
          { Header: "Order Date", accessor: "orderDate" },
          { Header: "Total Amount", accessor: "totalAmount" },
        ]}
        onRowClick={(row) => console.log("Row clicked:", row)}
      />
      <p>Here you can see the list of supplier orders.</p>

    </div>
  );
};

export default HomePage;
