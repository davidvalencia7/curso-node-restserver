

const login = (req, res ) => {
console.log(req.body);

    res.json({
        msg : 'Login ok'
    })
}



module.exports = { login }