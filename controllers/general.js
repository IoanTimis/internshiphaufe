const Party = require('../models/party');

const home = (req, res) => {
  res.render('pages/generalPages/index');
};

const about = (req, res) => {
  res.render('pages/generalPages/about');
};

const party = async (req, res) => {
  const party_id = req.params.id;
  try {
    const party = await Party.findByPk(party_id);
    if (!party) {
      return res.status(404).send('Party not found');
    }
    res.render('pages/generalPages/party', { party: party });
  } catch (error) {
    console.error('Error getting party:', error);
    res.status(500).send('Internal Server Error');
  }
  

};

const parties = async (req, res) => {
  const parties = await Party.findAll();
  if (!parties) {
    return res.status(404).send('No parties found');
  }
  
  res.render('pages/generalPages/parties', { parties: parties });
};

//Todo: add search functionality
// const searchResults = async (req, res) => {
//   const { search, maxPrice } = req.query;

//   try {
//     const products = await Product.searchProducts(search, maxPrice);

//     if (products.length === 0) {
//       //Todo: add message to the view
//       // return res.render('pages/generalPages/search', { products: [], message: 'Nu au fost gasite produse.' });
//     }

//     res.render('pages/generalPages/search', { products: products });
//   } catch (error) {
//     console.error('Error searching products:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };




module.exports = {
  home,
  about,
  party,
  parties,
};

