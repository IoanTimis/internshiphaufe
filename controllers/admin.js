const User = require("../models/user");
const Product = require("../models/product");

const home = (req, res, next) => {
    res.render('pages/admin/generalPages/index');
};

const about = (req, res, next) => {
    res.render('pages/admin/generalPages/about');
};

const dashboard = (req, res, next) => {
  res.render('pages/admin/dashboard');
};

//-users----------------------------------------------------------------------------------------------------------
const users = async (req, res, next) => {
	try {
			const allUsers = await User.findAll(); 
			res.render('pages/admin/users', { users: allUsers }); 
	} catch (error) {
			console.error('Error fetching users:', error);
			res.status(500).send('Internal Server Error');
	}
};

const updateUser = async (req, res, next) => {
	const {userId} = req.params;
	const {name, email} = req.body;
	
	try {
			const user = await User.findByPk(userId);
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

const deleteUser = async (req, res, next) => {
	const {userId} = req.params;

	try {
			const user = await User.findByPk(userId);
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
const products = async (req, res, next) => {
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

const updateProduct = async (req, res, next) => {
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

const deleteProduct = async (req, res, next) => {
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
  home,
  about,
  dashboard,
  users,
  updateUser,
  deleteUser,
  products,
  updateProduct,
  deleteProduct
};

