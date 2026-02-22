import express from 'express';
import { registerUser, loginUser, getAllUsers, searchUsers, deleteUser, updateUser } from '../controllers/user.Controller.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getAllUsers', getAllUsers)
router.post('/searchUsers', searchUsers)
router.delete('/deleteUser/:id', deleteUser)
router.put('/updateUser/:id', updateUser)

export default router;