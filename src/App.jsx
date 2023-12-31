import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [page, setPage] = useState(true);
  const [print, setPrint] = useState(false);
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
        return { ...product, quantity: Number(value) };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrint(!print);
  };

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className={`left-width ${print ? "hidden" : "block"}`}>
          <div className='text-center'>
            <button onClick={()=>setPage(!page)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Page Toggle</button>
          </div>
          <h1 className='text-2xl text-center'>Products List</h1>
          <div className="products">
            <form onSubmit={(handleSubmit)} className="space-y-2">
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
                Print
              </button>
            </form>
          </div>
        </div>
        <div className={`right-width col-span-2 border ${page ? 'a4 flex flex-wrap-reverse gap-2 mt-[0.1in] ml-[0.1in]' : 'a5 flex flex-wrap-reverse gap-2 mt-[0.1in] ml-[0.1in]'}`}>
          {
            products.map((product) => {
              const images = [];
              for (let i = 0; i < product.quantity; i++) {
                product.img_link.forEach((img_link, index) => {
                  images.push(
                    <img
                      className='w-[3.3cm] h-[4cm]'
                      key={index}
                      src={img_link}
                      alt=""
                    />
                  );
                });
              }
              return images;
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
