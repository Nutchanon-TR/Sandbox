import { axiosInstance } from "./axios.js";

const getAllSupplierOrders = async () => {
  const res = await axiosInstance.get("/operator/supOrderList");
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Failed to fetch sale items");
  }
};

export {getAllSupplierOrders}