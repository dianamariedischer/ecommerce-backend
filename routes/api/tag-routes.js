const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const dbAllTagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product } ],
    });
    // return tag data from database
    res.status(200).json(dbAllTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const dbTagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product } ],
    });

    // if category not found, log
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    // return category data from database
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "Violet"
    }
  */
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      // updates the tag name from req.body
      tag_name: req.body.tag_name,
    },
    {
      // update a tag's name by its `id` value
      where: {
        id: req.params.id,
      },
    })

    .then((updatedTag) => {
      return res.json(updatedTag);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
  );
});

router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      // delete on tag by its `id` value
      where: {
        id: req.params.id,
      },
    });

    // if tag not found, log
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
