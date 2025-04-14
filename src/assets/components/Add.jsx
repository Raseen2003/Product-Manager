import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProductAPI } from '../../services/allAPI';

const Add = ({ refreshProducts }) => {
  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState({
    name: '',
    description: '',
    amount: '',
    category: '',
    image: '',
  });
  console.log(products);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProduct = async (e) => {
    e.preventDefault(); 
    const { name, description, amount, category, image } = products;
    if (!name || !description || !amount || !category || !image) {
      alert("Please fill all fields");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("name", name);
    reqBody.append("description", description);
    reqBody.append("amount", amount);
    reqBody.append("category", category);
    reqBody.append("image", image);

    console.log('Sending FormData:', Object.fromEntries(reqBody.entries())); 
    try {
      const result = await addProductAPI(reqBody);
      console.log('Add Product Result:', result);
      if (result.status === 200) {
        alert("Product added successfully");
        handleClose();
        if (refreshProducts) refreshProducts(); // Call the refresh callback
      } else if (result?.response?.data?.status === 406) {
        alert(result.response.data.message);
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <>
      <Button className="h3" variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-plus me-2"></i>
        Add New Products
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="align-items-center">
            <div className="">
              {/* Form Fields */}
              <div className="mb-2">
                <input
                  onChange={(e) => setProducts({ ...products, name: e.target.value })}
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  onChange={(e) => setProducts({ ...products, description: e.target.value })}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  onChange={(e) => setProducts({ ...products, amount: e.target.value })}
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  required
                />
              </div>

              {/* Dropdown Field */}
              <div className="mb-3">
                <label htmlFor="categoryDropdown" className="form-label">
                  Select Category
                </label>
                <select
                  id="categoryDropdown"
                  className="form-select"
                  value={products.category} // Controlled component
                  onChange={(e) => setProducts({ ...products, category: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              {/* File Upload */}
              <div className="mb-3">
                <label htmlFor="formImage1" className="form-label">
                  Add Image
                </label>
                <input
                  type="file"
                  id="formImage1"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProducts({ ...products, image: file });
                    
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  required
                />
                {preview && <img src={preview} alt="Preview" width="100" className="mt-2" />}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddProduct} variant="primary">
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;