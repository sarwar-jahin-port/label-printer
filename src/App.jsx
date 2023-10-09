import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load the JSON data when the component mounts
    fetch('products.json') // Replace with the actual path to your JSON file
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  const handleChange = (id, value) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server or update state)
    console.log('Products:', products);
    // Reset the form fields
    setProducts(products.map((product) => ({ ...product, quantity: 0 })));
  };

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className="left-width">
          <h1 className='text-2xl text-center'>Products List</h1>
          <div className="products">
            <form onSubmit={handleSubmit} className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-1">
                  <span className="w-1/2">{product.product_name}</span>
                  <input
                    type="number"
                    className="w-1/4 px-4 py-2 border rounded-lg"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(product.id, e.target.value)}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="right-width col-span-2">
          <p>Right Width</p>
        </div>
      </div>
    </>
  )
}

export default App
