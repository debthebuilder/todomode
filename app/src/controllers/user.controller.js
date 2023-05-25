const { user, task } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  };

  user
    .create(data)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  user
    .findOne({
      include: task,
      where: {
        email: email,
      },
      order: [[task, "id", "DESC"]],
    })
    .then(async (response) => {
      if (response) {
        const values = response.dataValues;
        const comparePass = await bcrypt.compare(pass, values.password);
        if (comparePass) {
            const foundUser = values;

            const accessToken = jwt.sign(
                { "username": foundUser.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '900s' }
            );
            
            const refreshToken = jwt.sign(
                {"username": foundUser.email},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            );

            user.update({
                refreshToken, 
                where: { id: foundUser.id },
                
            }).then((response) => {
                if(response){
                    const updatedUser = response.dataValues;
                    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
                    res.status(201).json({updatedUser, accessToken});
                } 
            }).catch((error) => {
                console.log(error);
            })
        
          
          
        } else {
          return res.status(401).send("Authentication failed");
        }
      } else {
        res.status(404).send({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.refresh = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    user.findOne({
        include: task,
        where: {
          refreshToken: refreshToken,
        },
       
      }).then((response) => {
        if(response){
            const foundUser = response.dataValues;
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err || foundUser.email !== decoded.username) return res.sendStatus(403);
                    
                    const accessToken = jwt.sign(
                        {
                            "User": {
                                "username": decoded.username,
                                
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '30s'}
                    );
                    res.json({foundUser, accessToken})
                }
            )
        } else {
            return res.sendStatus(403);
        }
      })
}
// exports.logout = (req, res) => {
//   const authHeader = req.headers["x-access-token"];
//   jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
//     if (logout) {
//       res.status(440).send({ message: "You have been Logged Out" });
//     } else {
//       res.status(500).send({ message: "Error" });
//     }
//   });
// }