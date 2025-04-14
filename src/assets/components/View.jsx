import React, { useState, useEffect } from 'react';
import { getAllProductsAPI, updateProductAPI, deleteProductAPI } from '../../services/allAPI';
import SERVER_BASE_URL from '../../services/serverUrl';
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Badge,
  Modal,
  Image,
} from 'react-bootstrap';
import { FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Add from './Add'; 

const View = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [productIndex, setProductIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilters(allProducts);
    console.log('Current filteredProducts:', filteredProducts);
  }, [selectedCategory, minPrice, maxPrice, allProducts]);

  const getAllProducts = async () => {
    try {
      const result = await getAllProductsAPI();
      console.log('API Result - All Products:', result.data.allProducts);
      if (result.status === 200) {
        const products = result.data.allProducts || [];
        setAllProducts(products);
      } else {
        console.error('Unexpected status:', result.status);
      }
    } catch (error) {
      console.error('Detailed error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (products) => {
    let filtered = [...products];

    console.log('Applying filters - Selected Category:', selectedCategory, 'Min Price:', minPrice, 'Max Price:', maxPrice);
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (minPrice !== '' && !isNaN(minPrice)) {
      filtered = filtered.filter(product => Number(product.amount) >= Number(minPrice));
      console.log('After Min Price Filter:', filtered);
    }
    if (maxPrice !== '' && !isNaN(maxPrice)) {
      filtered = filtered.filter(product => Number(product.amount) <= Number(maxPrice));
      console.log('After Max Price Filter:', filtered);
    }

    setFilteredProducts(filtered);
    console.log('Final Filtered Products:', filtered);
  };

  const handleImageShow = (img) => {
    const fullImageUrl = `${SERVER_BASE_URL || 'http://localhost:3000'}/uploads/${img}`;
    setModalImage(fullImageUrl);
    setShowImageModal(true);
  };

  const handleImageClose = () => {
    setShowImageModal(false);
    setModalImage('');
  };

  const handleEditShow = (product, index) => {
    setEditProduct({ ...product });
    setProductIndex(index);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditProduct({});
    setProductIndex(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const result = await updateProductAPI(editProduct._id, editProduct);
      if (result.status === 200) {
        await getAllProducts();
        handleEditClose();
        alert('Product updated successfully!');
      } else {
        console.error('Update failed with status:', result.status);
        alert('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      alert('Error updating product: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      try {
        const result = await deleteProductAPI(id);
        if (result.status === 200) {
          await getAllProducts();
          alert('Product deleted successfully!');
        } else {
          console.error('Delete failed with status:', result.status);
          alert('Failed to delete product. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        alert('Error deleting product: ' + (error.response?.data?.message || 'Unknown error'));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  const refreshProducts = () => {
    getAllProducts();
  };

  if (loading) {
    return <div>Loading products...</div>;
  }
  if (allProducts.length === 0) {
    return <div>No products found. Please add a product or check the server.</div>;
  }

  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>ALL PRODUCTS</h1>
        </Col>
        <Col xs="auto">
          <Add refreshProducts={refreshProducts} /> {/* Pass the refresh callback */}
        </Col>
      </Row>

      {/* Filters Section */}
      <Container fluid className="p-3 border rounded bg-light mb-4">
        <h5 className="mb-3">
          <FaFilter className="me-2" />
          Filters
        </h5>
        <Row className="g-2">
          <Col md={4}>
            <Form.Select aria-label="Select category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Min Price (₹)"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Max Price (₹)"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </Col>
        </Row>
      </Container>

      {/* Product Table */}
      <Container fluid>
        <Table bordered hover responsive className="align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id || index}>
                <td>{product.name}</td>
                <td>
                  <Badge bg="secondary">{product.category}</Badge>
                </td>
                <td>₹{product.amount}</td>
                <td>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleImageShow(product.image)}
                  >
                    <FaEye />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditShow(product, index)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : <FaTrash />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal: Product Image */}
      <Modal show={showImageModal} onHide={handleImageClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image src={modalImage} fluid rounded />
        </Modal.Body>
      </Modal>

      {/* Modal: Edit Product */}
      <Modal show={showEditModal} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editProduct.name || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editProduct.description || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={editProduct.category || ''}
                onChange={handleEditChange}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={editProduct.amount || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default View;