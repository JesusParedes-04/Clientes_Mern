import express from "express";
const router = express.Router();
import {getAllClients, createClients, getClientsById, updateClients, deleteClients} from "../controllers/client.controllers.js";


// Rutas para CRUD de Clientes

router.get('/', getAllClients);
router.post('/', createClients);
router.get('/:id', getClientsById);
router.put('/:id', updateClients);
router.delete('/:id', deleteClients);

export default router