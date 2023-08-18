const express = require("express");
const app = express();
const port = 3000;

const Sequelize = require("sequelize");
const { Pets } = require("./models");

app.use(express.json());

app.get("/pets", async (req, res) => {
  const pets = await Pets.findAll();
  res.json(pets);
});

app.get("/pets/:id", async (req, res) => {
  const onePet = await Pets.findByPk(req.params.id);
  if (onePet) {
    res.json(onePet);
  } else {
    res.status(404).json({
      message: "Pet not found",
    });
  }
});

app.get("/pets/search/:name/", async (req, res) => {
  const name = req.params.name;
  const pets = await Pets.findAll({
    where: {
      name: name,
    },
  });
  res.json(pets);
});

app.get("/pets/search/:name/:breed", async (req, res) => {
  const { name, breed } = req.params;
  const pets = await Pets.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: name,
          breed: breed,
        },
      ],
    },
  });
  res.json(pets);
});

app.post("/pets", async (req, res) => {
  const { name, breed } = req.body;
  const newPet = await Pets.create({
    name,
    breed,
  });

  res.json({
    id: newPet.id,
  });
});

app.post("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const { name, breed } = req.body;
  const updatedPet = await Pets.update(
    {
      name,
      breed,
    },
    {
      where: {
        id,
      },
      returning: true,
      plain: true,
    }
  );

  res.json(updatedPet[1]);
});

app.delete("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPet = await Pets.destroy({
    where: {
      id,
    },
  });
  res.json(deletedPet);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
