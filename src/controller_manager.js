const item = require('./models/item')
const crypto = require("crypto");
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'info'

const pass2hash = (pass) => {
  return pass
}

exports.sign_on_post = async (req, res) => {
  try {
    logger.info(`sign_on`)
    const { gname, name, email, password } = req.body

    // password should be hashed
    const _user = new User({
      name: name,
      email: email,
      hash: pass2hash(password),
      id: `${crypto.randomUUID()}`
    });
    
    const _group = new Group({
      manager: _user,
      users: [_user],
      name: gname,
      id: `${crypto.randomUUID()}`
    });

    res = await _group.save()
    
  } catch (e) {
    logger.info(`documents_post : error = ${e}`)
  } finally {
  }
}

exports.sign_in_post = async (req, res) => {
  try {
    
    logger.info(`sign_in`)
    const { email, password } = req.body
    // const { group } = req.params
    
    const res = await Group.findOne(
      { 
        id: group
      }
    ).populate({
      path: 'manager',
      match: {
        email: email,
        hash: pass2hash(password)
      },
    })

    if (res.manager === null) {
      res.send({
        status: 'NG'
      })
    } else {
      res.send({
        status: 'OK',
        token: res.token
      })
    }
    //
    //
    //
    

  } catch (e) {
    logger.info(`documents_post : error = ${e}`)
  } finally {
  }
}
