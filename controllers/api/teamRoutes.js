const express = require('express');
const axios = require('axios');
const  { User, Pokemon, Team } = require('../../models/index');
const router = express.Router();

// gets all teams from user
// TODO check if session.user_id works 
router.get("/:user", async (req,res) => {
  try {
    Team.findAll(
        {where: {user_id: req.params.user}}
      ).then((data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post("/user", async (req,res) => {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  }
  );
  res.status(200).json("worked")
});

// adds new Team
// TODO come back to make this connect to the user's profile
router.post('/', async (req, res) => {
    try {
        Team.create(
          {user_id: req.session.user_id}
          ).then(() => {
          res.status(200).json("New team created");
        })
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ message: 'Please input a valid pokemon to create your team.'});
  }
    });

// adds pokemon to team, if team is full errors
router.put("/:teamNum", async (req,res) => {
  // { 
  //  "pokemonNum": 1
  // }
  try {
    const team = req.params.teamNum;
    const teamData = await Team.findByPk(team);
  
    if (teamData.pokemon1 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon1: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else if (teamData.pokemon2 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon2: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else if (teamData.pokemon3 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon3: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else if (teamData.pokemon4 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon4: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else if (teamData.pokemon5 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon5: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else if (teamData.pokemon6 == null) {
      Pokemon.update({
        team_id: team
      }, 
      {
        where: {id: req.body.pokemonNum}
      });
      Team.update({
        pokemon6: req.body.pokemonNum},{where: {id: team}})
        .then((result) => res.status(200).json(result));

    } else {
      throw new Error("error full");
    }
  
  } catch (err) {
    res.status(500).json(err);
  }
});

// removes pokemon from a team based of id
router.delete("/remove/:teamNum", async (req, res) => {
  // {
  //  "pokemonMember": 1,
  //  }
  try {
    const pokemonMember = req.body.pokemonMember;

    const teamNum = req.params.teamNum;
    const teamData = await Team.findByPk(teamNum);

    if (pokemonMember == 1) {
      const pokemonNum = teamData.pokemon1;

      Team.update({
        pokemon1: null
      },
      {
        where: {id: teamNum}
      })
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });

    } else if (pokemonMember == 2) {
      const pokemonNum = teamData.pokemon2;

      Team.update({
        pokemon2: null
      },
      {
        where: {id: teamNum}
      })
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });
    } else if (pokemonMember == 3) {
      const pokemonNum = teamData.pokemon3;

      Team.update({
        pokemon3: null
      },
      {
        where: {id: teamNum}
      })
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });
    } else if (pokemonMember == 4) {
      const pokemonNum = teamData.pokemon4;

      Team.update({
        pokemon4: null
      },
      {
        where: {id: teamNum}
      });
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });

    } else if (pokemonMember == 5) {
      const pokemonNum = teamData.pokemon5;

      Team.update({
        pokemon5: null
      },
      {
        where: {id: teamNum}
      })
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });
    } else if (pokemonMember == 6) {
      const pokemonNum = teamData.pokemon6;

      Team.update({
        pokemon6: null
      },
      {
        where: {id: teamNum}
      })
      Pokemon.update({
        team_id: null
      },
      {
        where: {id: pokemonNum}
      }).then((result) => {
        res.status(200).json(result);
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// removes a team
router.delete("/delete/:teamNum", async (req, res) =>{
  try {
    Team.destroy({
      where: {id: req.params.teamNum}
    }).then((response) => {
      res.status(200).json(response);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;