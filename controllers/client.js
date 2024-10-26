const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');
const User = require('../models/user');
const Party = require('../models/party');

const home = (req, res) => {
  res.render('pages/user/index');
};

const myParty = async (req, res) => {
  const user_id = req.session.loggedInUser.id;
  const party_id = req.params.id;

  try {
    const party = await Party.findOne({
      where: {
        id: party_id,
        user_id: user_id,
      },
    });

    if (!party) {
      return res.status(404).send('Party not found');
    }

    res.render('pages/user/myParty', { party });
  } catch (error) {
    console.error('Error getting party:', error);
    res.status(500).send('Internal Server Error');
  }
  
};

const sendPartyData = async (req, res) => {
  const user_id = req.session.loggedInUser.id;
  const party_id = req.params.id;

  try {
    const party = await Party.findOne({
      where: {
        id: party_id,
        user_id: user_id,
      },
    });

    if (!party) {
      return res.status(404).send('Party not found');
    }

    res.json({ party });
  } catch (error) {
    console.error('Error getting party:', error);
    res.status(500).send('Internal Server Error');
  }
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
      date: date,
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

const editParty = async (req, res) => {
  const user_id = req.session.loggedInUser.id;
  const party_id = req.params.id;

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
    const party = await Party.findOne({
      where: {
        id: party_id,
        user_id: user_id,
      },
    });

    if (!party) {
      return res.status(404).send('Party not found');
    }

    party.entry = entry;
    party.name = sanitizeHtml(name);
    party.date = date;
    party.address = sanitizeHtml(address);
    party.description = sanitizeHtml(description);
    party.max_entries = max_entries;
    party.status = status;
    party.updatedAt = new Date();

    await party.save();

    res.json({ message: 'Party updated', party });
  } catch (error) {
    console.error('Error updating party:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteParty = async (req, res) => {
  const user_id = req.session.loggedInUser.id;
  const party_id = req.params.id;

  try {
    const party = await Party.findOne({
      where: {
        id: party_id,
        user_id: user_id,
      },
    });

    if (!party) {
      return res.status(404).send('Party not found');
    }

    await party.destroy();

    res.json({ message: 'Party deleted' });
  } catch (error) {
    console.error('Error deleting party:', error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  home,
  myParty,
  sendPartyData,
  myParties,
  addParty,
  editParty,
  deleteParty,
};

