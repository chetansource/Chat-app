import { getUserId } from '../Model/database.js'
export async function authenticateToken(req, res, next) {
  const sessionToken = req.headers.cookie.split('=')[1]
  console.log('>', req.headers.cookie, sessionToken)
  const verifySessionToken = await getUserId(sessionToken)
  if (verifySessionToken === undefined) return res.sendStatus(401) //unauthorized
  try {
    req.userid = verifySessionToken.user_id
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(401)
  }
}
