import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200/20 via-green-6000/30 to-green-700/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>

          <div className="lg:w-full  lg:mr-100xl rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mr- ">
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-green-200 mb-6 text-center ">
                Create New Product
              </h2>

              {/* Image Upload */}
              <div className="mb-8 transition-all duration-300">
                {imageUrl && (
                  <div className="text-center mb-6 animate-fadeIn">
                    <img
                      src={imageUrl}
                      alt="product"
                      className="block mx-auto max-h-[200px] rounded-lg object-cover shadow-md"
                    />
                  </div>
                )}

                <label className="flex flex-col items-center px-4 py-8  rounded-lg border-2 border-dashed border-green-200 cursor-pointer transition-colors duration-300">
                  <svg
                    className="w-12 h-12 text-green-100 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-green-200 font-medium">
                    {image ? image.name : "Click to upload product image"}
                  </span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Product Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-green-200"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-green-200"
                    >
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      placeholder="0.00"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-green-200"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all "
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      placeholder="Enter quantity"
                    />
                  </div>

                  {/* Brand */}
                  <div className="space-y-2">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium text-green-200"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all "
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-green-200"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter detailed product description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stock */}
                  <div className="space-y-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-green-200"
                    >
                      Items In Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all "
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                      placeholder="Enter stock count"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-green-200"
                    >
                      Product Category
                    </label>
                    <select
                      id="category"
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-gray-800"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      value={category} // Add this to show the selected value
                    >
                      <option value="" className="text-gray-500">
                        Select a category
                      </option>
                      {categories?.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                          className="text-gray-800"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
