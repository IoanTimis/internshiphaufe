const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');
const User = require('../models/user');
const Party = require('../models/party');

const home = (req, res) => {
  res.render('pages/user/index');
};

const myParties = async (req, res) => {
  const user_id = req.session.loggedInUser.id;

  try {
    const user_parties = await User.findByPk(user_id, {
      include: [
        {
          model: Party,
          as: 'parties', 
        },
      ],
    });

    if (!user_parties || user_parties.parties.length === 0) {
       return res.render('pages/user/myParties', { user: {}, message: 'No parties found' });
    }

    res.render('pages/user/myParties', { user: user_parties });
  } catch (error) {
    console.error('Error getting user parties:', error);
    res.status(500).send('Internal Server Error');
  }
};

const addParty = async (req, res) => {
  const user_id = req.session.loggedInUser.id;

  const schema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    address: Joi.string().required(),
    description: Joi.string(),
    max_entries: Joi.number().required(),
    entry: Joi.number().required(),
    status: Joi.string().required(),
    csrf_token: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send('Bad request');
  }

  const { name, date, address, description, max_entries, entry, status} = req.body;

  try {
    const party = await Party.create({
      entry: entry,
      name: sanitizeHtml(name),
      date: sanitizeHtml(date),
      address: sanitizeHtml(address),
      description: sanitizeHtml(description),
      user_id: user_id,
      max_entries: max_entries,
      status: status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({ message: 'Party created', party });
  } catch (error) {
    console.error('Error creating party:', error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  home,
  myParties,
  addParty,
};

