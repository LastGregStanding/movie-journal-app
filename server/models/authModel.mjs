import pool from "../database/db-connector.mjs";

const registerUserModel = (username, email, hashedPassword) =>
  pool
    .promise()
    .query("CALL RegisterUser(?, ?, ?)", [username, email, hashedPassword]);

const getUserInfo = async (username) => {
  const [rows] = await pool.promise().query("CALL GetUserInfo(?)", [username]);
  return rows[0];
};

export { registerUserModel, getUserInfo };
