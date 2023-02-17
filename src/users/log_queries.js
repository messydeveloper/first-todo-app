const sendLoginDate = "INSERT INTO user_logs (uid, email, last_login) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET last_login = EXCLUDED.last_login";


module.exports={
    sendLoginDate
}