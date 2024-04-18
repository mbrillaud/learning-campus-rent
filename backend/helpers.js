const jwt = require('jsonwebtoken');

/**
 * Extrait l'identifiant de l'utilisateur à partir du token JWT.
 * @param {string} authHeader - En-tête Authorization contenant le token JWT.
 * @returns {string} Identifiant de l'utilisateur.
 */
exports.getUserIdWithToken = authHeader => {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_KEY).userId;
}

/**
 * Extrait le statut de l'utilisateur à partir du token JWT.
 * @param {string} authHeader - En-tête Authorization contenant le token JWT.
 * @returns {boolean} Statut de l'utilisateur (1 pour admin).
 */
exports.getUserStatusWithToken = authHeader => {
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.TOKEN_KEY).userStatus;
}

/**
 * Normalise le port en un nombre entier ou en une chaîne.
 * @param {(string|number)} val - Valeur du port à normaliser.
 * @returns {(string|number|boolean)} Port normalisé.
 */
exports.normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};
