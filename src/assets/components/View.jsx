import React, { useState } from 'react';
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

const View = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [editProduct, setEditProduct] = useState({});
  const [productIndex, setProductIndex] = useState(null);

  // Demo products (initial state)
  const [products, setProducts] = useState([
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '4599',
      image: 'https://via.placeholder.com/100?text=Headphones',
    },
    {
      name: 'Novel Book',
      category: 'Books',
      price: '999',
      image: 'https://via.placeholder.com/100?text=Book',
    },
    {
      name: 'T-shirt',
      category: 'Clothing',
      price: '799',
      image: 'https://via.placeholder.com/100?text=Shirt',
    },
    {
      name: 'Office Chair',
      category: 'Furniture',
      price: '6499',
      image: 'https://via.placeholder.com/100?text=Chair',
    },
    {
      name: 'Smart Watch',
      category: 'Electronics',
      price: '8999',
      image: 'https://via.placeholder.com/100?text=Watch',
    },
  ]);

  const handleImageShow = (img) => {
    setModalImage(img);
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

  const handleSaveChanges = () => {
    const updatedProducts = [...products];
    updatedProducts[productIndex] = editProduct;
    setProducts(updatedProducts);
    handleEditClose();
  };

  return (
    <>
      {/* Filters Section */}
      <Container fluid className="p-3 border rounded bg-light mb-4">
        <h5 className="mb-3">
          <FaFilter className="me-2" />
          Filters
        </h5>
        <Row className="g-2">
          <Col md={4}>
            <Form.Select aria-label="Select category">
              <option>All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control type="number" placeholder="Min Price (₹)" />
          </Col>
          <Col md={4}>
            <Form.Control type="number" placeholder="Max Price (₹)" />
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
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>
                  <Badge bg="secondary">{product.category}</Badge>
                </td>
                <td>₹{product.price}</td>
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
                  <Button variant="outline-danger" size="sm">
                    <FaTrash />
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
                name="price"
                value={editProduct.price || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default View;
