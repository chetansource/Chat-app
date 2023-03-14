import { getUserId } from '../Model/database.js'
export async function authenticateToken(req, res, next) {
  const sessionToken = req.headers.cookie.split('=')[1]
  const verifySessionToken = await getUserId(sessionToken)
  if (verifySessionToken === undefined) return res.sendStatus(401) //unauthorized
  req.userid = verifySessionToken.user_id
  next()
}
