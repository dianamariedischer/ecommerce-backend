const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const dbAllCategoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product } ],
    });
    // return category data from database
    res.status(200).json(dbAllCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const dbCategoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product } ],
    });

    // if category not found, log
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    // return category data from database
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Candles"
    }
  */
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // updates the category name from req.body
      category_name: req.body.category_name,
    },
    {
      // gets the category based on the id in the parameters
      where: {
        id: req.params.id,
      },
    })

    .then((updatedCategory) => {
      return res.json(updatedCategory);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
  );
});

router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      // delete a category by its `id` value
      where: {
        id: req.params.id,
      },
    });

    // if product not found, log
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
