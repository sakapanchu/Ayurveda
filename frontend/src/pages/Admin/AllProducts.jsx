import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex items-center justify-center">Error loading products</div>;
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="text-xl font-bold mb-6 text-green-800 mt-10">
              All Products ({products.length})
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div 
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/admin/product/update/${product._id}`} className="block">
                    <div className="flex flex-col h-full">
                      <div className="w-full h-40">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {product?.name}
                          </h5>
                          <p className="text-gray-500 text-xs whitespace-nowrap ml-1">
                            {moment(product.createdAt).format("MMM D")}
                          </p>
                        </div>

                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {product?.description?.substring(0, 100)}...
                        </p>

                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-800">
                            ${product?.price}
                          </span>
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            className="text-xs px-2 py-1 text-white rounded-lg bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:bg-pink-800"
                          >
                            Update
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Menu Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5 mt-6 md:mt-0 md:pl-4">
            <div className="sticky top-6">
              <AdminMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;