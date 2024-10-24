const User = require("../models/user");
const Product = require("../models/product");

const dashboard = (req, res) => {
  res.render('pages/admin/dashboard');
};

//-users----------------------------------------------------------------------------------------------------------
const users = async (req, res) => {
	try {
			const allUsers = await User.findAll(); 
			res.render('pages/admin/users', { users: allUsers }); 
	} catch (error) {
			console.error('Error fetching users:', error);
			res.status(500).send('Internal Server Error');
	}
};

const updateUser = async (req, res) => {
	const {user_id} = req.params;
	const {name, email} = req.body;
	
	try {
			const user = await User.findByPk(user_id);
			if (!user) {
					return res.status(404).send('User not found');
			}
			user.name = name;
			user.email = email;
			await user.save();
			res.send(user);
	} catch (error) {
			console.error('Error updating user:', error);
			res.status(500).send('Internal Server Error');
    }
}

const deleteUser = async (req, res) => {
	const {user_id} = req.params;

	try {
			const user = await User.findByPk(user_id);
			if (!user) {
					return res.status(404).send('User not found');
			}
			await user.destroy();
			res.send('User deleted');
	} catch (error) {
			console.error('Error deleting user:', error);
			res.status(500).send('Internal Server Error');
	}
};

//products----------------------------------------------------------------------------------------------------------
const products = async (req, res) => {
	try {
			const allProducts = await Product.findAll();

			if(allProducts.length === 0) {
					// inca nu sunt produse in baza de date
			}
			res.render('pages/admin/products', { products: allProducts }); 
	} catch (error) {
			console.error('Error fetching products:', error);
			res.status(500).send('Internal Server Error');
	}
};

const addProduct = async (req, res) => {
	const {name, price} = req.body;
	const user_id = req.session.loggedInUser.id;

	try {
			const product = await Product.create({name, price, user_id});

			if (!product) {
					return res.status(404).send('Error adding product');
			}
			
			res.status(201).json(product);
	} catch (error) {
			console.error('Error adding product:', error);
			res.status(500).send('Internal Server Error');
	}
}

const updateProduct = async (req, res) => {
	const {productId} = req.params;
	const {name, price} = req.body;

	try {
			const product = await Product.findByPk(productId);
			if (!product) {
					return res.status(404).send('Product not found');
			}

			product.name = name;
			product.price = price;
			await product.save();
			res.send(product);
	} catch (error) {
			console.error('Error updating product:', error);
			res.status(500).send('Internal Server Error');
	}
}

const deleteProduct = async (req, res) => {
	const {productId} = req.params;
	
	try {
			const product = await Product.findByPk(productId);
			if (!product) {
					return res.status(404).send('Product not found');
			}
			await product.destroy();
			res.send('Product deleted');
	} catch (error) {
			console.error('Error deleting product:', error);
			res.status(500).send('Internal Server Error');
	}
};




module.exports = {
  dashboard,
  users,
  updateUser,
  deleteUser,
  products,
	addProduct,
  updateProduct,
  deleteProduct
};

