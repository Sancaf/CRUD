const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, updateUser, getUsers2, getAll } = require('../../public/index.controller');

router.get('/users', getUsers);
router.get('/userss', getUsers2);
router.get('/all_users', getAll);
router.post('/users', createUser);
router.delete('/users/:nombre', deleteUser);
router.put('/users/:id', updateUser);

module.exports = router;