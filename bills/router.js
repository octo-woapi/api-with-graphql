const fileHandler = require('../server/tools/fileHandler')
const isValidId = require('../server/validator/isValidId')
const BillNotFoundError = require('./errors')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  bills: fileHandler(conf.data.bills)
}

const {getById} = require('./usecase/getById')(fileHandlers.bills, BillNotFoundError)
const {getList} = require('./usecase/getList')(fileHandlers.bills)
const {deleteAll} = require('../server/tools/deleteAll')(fileHandlers.bills)
const {deleteBill} = require('./usecase/deleteBill')(fileHandlers.bills, BillNotFoundError)

function router (req, res, id) {
  if (req.method === 'GET') {
    if (isValidId(id)) {
      try {
        res.statusCode = 200
        res.end(JSON.stringify(getById(id)))
      } catch (err) {
        if (err instanceof BillNotFoundError) {
          res.statusCode = 403
          res.end('Forbidden')
        }
      }
    }
    res.statusCode = 200
    res.end(JSON.stringify(getList))
  }
  if (req.method === 'DELETE') {
    if (isValidId(id)) {
      try {
        res.statusCode = 204
        deleteBill(id)
        res.end()
      } catch (err) {
        if (err instanceof BillNotFoundError) {
          res.statusCode = 403
          res.end('Forbidden')
        }
      }
    }
    res.statusCode = 204
    deleteAll()
    res.end()
  }
}

module.exports = router
