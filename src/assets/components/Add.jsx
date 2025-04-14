import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProductAPI } from '../../services/allAPI';

const Add = () => {
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
    const { name, description, amount, category, image } = products;
    if(name&&description&&amount&&category&&image){
      // apicall
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("description", description);
      reqBody.append("amount", amount);
      reqBody.append("category", category);
      reqBody.append("image", image);
      console.log(reqBody);
      // api call
      try {
        const result = await addProductAPI(reqBody);
        console.log(result.data);
        if (result.status === 200) {
          alert("Product added successfully");
          handleClose();
        } else {
          if(result?.data?.status==406){
           alert(result.response.data.message);
        }
      }}catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
      }


    }
    else{
      alert("Please fill all fields");
    }
  }

  return (
    <>
      <Button className="h3" variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-plus me-2"></i>
        Add New Product
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
                />
              </div>
              <div className="mb-2">
                <input 
                  onChange={(e) => setProducts({ ...products, description: e.target.value })}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                />
              </div>
              <div className="mb-2">
                <input 
                  onChange={(e) => setProducts({ ...products, amount: e.target.value })}
                  type="text"
                  className="form-control"
                  placeholder="Amount"
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
                  defaultValue=""
                  onChange={(e) => setProducts({ ...products, category: e.target.value })}
                  
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
                  onChange={e => setProducts({ ...products, image: e.target.files[0] })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddProduct} type="submit" variant="primary">
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;