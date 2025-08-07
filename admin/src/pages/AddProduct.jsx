import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";


const AddProduct = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  
   
  const onSizeChange = (size) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  const addProduct = async(e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const res = await axiosInstance.post("/product/add", formData)
    
      
   if (res.data.success) {
     toast.success("Product Added")
     setName("")
     setDescription("")
     setPrice("")
    
     setBestseller(false)
     setSizes[[]]
     setImage1(false)
     setImage2(false)
     setImage3(false)
     setImage4(false)
   }else {
    toast.error(res.data.message)
   }
    } catch (error) {
      console.log("Error in add product", error);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    console.log(sizes);
  }, [sizes]);

  return (
    <form onSubmit={(e) => addProduct(e)}>
      <div className="flex flex-col w-full gap-2">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload Icon"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload Icon"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload Icon"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload Icon"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids </option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product SubCategory</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear </option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full sm:w-[120px] px-3 py-2 "
              type="number"
              placeholder="Enter here"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2">
          <div onClick={(e) => onSizeChange(e.target.innerText)}>
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>

          <div>
            <div onClick={(e) => onSizeChange(e.target.innerText)}>
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
          </div>
          <div>
            <div onClick={(e) => onSizeChange(e.target.innerText)}>
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
          </div>
          <div>
            <div onClick={(e) => onSizeChange(e.target.innerText)}>
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
          </div>
          <div>
            <div onClick={(e) => onSizeChange(e.target.innerText)}>
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller(!bestseller)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="w-28 px-3 py-2 mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
};

export default AddProduct;
